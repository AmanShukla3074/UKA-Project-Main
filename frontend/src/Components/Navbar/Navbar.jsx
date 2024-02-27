import React from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import uka_logo from '../Assets/uka_logo2.png'

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="logo">
        <NavLink to="/"><img src={uka_logo} alt="Logo" /></NavLink>
        </div>
        <ul className="nav-links">
          <li><NavLink to="/ecommerce">Ecommerce</NavLink></li>
          <li><NavLink to="/moviebooking">Movie Booking</NavLink></li>
          <li><NavLink to="/musicstreaming">Music Streaming</NavLink></li>
          <li><NavLink to="/musicstreaming">About Us</NavLink></li>
          <li><NavLink to="/musicstreaming">Contact US</NavLink></li>
        </ul>
        <div className="user-actions">
          <button className="profile-btn">Profile</button>
          <button className="login-btn">Login</button>
        </div>
      </nav>
    );
  };
  
  export default Navbar;

// function Navbar() {
//   return (
   
//     <div className="header" id="header">
//         <div className="left nav-logo">
//             <a href="#"><img src={uka_logo} alt="" /></a>
//         </div>
//         <div className="right">
//             <ul className="navbar">
//                 <li><a href="index.html" className="active">Ecommerce</a></li>
//                 <li><a href="apprel.html">Movie Booking</a></li>
//                 <li><a href="#">Music Streaming</a></li>
//             </ul>
//         </div>
//         <div className="menu">
//             <button>Login</button>
//             <a><i classNameName="fa-solid fa-cart-shopping"></i></a>
//         </div>
//     </div>
//   )
// }

// export default Navbar
