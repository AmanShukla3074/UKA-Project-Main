import React, { useState } from "react";
import './OTP.css'
import { useNavigate} from "react-router-dom";
const OTP = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    // Validate OTP and perform necessary actions
    console.log("OTP Verified:", otp);
  };
  return (
    <div className="OTP">
      <h2>OTP Verification</h2>
      <form>
        {/* <div className="otpWrapper"> */}
          <div className="otpDigit">
            {[1, 2, 3, 4].map((digit) => (
              <input
                key={digit}
                type="text"
                maxLength="1"
                value={otp[digit - 1]}
                onChange={(e) => {
                  const newOtp = otp.split("");
                  newOtp[digit - 1] = e.target.value;
                  setOtp(newOtp.join(""));
                }}
              />
            ))}
          </div>
          
            <button type="button" onClick={handleVerify}>
              Verify
            </button>
            
             <button type="button" onClick={()=>navigate('/address') }>
             
            Next
          </button>
      </form>
    </div>
  );
};

export default OTP;
