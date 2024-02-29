// SubNav.js

import React, { useState, useEffect } from 'react';
// import {  } from 'react-scroll';
import { Outlet , Link} from 'react-router-dom';
import './SubNav.css';

function SubNav() {
  const [subnavSolid, setSubnavSolid] = useState(false);

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

  return (
    <div className={`sub-nav ${subnavSolid ? 'solid' : ''}`}>
      <nav>
        <ul>
          <li><Link to="cart">Cart</Link></li>
          <Outlet />
        </ul>
      </nav>
      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
    </div>
  );
}

export default SubNav;


// import React, { useState, useEffect } from 'react';
// import { Link, animateScroll as scroll } from 'react-scroll';
// import {  Outlet } from 'react-router-dom';
// import './SubNav.css'

// function SubNav() {


//   return (
//     <div className="sub-nav">
//     <nav>
//       <ul>
//         <li><Link to="cart">Cart</Link></li>
//         <Outlet/>
//       </ul>
//     </nav>
//     <div className="search-box">
//       <input type="text" placeholder="Search..." />
//       <button>Search</button>
//     </div>
//   </div>
//   )
// }

// export default SubNav
