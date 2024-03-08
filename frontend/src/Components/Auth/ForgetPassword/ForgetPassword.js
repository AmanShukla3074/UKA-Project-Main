import React, { useState } from 'react';
import './ForgetPassword.css'

const ForgotPassword = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [OTP, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Error states for each step
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleGetMobile = () => {
    // Validate mobile number
    if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileNumberError('Please check your mobile number.');
      return;
    }

    // Implement logic to send OTP to the provided mobile number
    // Make an API request here...

    console.log('OTP sent to:', mobileNumber);

    // Move to the next step
    setCurrentStep(currentStep + 1);
  };

  const validateOTP = () => {
    // You can customize the validation logic based on your requirements
    const isValid = OTP.length >= 4; // Minimum OTP length example

    if (!isValid) {
      setOtpError('OTP must be at least 4 characters');
    } else {
      setOtpError('');
    }

    return isValid;
  };

  const validatePassword = () => {
    // You can customize the password validation logic based on your requirements
    const isValidPassword = newPassword.length >= 6; // Minimum password length example

    if (!isValidPassword) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }

    return isValidPassword;
  };

  const handleNext = () => {
    // Reset previous errors
    setMobileNumberError('');
    setOtpError('');
    setPasswordError('');

    // Validate inputs based on the current step
    if (currentStep === 1) {
      if (!/^\d{10}$/.test(mobileNumber)) {
        setMobileNumberError('Please check your mobile number.');
        return;
      }
    } else if (currentStep === 2) {
      const isOTPValid = validateOTP();
      if (!isOTPValid) {
        return;
      }
    }

    // Move to the next step
    setCurrentStep(currentStep + 1);
  };

  const handleResetPassword = () => {
    // Reset previous errors
    setOtpError('');
    setPasswordError('');
  
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match. Please try again.');
      return;
    }
  
    // Validate the password
    const isPasswordValid = validatePassword();
    if (!isPasswordValid) {
      return;
    }
  
    // Implement logic to reset password on the backend
    // ...
  
    // Show success message
    setPasswordResetSuccess(true);
  
    // Reset the form or navigate to the login page after password reset
  };
  

  return (
    <div className="ForgotPassForm">
      <h2>Forgot Password</h2>
      {currentStep === 1 && (
        <div>
          <p>Please enter your mobile number to receive an OTP.</p>
          <form>
            <label>
              Mobile Number:
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              {mobileNumberError && <span className="error">{mobileNumberError}</span>}
            </label>
            <button type="button" onClick={handleGetMobile}>
              Get OTP
            </button>
          </form>
        </div>
      )}
      {currentStep === 2 && (
        <div>
          <p>Enter the OTP sent to your mobile number.</p>
          <form>
            <label>
              OTP:
              <input
                type="text"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                onBlur={validateOTP}
                className={!OTP ? 'invalid' : ''}
              />
              {otpError && <span className="error">{otpError}</span>}
            </label>
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </form>
        </div>
      )}
      {currentStep === 3 && (
        <div>
          <p>OTP verified. Please set a new password.</p>
          <form>
            <label>
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {passwordError && <span className="error">{passwordError}</span>}
            </label>
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && <span className="error">{passwordError}</span>}
            </label>
            <button type="button" onClick={handleResetPassword}>
              Reset Password
            </button>
          </form>
          {passwordResetSuccess && (
            <p>Your password has been successfully changed.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
