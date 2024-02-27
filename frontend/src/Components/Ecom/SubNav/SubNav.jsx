import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import './SubNav.css'
function SubNav() {
  return (
    <div className="sub-nav">
    <nav>
      <ul>
        <li><Link to="cart">Cart</Link></li>
        <Outlet/>
      </ul>
    </nav>
    <div className="search-box">
      <input type="text" placeholder="Search..." />
      <button>Search</button>
    </div>
  </div>
  )
}

export default SubNav
