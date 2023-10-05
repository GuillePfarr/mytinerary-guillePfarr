import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavbarMain.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';

const NavbarMain = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { token } = useSelector((store) => store.citiesReducer);
  const user = useSelector((store) => store.userReducer.user);
  const userImage = useSelector((store) => store.userReducer.userImage);
  const dispatch = useDispatch();

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
        >   
        {showMenu ? 'X' : '☰'}
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
          {user ? (
            <li className="user-profile">
              {/* <img className="userImage" src={user.image || '/generic-user-image.png'} alt="User" /> */}
              <img
  className="userImage"
  src={user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIFhtkP1KVLsieF9iXxl1HN63NJSdNcbzFOkLztujFA&s"}
  alt="User"
/>
              <button className="buttonLogout" onClick={() => dispatch(logout())}>
                Log Out
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavbarMain;



