import React, { useContext, useState, useEffect } from "react";
import "./BottomBar.css";
import { IoShuffleOutline } from "react-icons/io5";
import { BiSolidSkipPreviousCircle } from "react-icons/bi";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { IoPauseCircleSharp } from "react-icons/io5";
import { IoIosPlayCircle } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import { CgPlayListAdd } from "react-icons/cg";
import songContext from "../../../Context/songContext";
import AddToPlaylistModal from "../Modals/AddToPlaylistModal/AddToPlaylistModal";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import VolumeControl from "../VolumeControl/VolumeControl";
const BottomBar = ({ togglePlayPause }) => {
  const {
    volume,
    soundPlayed,
    currentSong,
    isPaused,
    playNextSong,
    playPreviousSong,
  } = useContext(songContext);

  useEffect(() => {
    if (soundPlayed) {
      soundPlayed.volume(volume);
    }
  }, [volume, soundPlayed]);

  const getCoverUrl = (cover) => {
    const baseUrl = "http://127.0.0.1:8000";
    if (!cover.startsWith(baseUrl)) {
      return baseUrl + cover;
    }
    return cover;
  };

  const { authTokens } = useContext(AuthContext);
  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong.Music_ID;

    const payload = {
      Playlist_ID: playlistId,
      Music_ID: songId,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/Music/playlist-Music/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`, // Including JWT token in the request headers
          },
        }
      );

      if (response.data && response.data.Music_ID) {
        setAddToPlaylistModalOpen(false);
      } else {
        console.error("Failed to add song to playlist");
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error.message);
    }
  };

  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  return (
    <div className={`${currentSong ? "" : "hidden"} bottom-bar`}>
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div className="bottom-bar-left">
        {currentSong && (
          <>
            <div className="bottom-bar-img-container">
              <img
                className="bottom-bar-img"
                src={getCoverUrl(currentSong.cover)}
                alt={currentSong.Music_Title}
              />
            </div>
            <div className="bottom-barDetails">
              <div className="bottom-barTitle">{currentSong.Music_Title}</div>
              <div className="bottom-barArtists">
                {currentSong.Artist.map((artistItem, index) => (
                  <div key={artistItem.Artist_ID} className="artist-info">
                    {artistItem.Artist_Name}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="bottom-bar-center">
        <div className="bottomBarscontrols">
          <div className="bottomBarscontrols-left">
            <IoShuffleOutline />
          </div>
          <div className="bottomBarscontrols-center">
            <div className="prevSong">
              <BiSolidSkipPreviousCircle
                className="bottomcenterMarginBottom"
                onClick={playPreviousSong}
              />
            </div>
            <div className="PlayPause" onClick={togglePlayPause}>
              {isPaused ? (
                <IoIosPlayCircle fontSize={"50px"} />
              ) : (
                <IoPauseCircleSharp fontSize={"50px"} />
              )}
            </div>

            <div className="nextSong">
              <BiSolidSkipNextCircle
                className="bottomcenterMarginBottom"
                onClick={playNextSong}
              />
            </div>
          </div>
          <div className="bottomBarscontrols-right">
            <IoMdRepeat />
          </div>
        </div>
      </div>
      <div className="bottom-bar-right">
        <div className="volControlBot">
        <VolumeControl />
        </div>
        <div
          className="addToPlaylist"
          onClick={() => {
            setAddToPlaylistModalOpen(true);
          }}
        >
          <CgPlayListAdd />
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
