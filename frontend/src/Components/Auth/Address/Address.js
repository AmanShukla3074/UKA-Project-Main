import React, { useEffect, useState } from "react";
import "./Address.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Address = ({ onNext, onSkip }) => {
  const [houseAdd, setHouseAdd] = useState("");
  const [streetAdd, setStreetAdd] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const navigate = useNavigate();

  const location = useLocation(); // Access the location state
  const userId = location.state.userId; // Extract the userId from the location state

  const [validationErrors, setValidationErrors] = useState({
    houseAdd: "",
    streetAdd: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    // Fetch states and cities on component mount
    axios
      .all([
        axios.get("http://127.0.0.1:8000/api/Auth/state/"),
        axios.get("http://127.0.0.1:8000/api/Auth/city/"),
      ])
      .then(
        axios.spread((statesResponse, citiesResponse) => {
          setStates(statesResponse.data);
          setCities(citiesResponse.data);
          setFilteredCities(citiesResponse.data); // Initialize filteredCities with all cities
        })
      )
      .catch((error) => {
        console.error("Error fetching states or cities:", error);
      });
  }, []);
  useEffect(() => {
    if (state) {
      const filtered = cities.filter(
        (city) => city.State.StateID === parseInt(state, 10)
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(cities); // Reset to all cities if no state is selected
    }
  }, [state, cities]);


  const handleNext = () => {
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
    if (!city) {
      errors.city = "City is required";
    }
    if (!state) {
      errors.state = "State is required";
    }
    if (!landmark.trim()) {
      errors.landmark = "Landmark is required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    // API call to register address
    axios.post("http://127.0.0.1:8000/api/Auth/register/address/", {
      House_Add: houseAdd,
      Street_Add: streetAdd,
      Landmark: landmark,
      Pincode: pincode,
      City: city,
      User: userId, // Assuming the backend expects the user ID here
    })
    .then(response => {
      // Handle successful response
      console.log("Address registered successfully:", response.data);
      navigate("/");
      onNext && onNext(); // Proceed to the next step if onNext is provided
    })
    .catch(error => {
      // Handle error
      console.error("Error registering address:", error);
      // Optionally, set an error message in the state to display to the user
    });
 };

  const handleSkip = () => {
    navigate("/");
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
              State: <br />
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.StateID} value={state.StateID}>
                    {state.State}
                  </option>
                ))}
              </select>
              <span className="error">{validationErrors.state}</span>
            </label>
            <label>
              City: <br />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="city-dropdown"
              >
                <option value="">Select City</option>
                {filteredCities.map((city) => (
                  <option key={city.CityID} value={city.CityID}>
                    {city.City}
                  </option>
                ))}
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