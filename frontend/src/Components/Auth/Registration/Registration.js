// Registration.js
import React, { useState } from "react";
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";

const Registration = ({ onNext }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isDobValid, setIsDobValid] = useState(true);
  const [isGenderValid, setIsGenderValid] = useState(true);

  const validateFirstName = () => {
    const isValid = /^[a-zA-Z]+$/.test(firstName);
    setIsFirstNameValid(isValid);
    return isValid;
  };

  const validateLastName = () => {
    const isValid = /^[a-zA-Z]+$/.test(lastName);
    setIsLastNameValid(isValid);
    return isValid;
  };

  const validateMobileNumber = () => {
    const isValid = /^\d{10}$/.test(mobileNumber);
    setIsMobileNumberValid(isValid);
    return isValid;
  };

  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setIsEmailValid(isValid);
    return isValid;
  };

  const validatePassword = () => {
    const isValid = password.length >= 6; // Example: Minimum password length
    setIsPasswordValid(isValid);
    return isValid;
  };

  const validateDob = () => {
    const isValid = dob !== "";
    setIsDobValid(isValid);
    return isValid;
  };

  const validateGender = () => {
    const isValid = gender !== "";
    setIsGenderValid(isValid);
    return isValid;
  };

  const handleNext = () => {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isMobileValid = validateMobileNumber();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    // const isDobValid = dobDay !== "" && dobMonth !== "" && dobYear !== "";
    const isDobValid = validateDob();
    const isGenderValid = validateGender();

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isMobileValid &&
      isEmailValid &&
      isPasswordValid &&
      isDobValid &&
      isGenderValid
    ) {
      console.log({
        firstName,
        lastName,
        mobileNumber,
        email,
        password,
        dob,
        gender,
        profilePicture,
      });

      // Call the parent component's onNext function to navigate to the next page
      onNext && onNext();

      // Use navigate to go to the "/otp" route
      navigate("/otp");
    } else {
      console.log("Form has errors. Please check your inputs.");
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={validateFirstName}
            className={!isFirstNameValid ? "invalid" : ""}
          />
          {!isFirstNameValid && (
            <span className="error">Invalid first name</span>
          )}
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={validateLastName}
            className={!isLastNameValid ? "invalid" : ""}
          />
          {!isLastNameValid && <span className="error">Invalid last name</span>}
        </label>
        <label>
          Mobile Number:
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            onBlur={validateMobileNumber}
            className={!isMobileNumberValid ? "invalid" : ""}
          />
          {!isMobileNumberValid && (
            <span className="error">Invalid mobile number</span>
          )}
        </label>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            className={!isEmailValid ? "invalid" : ""}
          />
          {!isEmailValid && <span className="error">Invalid email</span>}
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            className={!isPasswordValid ? "invalid" : ""}
          />
          {!isPasswordValid && (
            <span className="error">
              Password must be at least 6 characters
            </span>
          )}
        </label>
        {/* <label>
          Date of Birth:
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            // onBlur={validateDob}
            className={!isDobValid ? "invalid" : ""}
          />
          {!isDobValid && (
            <span className="error">Date of Birth is required</span>
          )}
        </label> */}

        <label>
          Date of Birth:
          <input
            type="date"
            min="1900-01-01"
            max={new Date().toISOString().split("T")[0]}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className={!isDobValid ? "invalid" : ""}
          />
          {!isDobValid && (
            <span className="error">Date of Birth is required</span>
          )}
        </label>

        <label>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            // onBlur={validateGender}
            className={!isGenderValid ? "invalid" : ""}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {!isGenderValid && <span className="error">Gender is required</span>}
        </label>
        <label>
          Profile Picture:
          <input
            type="file"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </label>

        <button type="button" onClick={handleNext}>
          Next
        </button>

        <label className="account">
         
          <span>
            <Link to="/login" className="custom-link">
               Have an account? Login
            </Link>
          </span>
        </label>
      </form>
    </div>
  );
};

export default Registration;
