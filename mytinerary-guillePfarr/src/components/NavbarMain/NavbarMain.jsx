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
import './public/assets/logomyt.css'
import LogoMyt from '../../../public/assets/LogoMyt';

const NavbarMain = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="HeaderMain">
      <div className="NavbarContainer">
        <Link to="./public/assets/logomyt.css" className="LogoMyt">
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
