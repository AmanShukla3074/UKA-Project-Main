import React from "react";
import './PlaylistItem.css'
const PlaylistItem = ({ Playlistid, PlaylistName }) => {
  return (
  
    //   <Link to={`/moviebooking/movie/${id}`} className="movie-link"> 
      <div className="playlistCard">
        <h1 className="playlistTitle">{PlaylistName}</h1>
      </div>

    //   </Link>
 
  );
};

export default PlaylistItem;
