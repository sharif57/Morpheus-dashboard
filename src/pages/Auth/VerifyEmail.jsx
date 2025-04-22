
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(0, 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.substring(0, 6).split("");
    const newOtp = [...otp];

    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });

    setOtp(newOtp);

    const lastFilledIndex = Math.min(digits.length - 1, 5);
    if (lastFilledIndex < 5) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      alert(`Verifying OTP: ${otpValue}`);
      navigate("/auth/reset-password")
    } else {
      alert("Please enter all 6 digits of the OTP");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Logo Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#005163] p-8">
        <div className="w-48 h-48 md:w-64 md:h-64">
          <img src="/Vector (2).png" alt="Logo" width={240} height={240} />
        </div>
      </div>

      {/* Verification Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#FFF0F0] p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm">
          <div className="mb-6 flex items-center justify-center">
       
            <h1 className="text-[30px] font-bold">Verify Email</h1>
          </div>

          <div className="mb-6">
            <div className="flex justify-center space-x-2 md:space-x-4">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="w-10 h-10 md:w-12 md:h-12">
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`w-full h-full text-center text-lg font-semibold border ${
                      otp[index] ? "border-gray-400" : "border-gray-300"
                    } rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleVerify}
            className="w-full py-3 bg-[#E73E1E] hover:bg-red-600 text-white font-semibold rounded-full transition duration-200"
          >
            Verify
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Please enter the OTP we have sent you in your email.
          </p>
        </div>
      </div>
    </div>
  );
}
