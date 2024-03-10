import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import './SubNavMB.css';

function SubNavMB() {
  const [isSearchBoxVisible, setSearchBoxVisibility] = useState(false);

  const toggleSearchBox = () => {
    setSearchBoxVisibility(!isSearchBoxVisible);
  };

  return (
    <>
    <div className={`Sub-Nav`}>
      <nav className='mbnav'>
        <div className="wapperNav">
          <ul className="left-side">
            <li>
              <Link to="/moviebooking/home">Home</Link>
            </li>
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
        </div>
      </nav>
      <div className={`search-box-ec ${isSearchBoxVisible ? 'visible' : ''}`}>
      {/* <div className={`search-box ${isSearchBoxVisible ? 'visible' : ''}`}> */}
        {isSearchBoxVisible && (
          <>
            <input type="text" placeholder="Search..." className="search-field"/>
            <button className='search-btn-ec'>Submit</button>
          </>
        )}
      </div>
    </div>
    {/* <Outlet /> Move it outside the 'nav' element */}
    </>
  );
}

export default SubNavMB;
