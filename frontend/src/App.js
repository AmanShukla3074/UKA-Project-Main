import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, MovieBooking, MusicStreaming, Ecommerce,Cart, Footer, MovieDetails } from './Components';
import { Home , EChome , ECCategory,ECProductDetail,MBhome} from './Pages/index.js';
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
          <Route path="Hoodie" element={<ECCategory category="hoodie"/>} />
          <Route path="Sweatshirts" element={<ECCategory category="Sweatshirts"/>} />
          <Route path="Tees" element={<ECCategory category="tees"/>} />
          <Route path="Caps" element={<ECCategory category="Caps"/>} />
          <Route path="Jeans" element={<ECCategory category="Jeans"/>} />
          <Route path="Shoes" element={<ECCategory category="Shoes"/>} />
          <Route path="cart" element={<Cart />} />
          <Route path="product" element={<ECProductDetail />} >
            <Route path=":productId" element={<ECProductDetail />} />
          </Route>
        </Route>
        <Route path="/moviebooking" element={<MovieBooking />} >
          <Route index element={<MBhome />} />
          <Route path="home" element={<MBhome />} />
          <Route path="movie" element={<MovieDetails />} >
            <Route path=":movieId" element={<MovieDetails />} />
          </Route>
          <Route path="theater" element={<MBhome />} />
        </Route>
        <Route path="/musicstreaming/" element={<MusicStreaming />}/>
      </Routes>
      <Footer/>
    </div>
  </Router>

  );
}

export default App;
