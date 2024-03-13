import React, { useState }  from "react";
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
import {AuthProvider} from './Context/AuthContext';
import songContext from './Context/songContext.js'

function App() {
  const [currentSong, setCurrentSong] = useState(null);
    const [soundPlayed, setSoundPlayed] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
  return (
    <Router>
      <AuthProvider>
        <songContext.Provider 
          value={{
            currentSong,
            setCurrentSong,
            soundPlayed,
            setSoundPlayed,
            isPaused,
            setIsPaused,
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
            <Route
              path="theater/:theaterId/"
              element={<TheaterDetails />}
            />
            
          </Route>
          <Route path="/musicstreaming" element={<MusicStreaming />} >
          <Route index element={<MusicHome />} />
            <Route path="home" element={<MusicHome />} />
            <Route path="playlist" element={<PlaylistPage />} />
            <Route path="add-music" element={<MusicAddPage />} />
            <Route path="add-album" element={<AlbumAddPage />} /> 
            <Route path="mymusic" element={<AlbumAddPage />} /> 
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
