import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, MovieBooking, MusicStreaming, Ecommerce } from './Components';
import { Home } from './Pages';
import { Cart } from './Components/Ecom';

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/moviebooking" element={<MovieBooking />} />
        <Route path="/musicstreaming/" element={<MusicStreaming />}>
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
