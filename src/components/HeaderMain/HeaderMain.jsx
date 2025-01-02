import React, { useState } from 'react';
import NavbarMain from '../NavbarMain/NavbarMain';
import './headermain.css';

const HeaderMain = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="HeaderMain">
      <div className="NavbarContainer">
        <div className="LogoAndTitle">
          <img className="LogoMyTinerary" src="/MyTinerary.png" alt="MyTinerary Logo" />
          <h1 className="MyTNabvar">MyTinerary</h1>
        </div>
        <button
          className={`ToggleButton ${showMenu ? 'CloseButton' : ''}`}
          onClick={() => setShowMenu(!showMenu)}
          aria-label={showMenu ? 'Close Menu' : 'Open Menu'}
        >
          {showMenu ? 'X' : '☰'}
        </button>
      </div>
      {showMenu && <NavbarMain />}
    </header>
  );
};

export default HeaderMain;
