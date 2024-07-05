// import React, { useState, useEffect } from "react";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";

// const GetOtp = () => {
//   const [otp, setOtp] = useState("");
//   const [timer, setTimer] = useState(60); // Timer set to 60 seconds
//   const [timerActive, setTimerActive] = useState(false);

//   // Countdown timer effect
//   useEffect(() => {
//     let interval;
//     if (timerActive) {
//       interval = setInterval(() => {
//         if (timer > 0) {
//           setTimer((prevTimer) => prevTimer - 1);
//         } else {
//           setTimerActive(false);
//           clearInterval(interval);
//         }
//       }, 1000);
//     }

//     // Clear interval on unmount or timer reaching 0
//     return () => clearInterval(interval);
//   }, [timerActive, timer]);

//   // Function to handle OTP input change
//   const handleChange = (e) => {
//     const value = e.target.value;
//     if (/^\d{0,6}$/.test(value)) {
//       setOtp(value);
//     }
//   };

//   // Function to handle OTP submission
//   const handleOtpSubmit = (e) => {
//     e.preventDefault();
//     console.log("OTP entered:", otp);
//     setOtp("");
//     setTimerActive(false); // Stop the timer on OTP submission
//   };

//   // Function to handle OTP resend
//   const handleResendOtp = () => {
//     console.log("OTP resent");
//     setTimer(60); // Reset timer to 60 seconds when OTP is resent
//     setTimerActive(true); // Start the timer again
//     // Add logic here to handle OTP resend, e.g., API call
//   };

//   // Format timer display (mm:ss)
//   const formatTime = (seconds) => {
//     const mm = Math.floor(seconds / 60);
//     const ss = seconds % 60;
//     return `${mm}:${ss < 10 ? "0" : ""}${ss}`;
//   };

//   return (
//     <section className="rounded-md bg-gray-400 p-2 mb-0">
//       <div className="flex items-center h-screen justify-center bg-slate-500 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
//         <div className="max-w-prose w-full bg-slate-400 rounded-lg shadow-lg p-10">
//           <h2 className="text-2xl font-bold leading-tight mt-5 text-black text-center">
//             Enter Six Digits "OTP"
//           </h2>

//           <form onSubmit={handleOtpSubmit} className="mt-8">
//             <div className="space-y-5">
//               <div>
//                 <input
//                   className="w-full h-12 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//                   type="text"
//                   placeholder="Enter Six Digits OTP"
//                   maxLength={6}
//                   value={otp}
//                   onChange={handleChange}
//                   pattern="[0-9]*"
//                   inputMode="numeric"
//                   required
//                 />
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full inline-flex items-center justify-center rounded-md bg-purple-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
//                 >
//                   Verify OTP <ArrowRight className="ml-2" size={16} />
//                 </button>
//               </div>
//             </div>
//           </form>

//           <p className="mt-4 text-center">
//             <button
//               type="button"
//               className="inline-flex items-center justify-center rounded-md bg-gray-700 px-1.5 py-1 font-semibold leading-7 text-white hover:bg-black/80"
//               onClick={handleResendOtp}
//               disabled={timerActive}
//             >
//               Resend OTP
//             </button>
//             {timerActive && (
//               <span className="ml-2 text-red-600">
//                 Resend in {formatTime(timer)}
//               </span>
//             )}
//           </p>

//           <div className="mt-5 text-center">
//             <Link to="/">
//               <span className="text-black hover:text-red-700">
//                 Back to Login
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GetOtp;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ArrowRight } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// const GetOtp = () => {
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [timer, setTimer] = useState(180); // Timer set to 60 seconds
//   const [timerActive, setTimerActive] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userId = location.state?.userId;

//   useEffect(() => {
//     // If userId is not present, redirect to the login page
//     if (!userId) {
//       navigate("/");
//     } else {
//       setTimerActive(true);
//     }
//   }, [userId, navigate]);

//   useEffect(() => {
//     let interval;
//     if (timerActive) {
//       interval = setInterval(() => {
//         if (timer > 0) {
//           setTimer((prevTimer) => prevTimer - 1);
//         } else {
//           setTimerActive(false);
//           clearInterval(interval);
//         }
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [timerActive, timer]);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     if (/^\d{0,6}$/.test(value)) {
//       setOtp(value);
//     }
//   };

//   const handleOtpSubmit = (e) => {
//     e.preventDefault();
//     const url =
//       "http://qa.irix.in:5858/OlioSwitch/passbook/login/otpVerification";
//     const params = {
//       userId: userId,
//       otp: otp,
//     };

//     axios
//       .post(url, params)
//       .then((response) => {
//         if (response.data.resCode === 200) {
//           navigate("/passbook");
//         } else {
//           setError(response.data.message || "OTP is not correct.");
//         }
//       })
//       .catch((error) => {
//         if (error.response) {
//           // Server responded with a status other than 2xx
//           if (error.response.status === 403) {
//             setError("OTP validation failed.");
//           } else {
//             setError("An error occurred. Please try again.");
//           }
//         } else if (error.request) {
//           // The request was made but no response was received
//           setError(
//             "No response received from the server. Please check your network connection."
//           );
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           setError("Error occurred while setting up the request.");
//         }
//       });
//   };

//   const handleResendOtp = () => {
//     setTimer(60);
//     setTimerActive(true);
//     // Add logic here to handle OTP resend, e.g., API call
//   };

//   const formatTime = (seconds) => {
//     const mm = Math.floor(seconds / 60);
//     const ss = seconds % 60;
//     return `${mm}:${ss < 10 ? "0" : ""}${ss}`;
//   };

//   return (
//     <section className="rounded-md bg-gray-400 p-2 mb-0">
//       <div className="flex items-center h-screen justify-center bg-slate-500 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
//         <div className="max-w-prose w-full bg-slate-400 rounded-lg shadow-lg p-10">
//           <h2 className="text-2xl font-bold leading-tight mt-5 text-black text-center">
//             Enter Six Digits "OTP"
//           </h2>

//           <form onSubmit={handleOtpSubmit} className="mt-8">
//             <div className="space-y-5">
//               <div>
//                 <input
//                   className="w-full h-12 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
//                   type="text"
//                   placeholder="Enter Six Digits OTP"
//                   maxLength={6}
//                   value={otp}
//                   onChange={handleChange}
//                   pattern="[0-9]*"
//                   inputMode="numeric"
//                   required
//                 />
//               </div>

//               {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full inline-flex items-center justify-center rounded-md bg-purple-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
//                 >
//                   Verify OTP <ArrowRight className="ml-2" size={16} />
//                 </button>
//               </div>
//             </div>
//           </form>

//           <p className="mt-4 text-center">
//             <button
//               type="button"
//               className="inline-flex items-center justify-center rounded-md bg-gray-700 px-1.5 py-1 font-semibold leading-7 text-white hover:bg-black/80"
//               onClick={handleResendOtp}
//               disabled={timerActive}
//             >
//               Resend OTP
//             </button>
//             {timerActive && (
//               <span className="ml-2 text-red-600">
//                 Resend in {formatTime(timer)}
//               </span>
//             )}
//           </p>

//           <div className="mt-5 text-center">
//             <a href="/">
//               <span className="text-black hover:text-red-700">
//                 Back to Login
//               </span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GetOtp;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import API_URLS from "../constants/apiConfig"; // Adjust the path based on your project structure

const GetOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(180); // Timer set to 180 seconds (3 minutes)
  const [timerActive, setTimerActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [responseData, setResponseData] = useState(null);
  const userId = location.state?.userId;

  useEffect(() => {
    // If userId is not present, redirect to the login page
    if (!userId) {
      navigate("/");
    } else {
      setTimerActive(true);
    }
  }, [userId, navigate]);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          setTimerActive(false);
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, timer]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    const url = API_URLS.OTP_VERIFICATION; // Using API_URLS from apiConfig.js
    const params = {
      userId: userId,
      otp: otp,
    };

    axios
      .post(url, params)
      .then((response) => {
        if (response.data.resCode === 200) {
          const { agentName, entityId, message, resCode } = response.data;
          setResponseData(response.data);

          navigate("/passbook", {
            state: {
              userId: userId,
              agentName: agentName,
              entityId: entityId,
              message: message,
              resCode: resCode,
            },
          });
        } else {
          setError(response.data.message || "OTP is not correct.");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            setError("OTP validation failed.");
          } else {
            setError("An error occurred. Please try again.");
          }
        } else if (error.request) {
          setError(
            "No response received from the server. Please check your network connection."
          );
        } else {
          setError("Error occurred while setting up the request.");
        }
      });
  };

  const handleResendOtp = () => {
    const url = API_URLS.LOGIN; // Using API_URLS from apiConfig.js
    const params = {
      userId: userId,
    };

    axios
      .post(url, params)
      .then((response) => {
        if (response.data.resCode === 200) {
          setTimer(180); // Reset timer to 180 seconds (3 minutes)
          setTimerActive(true);
          setError(""); // Clear previous errors on successful resend
        } else {
          setError(response.data.message || "Failed to resend OTP.");
        }
      })
      .catch((error) => {
        setError("Error occurred while resending OTP.");
      });
  };

  const formatTime = (seconds) => {
    const mm = Math.floor(seconds / 60);
    const ss = seconds % 60;
    return `${mm}:${ss < 10 ? "0" : ""}${ss}`;
  };

  return (
    <section className="rounded-md bg-gray-400 p-2 mb-0">
      <div className="flex items-center h-screen justify-center bg-slate-500 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-prose w-full bg-slate-400 rounded-lg shadow-lg p-10">
          <h2 className="text-2xl font-bold leading-tight mt-5 text-black text-center">
            Enter Six Digits "OTP"
          </h2>

          <form onSubmit={handleOtpSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <input
                  className="w-full h-12 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  type="text"
                  placeholder="Enter Six Digits OTP"
                  maxLength={6}
                  value={otp}
                  onChange={handleChange}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-md bg-purple-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Verify OTP <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>

          <p className="mt-4 text-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-gray-700 px-1.5 py-1 font-semibold leading-7 text-white hover:bg-black/80"
              onClick={handleResendOtp}
              disabled={timerActive}
            >
              Resend OTP
            </button>
            {timerActive && (
              <span className="ml-2 text-red-600">
                Resend in {formatTime(timer)}
              </span>
            )}
          </p>

          <div className="mt-5 text-center">
            <a href="/">
              <span className="text-black hover:text-red-700">
                Back to Login
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetOtp;
