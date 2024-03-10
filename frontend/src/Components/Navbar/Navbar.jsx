import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import uka_logo from '../Assets/uka_logo2.png';
import { CgProfile } from 'react-icons/cg';
import AuthContext from '../../Context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const [navbarTransparent, setNavbarTransparent] = useState(true);
  const {user,logoutUser} = useContext(AuthContext)



  useEffect(() => {
    const handleScroll = () => {
      setNavbarTransparent(window.scrollY <= 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // const isEcommerceRoute = location.pathname.startsWith('/ecommerce');
  const isEChomeRoute = location.pathname === '/ecommerce/home' || location.pathname === '/ecommerce'

  return (
    <nav className={`navbar ${navbarTransparent && isEChomeRoute ? 'transparent' : 'solid'}`}>
    {/* <nav className={`navbar ${navbarTransparent && (isEcommerceRoute || isEChomeRoute) ? 'transparent' : 'solid'}`}> */}
      <div className="logo">
        <NavLink to="/">
          <img src={uka_logo} alt="Logo" />
        </NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/ecommerce">Ecommerce</NavLink>
        </li>
        <li>
          <NavLink to="/ecommerce">{user && <p onClick={logoutUser}>{user.username}</p> }</NavLink>
        </li>
        <li>
          <NavLink to="/moviebooking">Movie Booking</NavLink>
        </li>
        <li>
          <NavLink to="/musicstreaming">Music Streaming</NavLink>
        </li>
        <li>
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact US</NavLink>
        </li>
      </ul>
      {/* <div className="user-actions">
        <button className="profile-btn">
          <CgProfile />
        </button>
        <Link to="/login">
        <button className="login-btn">Login</button>
        </Link>
      </div> */}
      <div className="user-actions">
      {user ? (
        <>
          <button className="profile-btn">
            <CgProfile />
          </button>
        </>
      ) : (
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      )}
    </div>
    </nav>
  );
};

export default Navbar;