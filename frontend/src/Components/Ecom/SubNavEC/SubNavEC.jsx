// SubNav.js

import React, { useState, useEffect } from 'react';
import { Outlet , Link} from 'react-router-dom';
import { FaSearch ,  FaShoppingCart, FaHeart} from 'react-icons/fa';
import './SubNavEC.css';
// import { SubNavEC } from '../..';

function SubNavEC() {
  const [subnavSolid, setSubnavSolid] = useState(false);
  const [isSearchBoxVisible, setSearchBoxVisibility] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setSubnavSolid(true);
      } else {
        setSubnavSolid(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const toggleSearchBox = () => {
    setSearchBoxVisibility(!isSearchBoxVisible);
  };
  return (
    <div className={`sub-nav ${subnavSolid ? 'solid' : ''}`}>
      <nav>
        <div className="wapperNav">
        <ul className="left-side">
          <li>
            <Link to="">Hoodie</Link>
          </li>
          <li>
            <Link to="">Sweatshirts</Link>
          </li>
          <li>
            <Link to="">Tees</Link>
          </li>
          <li>
            <Link to="">Caps</Link>
          </li>
          <li>
            <Link to="">Shoes</Link>
          </li>
        </ul>
        <ul className="right-side">
          <li>
            <Link to="cart">
              <FaShoppingCart />
            </Link>
          </li>
          <li>
            <Link to="wishlist">
              <FaHeart />
            </Link>
          </li>
          <li>
            <button className="search-btn-icon" onClick={toggleSearchBox}>
              <FaSearch />
            </button>
          </li>
        </ul>
        <Outlet />
        </div>
      </nav>
      <div className={`search-box ${isSearchBoxVisible ? 'visible' : ''}`}>
        {isSearchBoxVisible && (
          <>
            <input type="text" placeholder="Search..." />
            <button className=''>Submit</button>
          </>
        )}
      </div>
    </div>
  );
}
//   return (
//     <div className={`sub-nav ${subnavSolid ? 'solid' : ''}`}>
//       <nav>
//         <ul>
//           <li>
//             <Link to="">Hoodie</Link>
//           </li>
//           <li>
//             <Link to="">Shoes</Link>
//           </li>
//           <Outlet />
//         </ul>
//       </nav>
//       <div className={`search-box ${isSearchBoxVisible ? 'visible' : ''}`}>
//         <button onClick={toggleSearchBox}>
//           <FaSearch /> {/* Use the search icon */}
//         </button>
//         {isSearchBoxVisible && (
//           <>
//             <input type="text" placeholder="Search..." />
//             <button>Submit</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

export default SubNavEC;
