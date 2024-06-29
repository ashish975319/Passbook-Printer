// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ArrowRight, RefreshCw } from "lucide-react";
// import logoLight from "../assets/logolight.png";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [userId, setUserId] = useState("");
//   const [error, setError] = useState("");
//   const [captcha, setCaptcha] = useState("");
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [isVerified, setIsVerified] = useState(false);
//   const [captchaError, setCaptchaError] = useState("");

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const generateCaptcha = () => {
//     const characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
//     let result = "";
//     const charactersLength = characters.length;
//     for (let i = 0; i < 6; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     setCaptcha(result);
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;

//     if (/^\d*$/.test(value)) {
//       setUserId(value);
//       if (value.length < 8 || value.length > 10) {
//         setError("AgentId must be between 8 to 10 digits");
//       } else {
//         setError("");
//       }
//     } else {
//       setError("AgentId must contain only digits");
//     }
//   };

//   const handleCaptchaChange = (e) => {
//     const value = e.target.value.slice(0, 6); // Limit input to 6 characters
//     setCaptchaInput(value);

//     if (value === captcha) {
//       setIsVerified(true);
//       setCaptchaError("");
//     } else {
//       setIsVerified(false);
//       if (value.length > 0) {
//         setCaptchaError("Please fill correct Captcha.");
//       } else {
//         setCaptchaError("Please fill Captcha.");
//       }
//     }
//   };

//   const handleCaptchaRefresh = () => {
//     generateCaptcha();
//     setCaptchaInput("");
//     setCaptchaError("");
//     // Focus on the captcha input field after refresh
//     document.getElementById("captchaInput").focus();
//   };

//   const handleSubmit = () => {
//     if (isVerified && !error && userId.length >= 8) {
//       const url = `http://qa.irix.in:5858/OlioSwitch/passbook/login?userId=${userId}`;
//       const params = {
//         userId: userId,
//       };

//       axios
//         .get(url, { params })
//         .then((response) => {
//           // Handle successful response, e.g., navigate to another page
//           console.log("Response:", response);
//           // Example: Redirect to /getOtp route after successful request
//           // history.push("/getOtp"); // Ensure you have access to history object or use <Link> component
//         })
//         .catch((error) => {
//           // Handle error
//           console.error("Error:", error);
//         });
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-slate-500">
//       <div className="max-w-prose w-full bg-slate-400 rounded-lg shadow-lg p-10">
//         <div className="mb-6 text-center">
//           <img src={logoLight} alt="Logo" className="w-40 h-auto mx-auto" />
//         </div>
//         <h2 className="text-2xl text-center font-bold leading-tight mt-5 text-black">
//           Passbook Printer
//         </h2>

//         <div className="mt-8 space-y-5">
//           <div>
//             <label
//               htmlFor="agentId"
//               className="text-base font-medium text-gray-900"
//             >
//               Enter AgentId
//             </label>
//             <div className="mt-2">
//               <input
//                 id="userId"
//                 name="userId"
//                 className={`w-full h-10 rounded-md border ${
//                   error ? "border-red-500" : "border-gray-300"
//                 } bg-transparent px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 ${
//                   error ? "ring-red-500" : "ring-gray-400"
//                 } focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
//                 type="text"
//                 pattern="[0-9]*"
//                 placeholder="AgentId"
//                 value={userId}
//                 onChange={handleChange}
//               />
//             </div>
//             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//           </div>

//           <div className="relative">
//             <label
//               htmlFor="captcha"
//               className="text-base font-medium text-gray-900"
//             >
//               Enter Captcha
//             </label>
//             <div className="mt-2 flex items-center space-x-2">
//               {/* Captcha characters with spacing */}
//               <div className="flex items-center space-x-2">
//                 {captcha.split("").map((char, index) => (
//                   <div key={index} className="text-xl text-gray-700">
//                     {char}
//                   </div>
//                 ))}
//               </div>

//               <input
//                 id="captchaInput"
//                 name="captchaInput"
//                 className="flex-grow h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                 type="text"
//                 placeholder="Enter Captcha"
//                 value={captchaInput}
//                 onChange={handleCaptchaChange}
//               />
//               <button
//                 type="button"
//                 className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-300 text-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
//                 onClick={handleCaptchaRefresh}
//               >
//                 <RefreshCw size={16} />
//               </button>
//             </div>
//             {captchaError && (
//               <p className="text-red-500 text-sm mt-1">{captchaError}</p>
//             )}
//           </div>

//           <div>
//             <Link to="/getOtp">
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 className={`w-full inline-flex items-center justify-center rounded-md bg-purple-700 px-3.5 py-2.5 font-semibold leading-7 text-white ${
//                   (!isVerified ||
//                     error ||
//                     userId.length < 8 ||
//                     userId.length > 10) &&
//                   "opacity-50 cursor-not-allowed"
//                 } hover:bg-black/80 focus:outline-none`}
//                 disabled={
//                   !isVerified ||
//                   error ||
//                   userId.length < 8 ||
//                   userId.length > 10
//                 }
//               >
//                 Get OTP <ArrowRight className="ml-2" size={16} />
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, RefreshCw } from "lucide-react";
import logoLight from "../assets/logolight.png";
import logoLight1 from "../assets/logolight1.png";
import logoLight2 from "../assets/logolight2.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCaptcha(result);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setUserId(value);
      if (value.length < 8 || value.length > 10) {
        setError("AgentId must be between 8 to 10 digits");
      } else {
        setError("");
      }
    } else {
      setError("AgentId must contain only digits");
    }
  };

  const handleCaptchaChange = (e) => {
    const value = e.target.value.slice(0, 6); // Limit input to 6 characters
    setCaptchaInput(value);

    if (value === captcha) {
      setIsVerified(true);
      setCaptchaError("");
    } else {
      setIsVerified(false);
      if (value.length > 0) {
        setCaptchaError("Please fill correct Captcha.");
      } else {
        setCaptchaError("Please fill Captcha.");
      }
    }
  };

  const handleCaptchaRefresh = () => {
    generateCaptcha();
    setCaptchaInput("");
    setCaptchaError("");
    // Focus on the captcha input field after refresh
    document.getElementById("captchaInput").focus();
  };

  const handleSubmit = () => {
    if (isVerified && !error && userId.length >= 8) {
      const url = "http://qa.irix.in:5858/OlioSwitch/passbook/login";
      const params = {
        userId: userId,
      };

      axios
        .post(url, params)
        .then((response) => {
          console.log("Response:", response);
          if (response.data.resCode === 200) {
            navigate("/getOtp", { state: { userId } });
          } else {
            setError(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("An error occurred. Please try again.");
        });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-500">
      <div className="max-w-prose w-full bg-slate-400 rounded-lg shadow-lg p-10">
        <div className="mb-6 text-center">
          <img src={logoLight1} alt="Logo" className="w-40 h-auto mx-auto" />
        </div>
        <h2 className="text-2xl text-center font-bold leading-tight mt-5 text-black">
          Passbook Printer
        </h2>

        <div className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="agentId"
              className="text-base font-medium text-gray-900"
            >
              Enter AgentId
            </label>
            <div className="mt-2">
              <input
                id="userId"
                name="userId"
                className={`w-full h-10 rounded-md border ${
                  error ? "border-red-500" : "border-gray-300"
                } bg-transparent px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 ${
                  error ? "ring-red-500" : "ring-gray-400"
                } focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                type="text"
                pattern="[0-9]*"
                placeholder="AgentId"
                value={userId}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div className="relative">
            <label
              htmlFor="captcha"
              className="text-base font-medium text-gray-900"
            >
              Enter Captcha
            </label>
            <div className="mt-2 flex items-center space-x-2">
              {/* Captcha characters with spacing */}
              <div className="flex items-center space-x-2">
                {captcha.split("").map((char, index) => (
                  <div key={index} className="text-xl text-gray-700">
                    {char}
                  </div>
                ))}
              </div>

              <input
                id="captchaInput"
                name="captchaInput"
                className="flex-grow h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter Captcha"
                value={captchaInput}
                onChange={handleCaptchaChange}
              />
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-300 text-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                onClick={handleCaptchaRefresh}
              >
                <RefreshCw size={16} />
              </button>
            </div>
            {captchaError && (
              <p className="text-red-500 text-sm mt-1">{captchaError}</p>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className={`w-full inline-flex items-center justify-center rounded-md bg-purple-700 px-3.5 py-2.5 font-semibold leading-7 text-white ${
                (!isVerified ||
                  error ||
                  userId.length < 8 ||
                  userId.length > 10) &&
                "opacity-50 cursor-not-allowed"
              } hover:bg-black/80 focus:outline-none`}
              disabled={
                !isVerified || error || userId.length < 8 || userId.length > 10
              }
            >
              Get OTP <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
