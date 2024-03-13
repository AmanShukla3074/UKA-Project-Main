// In your songContext.js
import { createContext } from "react";

const songContext = createContext({
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
