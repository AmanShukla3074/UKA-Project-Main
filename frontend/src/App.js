import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, MovieBooking, MusicStreaming, Ecommerce,Cart, Footer } from './Components';
import { Home , EChome , ECCategory} from './Pages/index.js';
// import { Cart } from './Components/Ecom/index';

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ecommerce" element={<Ecommerce />} >
          <Route index element={<EChome />} />
          <Route path="home" element={<EChome />} />
          <Route path="Hoodie" element={<ECCategory category="Hoodie"/>} />
          <Route path="Sweatshirts" element={<ECCategory category="Sweatshirts"/>} />
          <Route path="Tees" element={<ECCategory category="Tees"/>} />
          <Route path="Caps" element={<ECCategory category="Caps"/>} />
          <Route path="Jeans" element={<ECCategory category="Jeans"/>} />
          <Route path="Shoes" element={<ECCategory category="Shoes"/>} />
          <Route path="cart" element={<Cart />} />
        </Route>
       
        <Route path="/moviebooking" element={<MovieBooking />} />
        <Route path="/musicstreaming/" element={<MusicStreaming />}/>
          
      </Routes>
      <Footer/>
    </div>
  </Router>

  );
}

export default App;
