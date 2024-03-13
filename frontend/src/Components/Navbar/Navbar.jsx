import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import uka_logo from '../Assets/uka_logo2.png';
import { CgProfile } from 'react-icons/cg';
import AuthContext from '../../Context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const [navbarTransparent, setNavbarTransparent] = useState(true);
  const { user, logoutUser } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setNavbarTransparent(false);
      } else {
        setNavbarTransparent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const isEChomeRoute = location.pathname === '/ecommerce/home' || location.pathname === '/ecommerce';

  return (
    <nav className={`navbar ${navbarTransparent && isEChomeRoute ? 'transparent' : 'solid'}`}>
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
      <div className="user-actions">
        {user ? (
          <>
            <button className="profile-btn" onClick={toggleDropdown}>
              <CgProfile />
            </button>
            {dropdownVisible && (
              <div className="dropdown-menu" ref={dropdownRef}>
                <ul>
                  <li>{user.username}</li>
                  <br/>
                  <li>Profile</li>
                  <li>Settings</li>
                  <li onClick={logoutUser}>Logout</li>
                </ul>
              </div>
            )}
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

// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { Link, NavLink, useLocation } from 'react-router-dom';
// import './Navbar.css';
// import uka_logo from '../Assets/uka_logo2.png';
// import { CgProfile } from 'react-icons/cg';
// import AuthContext from '../../Context/AuthContext';

// const Navbar = () => {
//   const location = useLocation();
//   const [navbarTransparent, setNavbarTransparent] = useState(true);
//   const { user, logoutUser } = useContext(AuthContext);
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownVisible(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

//   const isEChomeRoute = location.pathname === '/ecommerce/home' || location.pathname === '/ecommerce';

//   return (
//     <nav className={`navbar ${navbarTransparent && isEChomeRoute ? 'transparent' : 'solid'}`}>
//       <div className="logo">
//         <NavLink to="/">
//           <img src={uka_logo} alt="Logo" />
//         </NavLink>
//       </div>
//       <ul className="nav-links">
//         <li>
//           <NavLink to="/ecommerce">Ecommerce</NavLink>
//         </li>
//         {/* <li>
//           <NavLink to="/ecommerce">{user && <p onClick={logoutUser}>{user.username}</p>}</NavLink>
//         </li> */}
//         <li>
//           <NavLink to="/moviebooking">Movie Booking</NavLink>
//         </li>
//         <li>
//           <NavLink to="/musicstreaming">Music Streaming</NavLink>
//         </li>
//         <li>
//           <NavLink to="/about">About Us</NavLink>
//         </li>
//         <li>
//           <NavLink to="/contact">Contact US</NavLink>
//         </li>
//       </ul>
//       <div className="user-actions">
//         {user ? (
//           <>
//             <button className="profile-btn" onClick={toggleDropdown}>
//               <CgProfile />
//             </button>
//             {dropdownVisible && (
//               <div className="dropdown-menu" ref={dropdownRef}>
//                 <ul>
//                   <li>{user.username}</li>
//                   <br/>
//                   <li>Profile</li>
//                   <li>Settings</li>
//                   <li onClick={logoutUser}>Logout</li>
//                 </ul>
//               </div>
//             )}
//           </>
//         ) : (
//           <Link to="/login">
//             <button className="login-btn">Login</button>
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;