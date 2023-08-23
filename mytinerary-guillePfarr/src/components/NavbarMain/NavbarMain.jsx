// import React, { Fragment } from 'react'
// import LiAndAnchor from '../../components/LiAndAnchor/LiAndAnchor'

// const NavbarMain = ({ links }) => {

//     return (
//         <nav>
//             <ul className='flex gap-6'>
//                 {
//                     links.map((link, indice) => {
//                         return (
//                             <Fragment key={indice}>
//                                 <LiAndAnchor value={link.value} active={link.active} content={link.content} />
//                             </Fragment>
//                         )
//                     })
//                 }
//             </ul>
//         </nav>
//     )
// }

// export default NavbarMain;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavbarMain.css';
<<<<<<< HEAD
import './logomyt.css'
import LogoMyt from '../LogoMyt';
=======

import LogoMyt from '../LogoMyt/LogoMyt';
>>>>>>> 5bc1aa94cd98ebf2c31179d0299d0640bfedde03

const NavbarMain = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="HeaderMain">
      <div className="NavbarContainer">
        <Link to="./LogoMyt/LogoMyt.jsx" className="LogoMyt">
          <LogoMyt/>
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
