// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import API_URLS from "../constants/apiConfig"; // Import the API_URLS object

// const Passbook = () => {
//   const [accountNumber, setAccountNumber] = useState("");
//   const [reAccountNumber, setReAccountNumber] = useState("");
//   const [accountType, setAccountType] = useState("");
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userId = location.state?.userId;
//   const entityId = location.state?.entityId;

//   // Function to generate random transaction ID
//   const generateTransactionId = () => {
//     return Math.random().toString(36).substr(2, 10); // Example random ID generation
//   };

//   // Function to format current date-time as "YYYY-MM-DD HH:mm:ss"
//   const getCurrentDateTime = () => {
//     const now = new Date();
//     const year = now.getFullYear();
//     let month = (now.getMonth() + 1).toString().padStart(2, "0");
//     let day = now.getDate().toString().padStart(2, "0");
//     let hours = now.getHours().toString().padStart(2, "0");
//     let minutes = now.getMinutes().toString().padStart(2, "0");
//     let seconds = now.getSeconds().toString().padStart(2, "0");

//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//   };

//   const validate = () => {
//     let tempErrors = {};
//     if (!accountNumber || accountNumber.length !== 11) {
//       tempErrors.accountNumber = "Account number must be 11 digits.";
//     }
//     if (accountNumber !== reAccountNumber) {
//       tempErrors.reAccountNumber = "Account numbers do not match.";
//     }
//     if (!accountType) {
//       tempErrors.accountType = "Please select an account type.";
//     }
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       // Generate transaction ID
//       const tranId = generateTransactionId();

//       // Prepare data object to send to API
//       const passbookData = {
//         "tran-id": tranId,
//         "primary-acc-number": accountNumber,
//         barCode: "N",
//         "date-time": getCurrentDateTime(),
//         processCode: getProcessCode(accountType),
//         userId: userId,
//         entityId: entityId,
//       };

//       try {
//         // Make POST request to API
//         const response = await fetch(API_URLS.PASSBOOK_PRINTER, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(passbookData),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log("Passbook data sent successfully:", data);

//           // Navigate to passbookData page with passbookData state
//           navigate("/passbookData", {
//             state: passbookData,
//           });
//         } else {
//           throw new Error("Failed to send passbook data.");
//         }
//       } catch (error) {
//         console.error("Error sending passbook data:", error);
//         // Handle error as needed
//       }
//     }
//   };

//   const getProcessCode = (type) => {
//     switch (type) {
//       case "current":
//         return "921000";
//       case "saving":
//         return "920000";
//       case "fixed":
//         return "921000";
//       default:
//         return "";
//     }
//   };

//   const handleAccountNumberChange = (e) => {
//     const { value } = e.target;
//     if (value.length <= 11 && /^[0-9\b]*$/.test(value)) {
//       setAccountNumber(value); // Update state directly with the new value
//     }
//   };

//   const handleReAccountNumberChange = (e) => {
//     const { value } = e.target;
//     if (value.length <= 11 && /^[0-9\b]*$/.test(value)) {
//       setReAccountNumber(value); // Update state directly with the new value
//     }
//   };

//   const TextInputField = ({
//     id,
//     label,
//     type = "text",
//     value,
//     onChange,
//     error,
//     placeholder,
//     onPaste,
//     onCopy,
//   }) => (
//     <div className="mb-4">
//       <label
//         className="block mb-2 text-sm font-medium text-gray-700"
//         htmlFor={id}
//       >
//         {label}
//       </label>
//       <input
//         type={type}
//         id={id}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         onPaste={onPaste}
//         onCopy={onCopy}
//         className={`w-full px-3 py-2 border rounded-md ${
//           error ? "border-red-500" : "border-gray-300"
//         }`}
//       />
//       {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
//     </div>
//   );

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//         <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
//           Passbook Page
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <TextInputField
//             id="accountNumber"
//             label="Enter Account Number (11 digits)"
//             type="text" // Changed to text
//             value={accountNumber}
//             onChange={handleAccountNumberChange}
//             onPaste={(e) => e.preventDefault()}
//             onCopy={(e) => e.preventDefault()}
//             error={errors.accountNumber}
//             placeholder="Enter account number"
//           />

//           <TextInputField
//             id="reAccountNumber"
//             label="Re-Enter Account Number"
//             type="text" // Changed to text
//             value={reAccountNumber}
//             onChange={handleReAccountNumberChange}
//             onPaste={(e) => e.preventDefault()}
//             onCopy={(e) => e.preventDefault()}
//             error={errors.reAccountNumber}
//             placeholder="Re-enter account number"
//           />

//           <div className="mb-4">
//             <label
//               className="block mb-2 text-sm font-medium text-gray-700"
//               htmlFor="accountType"
//             >
//               Account Type
//             </label>
//             <select
//               id="accountType"
//               value={accountType}
//               onChange={(e) => setAccountType(e.target.value)}
//               className={`w-full px-3 py-2 border rounded-md ${
//                 errors.accountType ? "border-red-500" : "border-gray-300"
//               }`}
//             >
//               <option value="">Select Account Type</option>
//               <option value="current">Current Account</option>
//               <option value="saving">Saving Account</option>
//               <option value="fixed">Loan Account</option>
//             </select>
//             {errors.accountType && (
//               <p className="mt-2 text-sm text-red-500">{errors.accountType}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Passbook;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_URLS from "../constants/apiConfig"; // Import the API_URLS object

const Passbook = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [reAccountNumber, setReAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const entityId = location.state?.entityId;

  // Function to generate random transaction ID
  const generateTransactionId = () => {
    return Math.random().toString(36).substr(2, 10); // Example random ID generation
  };

  // Function to format current date-time as "YYYY-MM-DD HH:mm:ss"
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const validate = () => {
    let tempErrors = {};
    if (!accountNumber || accountNumber.length !== 11) {
      tempErrors.accountNumber = "Account number must be 11 digits.";
    }
    if (accountNumber !== reAccountNumber) {
      tempErrors.reAccountNumber = "Account numbers do not match.";
    }
    if (!accountType) {
      tempErrors.accountType = "Please select an account type.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Generate transaction ID
      const tranId = generateTransactionId();

      // Prepare data object to send to API
      const passbookData = {
        "tran-id": tranId,
        "primary-acc-number": accountNumber,
        barCode: "N",
        "date-time": getCurrentDateTime(),
        processCode: getProcessCode(accountType),
        userId: userId,
        entityId: entityId,
      };

      try {
        // Make POST request to API
        const response = await fetch(API_URLS.PASSBOOK_PRINTER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passbookData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Passbook data sent successfully:", data);

          // Navigate to passbookData page with passbookData state
          navigate("/passbookData", {
            state: passbookData,
          });
        } else {
          throw new Error("Failed to send passbook data.");
        }
      } catch (error) {
        console.error("Error sending passbook data:", error);
        // Handle error as needed
      }
    }
  };

  const getProcessCode = (type) => {
    switch (type) {
      case "current":
        return "921000";
      case "saving":
        return "920000";
      case "fixed":
        return "921000";
      default:
        return "";
    }
  };

  const handleAccountNumberChange = (e) => {
    const { value } = e.target;
    if (value.length <= 11 && /^[0-9\b]*$/.test(value)) {
      setAccountNumber(value); // Update state directly with the new value
    }
  };

  const handleReAccountNumberChange = (e) => {
    const { value } = e.target;
    if (value.length <= 11 && /^[0-9\b]*$/.test(value)) {
      setReAccountNumber(value); // Update state directly with the new value
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Passbook Page
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="accountNumber"
            >
              Enter Account Number (11 digits)
            </label>
            <input
              type="password"
              id="accountNumber"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.accountNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.accountNumber && (
              <p className="mt-2 text-sm text-red-500">
                {errors.accountNumber}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="reAccountNumber"
            >
              Re-Enter Account Number
            </label>
            <input
              type="text"
              id="reAccountNumber"
              placeholder="Re-enter account number"
              value={reAccountNumber}
              onChange={handleReAccountNumberChange}
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.reAccountNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.reAccountNumber && (
              <p className="mt-2 text-sm text-red-500">
                {errors.reAccountNumber}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="accountType"
            >
              Account Type
            </label>
            <select
              id="accountType"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.accountType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Account Type</option>
              <option value="current">Current Account</option>
              <option value="saving">Saving Account</option>
              <option value="fixed">Loan Account</option>
            </select>
            {errors.accountType && (
              <p className="mt-2 text-sm text-red-500">{errors.accountType}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Passbook;
