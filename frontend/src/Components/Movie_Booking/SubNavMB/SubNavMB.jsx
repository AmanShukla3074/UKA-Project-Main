// SubNav.js

import React, { useState, useEffect } from 'react';
import { Outlet , Link} from 'react-router-dom';
import { FaSearch} from 'react-icons/fa';
import { MdLocationOn } from "react-icons/md";
import './SubNavMB.css';

function SubNavMB() {
  const [isSearchBoxVisible, setSearchBoxVisibility] = useState(false);

  

  const toggleSearchBox = () => {
    setSearchBoxVisibility(!isSearchBoxVisible);
  };
  return (
    <div className={`Sub-Nav`}>
      <nav>
        <div className="wapperNav">
        <ul className="left-side">
          <li>
            <Link to="">Movies</Link>
          </li>
          <li>
            <Link to="">Theaters</Link>
          </li>
        </ul>
        <ul className="right-side">
          <li>
            <button className="search-btn-icon" onClick={toggleSearchBox}>
              <FaSearch />
            </button>
          </li>
          <li className='Location'>
            <p>Location</p>
            <button className="location-btn-icon" onClick={toggleSearchBox}>
              <MdLocationOn />
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

export default SubNavMB;
