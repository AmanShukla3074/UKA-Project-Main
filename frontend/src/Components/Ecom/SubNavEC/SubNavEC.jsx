import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';
import './SubNavEC.css';

function SubNavEC() {
  const [subnavSolid, setSubnavSolid] = useState(true);
  const [isSearchBoxVisible, setSearchBoxVisibility] = useState(false);
  const [menu, setMenu] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setSubnavSolid(window.scrollY <= 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const toggleSearchBox = () => {
    setSearchBoxVisibility(!isSearchBoxVisible);
  };
  const location = useLocation();
  const isEChomeRoute = location.pathname === '/ecommerce/home' || location.pathname === '/ecommerce'

  return (
    <div className={`sub-nav ${subnavSolid && isEChomeRoute ? ' transparent' : 'solid'}`}>
      <nav>
        <div className="wapperNav">
          <ul className="left-side">
            <li className={menu === "Home" ? 'active' : ''} onClick={() => { setMenu("Home") }}>
              <Link to="/ecommerce/home">Home</Link>
            </li>
            <li className={menu === "Hoodie" ? 'active' : ''} onClick={() => { setMenu("Hoodie") }}>
              <Link to="/ecommerce/Hoodie">Hoodie</Link>
            </li>
            <li className={menu === "Sweatshirts" ? 'active' : ''} onClick={() => { setMenu("Sweatshirts") }}>
              <Link to="/ecommerce/Sweatshirts">Sweatshirts</Link>
            </li>
            <li className={menu === "Tees" ? 'active' : ''} onClick={() => { setMenu("Tees") }}>
              <Link to="/ecommerce/Tees">Tees</Link>
            </li>
            <li className={menu === "Caps" ? 'active' : ''} onClick={() => { setMenu("Caps") }}>
              <Link to="/ecommerce/Caps">Caps</Link>
            </li>
            <li className={menu === "Jeans" ? 'active' : ''} onClick={() => { setMenu("Jeans") }}>
              <Link to="/ecommerce/Jeans">Jeans</Link>
            </li>
            <li className={menu === "Shoes" ? 'active' : ''} onClick={() => { setMenu("Shoes") }}>
              <Link to="/ecommerce/Shoes">Shoes</Link>
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
        </div>
      </nav>
       <div className={`search-box-ec ${isSearchBoxVisible ? 'visible' : ''}`}>
      {isSearchBoxVisible && (
        <>
          <input type="text" placeholder="Search..." className="search-field" />
          <button className='search-btn-ec'>Submit</button>
        </>
      )}
    </div>
    </div>
  );
}

export default SubNavEC;