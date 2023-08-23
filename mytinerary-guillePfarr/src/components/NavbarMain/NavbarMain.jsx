import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavbarMain.css';

const NavbarMain = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="HeaderMain">
      <div className="NavbarContainer">
        <Link to="/" className="Logo">
          YourLogo
        </Link>
        <button
          className={`ToggleButton ${showMenu ? 'CloseButton' : ''}`}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? 'Close' : 'Menu'}
        </button>
      </div>
      <nav className={`NavbarLinks ${showMenu ? 'ShowMenu' : ''}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cities">Cities</Link>
          </li>
          <li>
            <Link to="/favourites">Favourites</Link>
          </li>
          <li>
            <Link to="/mybookings">MyBookings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavbarMain;
