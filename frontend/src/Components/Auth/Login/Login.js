import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../Context/AuthContext';

const Login = ({ onNext }) => {


  let {loginUser} = useContext(AuthContext)

  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const validateMobileNumber = () => {
    const isValid = /^\d{10}$/.test(mobileNumber);
    setIsMobileNumberValid(isValid);
    return isValid;
  };

  const validatePassword = () => {
    const isValid = password.length >= 6;
    setIsPasswordValid(isValid);
    return isValid;
  };

  const handleNext = () => {
    // Validate inputs here
    const isMobileValid = validateMobileNumber();
    const isPasswordValid = validatePassword();

    // Check if all inputs are valid before proceeding to the next page
    if (isMobileValid && isPasswordValid) {

      // Call the parent component's onNext function
      onNext && onNext();

      // Use navigate to go to the "/otp" route
      navigate("/otp");
    } else {
      console.log('Form has errors. Please check your inputs.');
    }
  };

  return (
    <div className='loginForm'>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <label>
          Mobile Number:
          <input
            type="text"
            value={mobileNumber}
            name='mobile'
            onChange={(e) => setMobileNumber(e.target.value)}
            onBlur={validateMobileNumber}
            className={!isMobileNumberValid ? 'invalid' : ''}
          />
          {!isMobileNumberValid && <span className="error">Mobile number is required</span>}
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            className={!isPasswordValid ? 'invalid' : ''}
          />
          {!isPasswordValid && <span className="error">Password must be at least 6 characters</span>}
        </label>
        <label className='forgotPass'>
          <Link to="/forgotpassword" className='forgotPassLink'>
            <span>Forget Password?</span>
          </Link>
        </label>
        <button type="button" onClick={handleNext}>
          Next
        </button>
        <input type="submit" value="aa" />
        <label className="custom-label">
        <span>
        <Link to="/Registration" className="custom-link">
          Don't Have an account? Sing-up
        </Link>
        </span>
      </label>
  
      </form>
    </div>
  );
};

export default Login;


// // Login.js
// import React, { useState } from 'react';
// import './Login.css';
// import { Link, useNavigate } from 'react-router-dom';

// const Login = ({ onNext }) => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);
//   const [isPasswordValid, setIsPasswordValid] = useState(true);
//   const navigate = useNavigate(); 

//   const validateMobileNumber = () => {
//     // You can customize the validation logic based on your requirements
//     const isValid = /^\d{10}$/.test(mobileNumber);
//     setIsMobileNumberValid(isValid);
//     return isValid;
//   };

//   const validatePassword = () => {
//     // You can customize the validation logic based on your requirements
//     const isValid = password.length >= 6; // Minimum password length example
//     setIsPasswordValid(isValid);
//     return isValid;
//   };

//   const handleNext = () => {
//     // Validate inputs here
//     const isMobileValid = validateMobileNumber();
//     const isPasswordValid = validatePassword();

//     // Check if all inputs are valid before proceeding to the next page
//     if (isMobileValid && isPasswordValid) {
//       console.log({ mobileNumber, password });
//       // Call the parent component's onNext function to switch to the next page
//       onNext && onNext();
//       navigate("/otp")
//     } else {
//       console.log('Form has errors. Please check your inputs.');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onClick={handleNext}>
//         <label>
//           Mobile Number:
//           <input
//             type="text"
//             value={mobileNumber}
//             onChange={(e) => setMobileNumber(e.target.value)}
//             onBlur={validateMobileNumber}
//             className={!isMobileNumberValid ? 'invalid' : ''}
//           />
//           {!isMobileNumberValid && <span className="error">mobile number require</span>}
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             onBlur={validatePassword}
//             className={!isPasswordValid ? 'invalid' : ''}
//           />
//           {!isPasswordValid && <span className="error">Password must be at least 6 characters</span>}
//         </label>
//         <label>
//           <Link to="/ForgetPassword">
//             <span>Forget Password?</span>
//           </Link>
//         </label>
       
//           <Link to="/otp">
//           <button type="button"   onClick={handleNext} >
//             Next   
//           </button>
//           </Link>
          
//       </form>
//     </div>
//   );
// };

// export default Login;
