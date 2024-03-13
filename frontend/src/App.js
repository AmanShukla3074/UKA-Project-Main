import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navbar,
  MovieBooking,
  MusicStreaming,
  Ecommerce,
  Cart,
  Footer,
  MovieDetails,
  Showtimes,
  SeatShowtime,
  TheaterDetails,
  AddMusicForm,
  MyMusic,
} from "./Components";
import {
  Home,
  EChome,
  ECCategory,
  ECProductDetail,
  MBhome,
  RegiPage,
  LoginPage,
  OTPPage,
  AddressPage,
  ChangePassPage,
  ForgotPassPage,
  PlaylistPage,
  MusicHome,
  MusicAddPage,
  AlbumAddPage,
  MusicSearchPage,
} from "./Pages/index.js";
// import { Cart } from './Components/Ecom/index';
import { AuthProvider } from "./Context/AuthContext";
import songContext from "./Context/songContext.js";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [playlist, setPlaylist] = useState([]);
const [currentSongIndex, setCurrentSongIndex] = useState(0);
const [songDuration, setSongDuration] = useState(0);
const [currentTime, setCurrentTime] = useState(0);
const [volume, setVolume] = useState(1.0); // Default volume is 1.0 (full volume)

const seekTo = (time) => {
  console.log("Seeking to:", time);
  setCurrentTime(time);
  if (soundPlayed) {
    soundPlayed.seek(time);
  }
};


 const increaseVolume = () => {
    setVolume(Math.min(volume + 0.1, 1.0)); // Increase volume by 0.1, up to a maximum of 1.0
 };

 const decreaseVolume = () => {
    setVolume(Math.max(volume - 0.1, 0.0)); // Decrease volume by 0.1, down to a minimum of 0.0
 };

const playNextSong = () => {
  setCurrentSongIndex((currentSongIndex + 1) % playlist.length); // Loop back to the start if at the end
  setCurrentSong(playlist[currentSongIndex]);
 };
 
 const playPreviousSong = () => {
  setCurrentSongIndex((currentSongIndex - 1 + playlist.length) % playlist.length); // Loop back to the end if at the start
  setCurrentSong(playlist[currentSongIndex]);
 };
  return (
    <Router>
      <AuthProvider>
        <songContext.Provider
          value={{
            playlist,
            setPlaylist,
            currentSongIndex,
            setCurrentSongIndex,
            currentSong,
            setCurrentSong,
            soundPlayed,
            setSoundPlayed,
            isPaused,
            setIsPaused,
            playNextSong,
            playPreviousSong,
            volume,
            setVolume,
            increaseVolume,
            decreaseVolume,
            songDuration,
            setSongDuration,
            currentTime,
            setCurrentTime,
            seekTo,
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<RegiPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/changepassword" element={<ChangePassPage />} />
            <Route path="/forgotpassword" element={<ForgotPassPage />} />

            <Route path="/ecommerce" element={<Ecommerce />}>
              <Route index element={<EChome />} />
              <Route path="home" element={<EChome />} />
              <Route path="Hoodie" element={<ECCategory category="hoodie" />} />
              <Route
                path="Sweatshirts"
                element={<ECCategory category="Sweatshirts" />}
              />
              <Route path="Tees" element={<ECCategory category="tees" />} />
              <Route path="Caps" element={<ECCategory category="Caps" />} />
              <Route path="Jeans" element={<ECCategory category="Jeans" />} />
              <Route path="Shoes" element={<ECCategory category="Shoes" />} />
              <Route path="cart" element={<Cart />} />
              <Route path="product" element={<ECProductDetail />}>
                <Route path=":productId" element={<ECProductDetail />} />
              </Route>
            </Route>
            <Route path="/moviebooking" element={<MovieBooking />}>
              <Route index element={<MBhome />} />
              <Route path="home" element={<MBhome />} />
              <Route path="movie" element={<MovieDetails />}>
                <Route path=":movieId" element={<MovieDetails />} />
              </Route>

              <Route
                path="showtimes/:movieId/:movieType/:movieLang?"
                element={<Showtimes />}
              />
              <Route
                path="showtime-seat/:showtimeId/"
                element={<SeatShowtime />}
              />
              <Route path="theater/:theaterId/" element={<TheaterDetails />} />
            </Route>
            <Route path="/musicstreaming" element={<MusicStreaming />}>
              <Route index element={<MusicHome />} />
              <Route path="home" element={<MusicHome />} />
              <Route path="playlist/:playlistId" element={<PlaylistPage />} />
              <Route path="add-music" element={<MusicAddPage />} />
              <Route path="add-album" element={<AlbumAddPage />} />
              <Route path="mymusic" element={<MyMusic />} />
              <Route path="search" element={<MusicSearchPage />} />
            </Route>
          </Routes>
          <Footer />
        </songContext.Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;
