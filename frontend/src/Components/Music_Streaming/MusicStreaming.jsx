import React, { useContext, useLayoutEffect, useRef } from "react";
import "./MusicStreaming.css";
import SIdebar from "./Sidebar/SIdebar";
import {Howl, Howler} from "howler";
import { Outlet } from "react-router-dom";
import BottomBar from "./BottomBar/BottomBar";
import songContext from "../../Context/songContext";
function MusicStreaming() {
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);
  console.log("aa", currentSong);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
      // the following if statement will prevent the useEffect from running on the first render.
      if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
      }

      if (!currentSong) {
          return;
      }
      changeSong(currentSong.file);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong && currentSong.file]);

  const playSound = () => {
    if (!soundPlayed) {
        return;
    }
    soundPlayed.play();
};

const changeSong = (songSrc) => {
    if (soundPlayed) {
        soundPlayed.stop();
    }
    let sound = new Howl({
        src: [songSrc],
        html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
};

const pauseSound = () => {
    soundPlayed.pause();
};

const togglePlayPause = () => {
    if (isPaused) {
        playSound();
        setIsPaused(false);
    } else {
        pauseSound();
        setIsPaused(true);
    }
};

  return (
    <>
      <div className="musicContain">
        <div
          className={`${currentSong ? "sidebar-half" : "sidebar-full"} sidebar`}
        >
          {/* <div className="sidebar"> */}
          <SIdebar />
        </div>
        <div className={`${currentSong ? "Main-half" : "Main-full"} Main`}>
          <Outlet />
        </div>
      </div>
      <BottomBar togglePlayPause={togglePlayPause} />
    </>
  );
}

export default MusicStreaming;
