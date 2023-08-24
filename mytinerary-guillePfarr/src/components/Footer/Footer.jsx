import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "../../components/Footer/footer.css"


const FooterMain = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (<footer className="FooterMain">
        <div className="NavbarContainer">
            <Link to="/" className="Logo">
                MyTineraries
            </Link>
            <button
                className={`ToggleButton ${showMenu ? 'CloseButton' : ''}`}
                onClick={() => setShowMenu(!showMenu)}
            >
                {showMenu ? 'Close' : 'Menu'}
            </button>
        </div>
        <nav className={`NavbarLinks ${showMenu ? 'ShowMenu' : ''}`}>
            <ul className="footer-ul">
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
    </footer>
    );
};

export default Footer;