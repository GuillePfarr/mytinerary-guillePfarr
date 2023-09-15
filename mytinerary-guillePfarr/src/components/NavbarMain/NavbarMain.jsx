import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavbarMain.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';

const NavbarMain = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { token } = useSelector(store => store.citiesReducer)
  const user = useSelector((store) => store.userReducer.user)
  const dispatch = useDispatch()
  return (
    <header className="HeaderMain">
      <div className="NavbarContainer">
        <img className='LogoMyTinerary' src="../public/MyTinerary.png"></img>
        <h1 className='MyTNabvar'>      MyTinerary     </h1>

        <button
          className={`ToggleButton ${showMenu ? 'CloseButton' : ''}`}
          onClick={() => setShowMenu(!showMenu)}>

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
            <li>
              <button className='button logout' onClick={() => dispatch(logout())}>LogOut</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
              <li>
                <Link to="/signin">SignIn</Link>
              </li>
            </>
          )}
        </ul>

      </nav>
    </header>
  );
};

export default NavbarMain;