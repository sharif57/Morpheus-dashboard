

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login attempt with:", { email });
      navigate("/auth/verify-email");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Logo Section */}
      <div className="w-full md:w-1/2  bg-[#005163] flex items-center justify-center p-8">
        <div className="max-w-[240px] w-full">
          <img src="/Vector (2).png" alt="Logo" width={240} height={240} />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-[#FFF0F0] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
          <div className="mb-6 flex items-center justify-center">
            <h1 className="text-[30px] font-bold">Forget Password</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4 relative">
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 pl-10"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-[#E73E1E] hover:bg-[#D93C0E] text-white font-medium py-3 px-4 rounded-full transition duration-200 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Send OTP..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
