import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const GetOtp = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60); // Timer set to 60 seconds
  const [timerActive, setTimerActive] = useState(false);

  // Countdown timer effect
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

    // Clear interval on unmount or timer reaching 0
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  // Function to handle OTP input change
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  // Function to handle OTP submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log("OTP entered:", otp);
    setOtp("");
    setTimerActive(false); // Stop the timer on OTP submission
  };

  // Function to handle OTP resend
  const handleResendOtp = () => {
    console.log("OTP resent");
    setTimer(60); // Reset timer to 60 seconds when OTP is resent
    setTimerActive(true); // Start the timer again
    // Add logic here to handle OTP resend, e.g., API call
  };

  // Format timer display (mm:ss)
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
            Enter OTP
          </h2>

          <form onSubmit={handleOtpSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <input
                  className="w-full h-12 px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  type="text"
                  placeholder="Enter OTP"
                  maxLength={6}
                  value={otp}
                  onChange={handleChange}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  required
                />
              </div>

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
              <span className="ml-2 text-gray-600">
                Resend in {formatTime(timer)}
              </span>
            )}
          </p>

          <div className="mt-5 text-center">
            <Link to="/">
              <span className="text-black hover:text-red-700">
                Back to Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetOtp;
