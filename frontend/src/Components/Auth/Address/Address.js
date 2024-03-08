import React, { useState } from "react";
import "./Address.css";

const Address = ({ onNext, onSkip }) => {
  const [houseAdd, setHouseAdd] = useState("");
  const [streetAdd, setStreetAdd] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [validationErrors, setValidationErrors] = useState({
    houseAdd: "",
    streetAdd: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handleNext = () => {
    // Validate inputs
    const errors = {};
    if (!houseAdd.trim()) {
      errors.houseAdd = "House Address is required";
    }
    if (!streetAdd.trim()) {
      errors.streetAdd = "Street Address is required";
    }
    if (!pincode.trim()) {
      errors.pincode = "Pincode is required";
    }
    if (!city.trim()) {
      errors.city = "City is required";
    }
    if (!state) {
      errors.state = "State is required";
    }

    // If there are validation errors, set them and return
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Clear validation errors
    setValidationErrors({});

    // If validation passes, call the parent component's onNext function to navigate to the next page
    onNext && onNext();
  };

  const handleSkip = () => {
    // Call the parent component's onSkip function to handle the skip action
    onSkip && onSkip();
  };

  return (
    <div className="addressForm">
      <h2>Address Information</h2>
      <form>
        <label>
          House Address:
          <input
            type="text"
            value={houseAdd}
            onChange={(e) => setHouseAdd(e.target.value)}
          />
          <span className="error">{validationErrors.houseAdd}</span>
        </label>
        <label>
          Street Address:
          <input
            type="text"
            value={streetAdd}
            onChange={(e) => setStreetAdd(e.target.value)}
          />
          <span className="error">{validationErrors.streetAdd}</span>
        </label>
        <label>
          Landmark:
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
          />
          <span className="error">{validationErrors.landmark}</span>
        </label>
        <label>
          Pincode:
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <span className="error">{validationErrors.pincode}</span>
        </label>
        <div className="stateCity">
          <label>
            State: <br/>
            <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">Select State</option>
              <option value="state1">State 1</option>
              <option value="state2">State 2</option>
              {/* Add more options for states as needed */}
            </select>
            <span className="error">{validationErrors.state}</span>
          </label>
          <label>
            City: <br/>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="city-dropdown"
            >
              <option value="">Select City</option>
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
              {/* Add more options for cities as needed */}
            </select>
            <span className="error">{validationErrors.city}</span>
          </label>
        </div>
        <label className="submit">
          <button type="button" onClick={handleSkip}>
            Skip
          </button>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </label>
      </form>
    </div>
  );
};

export default Address;
