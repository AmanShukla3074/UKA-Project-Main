import React, { useContext } from "react";
import "./BottomBar.css";
import { IoShuffleOutline } from "react-icons/io5";
import { BiSolidSkipPreviousCircle } from "react-icons/bi";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { IoPauseCircleSharp } from "react-icons/io5";
import { IoIosPlayCircle } from "react-icons/io";
import { IoMdRepeat } from "react-icons/io";
import songContext from "../../../Context/songContext";
const BottomBar = ({togglePlayPause}) => {
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);
  return (
    <div className={`${currentSong ? "" : "hidden"} bottom-bar`}>
      {/* <div className="bottom-bar"> */}
      <div className="bottom-bar-left">
        {currentSong && (
          <>
            <div className="bottom-bar-img-container">
              <img
                className="bottom-bar-img"
                src={currentSong.cover}
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

            <BiSolidSkipPreviousCircle className="bottomcenterMarginBottom"/>
            <div className="PlayPause" onClick={togglePlayPause}>
            {isPaused ? (
              < IoIosPlayCircle fontSize={"50px"} />
              ) : (
                <IoPauseCircleSharp fontSize={"50px"} />
                ) }
                </div>
            {/* <IoPauseCircleSharp fontSize={"50px"} />
            <IoIosPlayCircle fontSize={"50px"} /> */}
            <BiSolidSkipNextCircle className="bottomcenterMarginBottom"/>
          </div>
          <div className="bottomBarscontrols-right">
            <IoMdRepeat />
          </div>
        </div>
      </div>
      <div className="bottom-bar-right">aa</div>
    </div>
  );
};

export default BottomBar;
