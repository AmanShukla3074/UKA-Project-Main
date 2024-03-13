import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext"; // Adjust the import path as necessary
import MusicItem from "../MusicItem/MusicItem";
import './Playlist.css'
const Playlist = () => {
 const { playlistId } = useParams();
 const { authTokens } = useContext(AuthContext); // Access the authTokens from the AuthContext

 const [playlistData, setPlaylistData] = useState(null);

 useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/Music/playlist/${playlistId}/`,
          {
            headers: {
              Authorization: `Bearer ${authTokens?.access}`, // Use the access token from authTokens
            },
          }
        );

        if (response.status === 200) {
          // Transform the data structure
          const transformedData = response.data.PlaylistMusic.map(item => ({
            Music_ID: item.Music_ID.Music_ID,
            Music_Title: item.Music_ID.Music_Title,
            Release_Date: item.Music_ID.Release_Date,
            MS_Genre_ID: item.Music_ID.MS_Genre_ID,
            Album_ID: item.Music_ID.Album_ID,
            Copyrightowner: item.Music_ID.Copyrightowner,
            file: item.Music_ID.file,
            cover: item.Music_ID.cover,
            M_Streams: item.Music_ID.M_Streams,
            Artist: item.Music_ID.Artist,
          }));

          setPlaylistData({
            Playlist_Title: response.data.Playlist_Title,
            PlaylistMusic: transformedData,
          });
        } else {
          throw new Error("Failed to fetch playlist data");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPlaylist();
 }, [playlistId, authTokens]);

 return (
    <div>
      {/* Render your playlist data here */}
      {playlistData && (
        <div>
          <h2 className="playlist-title">{playlistData.Playlist_Title}</h2>
          <div className="musicContainer">
            {playlistData.PlaylistMusic.slice(0, 20).map((item) => (
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
        </div>
      )}
    </div>
 );
};

export default Playlist;

// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import AuthContext from "../../../Context/AuthContext"; // Adjust the import path as necessary
// import MusicItem from "../MusicItem/MusicItem";

// const Playlist = () => {
//   const { playlistId } = useParams();
//   const { authTokens } = useContext(AuthContext); // Access the authTokens from the AuthContext

//   const [playlistData, setPlaylistData] = useState(null);

//   useEffect(() => {
//     const fetchPlaylist = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/api/Music/playlist/${playlistId}/`,
//           {
//             headers: {
//               Authorization: `Bearer ${authTokens?.access}`, // Use the access token from authTokens
//             },
//           }
//         );

//         if (response.status === 200) {
//           setPlaylistData(response.data);
//           console.log(response.data);
//         } else {
//           throw new Error("Failed to fetch playlist data");
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     };

//     fetchPlaylist();
//   }, [playlistId, authTokens]);

//   return (
//     <div>
//       {/* Render your playlist data here */}
//       {playlistData && (
//         <div>
//           <h2>{playlistData.Playlist_Title}</h2>
//           <div className="musicContainer">
//             {playlistData.PlaylistMusic.slice(0, 20).map((item) => (
//               <MusicItem
//                 key={item.Music_ID.Music_ID}
//                 id={item.Music_ID.Music_ID}
//                 name={item.Music_ID.Music_Title}
//                 image={item.Music_ID.cover}
//                 artist={item.Music_ID.Artist}
//                 item={item}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Playlist;
