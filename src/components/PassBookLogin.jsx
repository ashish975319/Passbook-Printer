import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import logoLight from "../assets/logolight.png";
import { Link } from "react-router-dom";

const PassBookLogin = () => {
  const [agentId, setAgentId] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    // Ensure only integers are accepted
    if (/^\d*$/.test(value)) {
      setAgentId(value);
      // Check if the agentId length is between 8 to 10 characters
      if (value.length < 8 || value.length > 10) {
        setError("AgentId must be between 8 to 10 digits");
      } else {
        setError("");
      }
    } else {
      setError("AgentId must contain only digits");
    }
  };

  return (
    <section className="rounded-md bg-gray-400 p-2 mb-0">
      <div className="flex items-center h-screen justify-center bg-slate-500 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-prose w-full bg-slate-400 rounded-lg shadow-lg p-10">
          <div className="mb-6 text-center">
            <img
              src={logoLight}
              alt="Logo"
              style={{ width: "160px", height: "56px", margin: "0 auto" }} // Center image with margin auto
            />
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
                  id="agentId"
                  name="agentId"
                  className={`flex h-10 w-full rounded-md border ${
                    error ? "border-red-500" : "border-gray-300"
                  } bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 ${
                    error ? "ring-red-500" : "ring-gray-400"
                  } focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                  type="text"
                  pattern="[0-9]*" // Only accept numeric input
                  placeholder="AgentId"
                  value={agentId}
                  onChange={handleChange}
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div>
              <Link to="/getOtp">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-purple-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  disabled={error || agentId.length < 8 || agentId.length > 10}
                >
                  Get OTP <ArrowRight className="ml-2" size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassBookLogin;
