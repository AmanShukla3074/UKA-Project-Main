import React, { useState, useEffect } from "react";
import "./MusicSearch.css"; // Import the CSS file
import { CiSearch } from "react-icons/ci";
import axios from "axios"; // Make sure to install axios if you haven't already
import MusicItem from "../MusicItem/MusicItem";

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
  const [searchResults, setSearchResults] = useState({
    artists: [],
    albums: [],
    music: [],
  });
  //  const [searchResults, setSearchResults] = useState([]); // New state for search results
  const debouncedSearchText = useDebounce(searchText, 500); // 500ms delay

  useEffect(() => {
    if (debouncedSearchText) {
      const searchSong = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/Music/search/?query=${debouncedSearchText}`
          );
          setSearchResults(response.data); // Store the search results in state
          console.log(response.data); // Store the search results in state
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      searchSong();
    }
  }, [debouncedSearchText]);
console.log(searchResults.music);
  return (
    <>
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
            //   onKeyDown={(e) => {
            //     if (e.key === "Enter") {
            //     //   searchSong();
            //     }
            //   }}
          />
        </div>
      </div>
      <div className="search-results-container">
        {/* {searchResults.artists.length > 0 && (
          <>
            <h2 className="searchMusicHeader">Artists</h2>
            {searchResults.artists.map((artist, index) => (
              <div key={index} className="artist">
                <h3>{artist.Artist_Name}</h3>
                <p>{artist.Bio}</p>
              </div>
            ))}
          </>
        )}

        {searchResults.albums.length > 0 && (
          <>
            <h2 className="searchMusicHeader">Albums</h2>
            {searchResults.albums.map((album, index) => (
              <div key={index} className="album">
                <h3>{album.Album_Title}</h3>
                <p>Release Date: {album.ReleaseDate}</p>
                <p>No. of Songs: {album.No_Of_Songs}</p>
              </div>
            ))}
          </>
        )} */}

        {searchResults.music.length > 0 && (
          <>
            {/* <h2 className="searchMusicHeader">Music</h2> */}
            <div className="musicContainer">
              {searchResults.music.map((item) => (
                <MusicItem
                  key={item.Music_ID}
                  id={item.Music_ID}
                  name={item.Music_Title}
                  image={item.cover}
                  artist={item.Artist}
                  item={item}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MusicSearch;

// import React, { useState, useEffect } from "react";
// import "./MusicSearch.css"; // Import the CSS file
// import { CiSearch } from "react-icons/ci";
// import axios from "axios"; // Make sure to install axios if you haven't already

// // Custom hook for debouncing
// function useDebounce(value, delay) {
//  const [debouncedValue, setDebouncedValue] = useState(value);

//  useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//  }, [value, delay]);

//  return debouncedValue;
// }

// const MusicSearch = () => {
//  const [isInputFocused, setIsInputFocused] = useState(false);
//  const [searchText, setSearchText] = useState("");
//  const [searchResults, setSearchResults] = useState([]); // New state for search results
//  const debouncedSearchText = useDebounce(searchText, 500); // 500ms delay

//  useEffect(() => {
//     if (debouncedSearchText) {
//       const searchSong = async () => {
//         try {
//           const response = await axios.get(`http://127.0.0.1:8000/api/Music/search/?query=${debouncedSearchText}`);
//           setSearchResults(response.data); // Store the search results in state
//           console.log(response.data); // Store the search results in state
//         } catch (error) {
//           console.error("Error fetching search results:", error);
//         }
//       };

//       searchSong();
//     }
//  }, [debouncedSearchText]);

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
//         //   onKeyDown={(e) => {
//         //     if (e.key === "Enter") {
//         //     //   searchSong();
//         //     }
//         //   }}
//         />
//       </div>
//     </div>
//   );
// };

// export default MusicSearch;
