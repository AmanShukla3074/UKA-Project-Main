import React, { useState, useEffect } from "react";
import "./MusicSearch.css"; // Import the CSS file
import { CiSearch } from "react-icons/ci";
import axios from "axios"; // Make sure to install axios if you haven't already

// Custom hook for debouncing
function useDebounce(value, delay) {
 const [debouncedValue, setDebouncedValue] = useState(value);

 useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
 }, [value, delay]);

 return debouncedValue;
}

const MusicSearch = () => {
 const [isInputFocused, setIsInputFocused] = useState(false);
 const [searchText, setSearchText] = useState("");
 const [searchResults, setSearchResults] = useState([]); // New state for search results
 const debouncedSearchText = useDebounce(searchText, 500); // 500ms delay

 useEffect(() => {
    if (debouncedSearchText) {
      const searchSong = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/Music/search/?query=${debouncedSearchText}`);
          setSearchResults(response.data); // Store the search results in state
          console.log(response.data); // Store the search results in state
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      searchSong();
    }
 }, [debouncedSearchText]); 


  return (
    <div className="search-bar-container">
      <div
        className={`search-bar ${isInputFocused ? "search-bar-focused" : ""}`}
      >
        <CiSearch className="MusicSerachBtn" />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="search-input"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            //   searchSong();
            }
          }}
        />
      </div>
    </div>
  );
};

export default MusicSearch;


// import React, { useState } from "react";
// import "./MusicSearch.css"; // Import the CSS file
// import { CiSearch } from "react-icons/ci";
// const MusicSearch = () => {
//   const [isInputFocused, setIsInputFocused] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const searchSong = () => {
//   };

//   return (
//     <div className="search-bar-container">
//       <div
//         className={`search-bar ${isInputFocused ? "search-bar-focused" : ""}`}
//       >
//         <CiSearch className="MusicSerachBtn" />
//         <input
//           type="text"
//           placeholder="What do you want to listen to?"
//           className="search-input"
//           onFocus={() => setIsInputFocused(true)}
//           onBlur={() => setIsInputFocused(false)}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               searchSong();
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default MusicSearch;
