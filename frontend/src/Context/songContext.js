// In your songContext.js
import { createContext } from "react";

const songContext = createContext({

    volume: 1.0, // Default volume is 1.0 (full volume)
    setVolume: () => {},
    increaseVolume: () => {},
    decreaseVolume: () => {},
   
    songDuration: 0,
    setSongDuration: () => {},
    currentTime: 0,
    setCurrentTime: () => {},
    seekTo: () => {},

 playlist: [],
 setPlaylist: () => {},
 currentSongIndex: 0,
 setCurrentSongIndex: () => {},
 currentSong: null,
 setCurrentSong: () => {},
 soundPlayed: null,
 setSoundPlayed: () => {},
 isPaused: null,
 setIsPaused: () => {},
 playNextSong: () => {},
 playPreviousSong: () => {},
});

export default songContext;
