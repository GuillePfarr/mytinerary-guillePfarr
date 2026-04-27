import React, { useState } from "react";
//import { Link, NavLink } from "react-router-dom";
import "./navbarmain.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { Link, NavLink, useNavigate } from "react-router-dom";


const NavbarMain = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  // ✅ criterio de login: si hay user, mostramos menú de usuario + Devices
  const user = useSelector((store) => store.userReducer.user);

  const dispatch = useDispatch();

  const closeMenu = () => setShowMenu(false);

  return (
    <header className="HeaderMain">
      <div className="NavbarContainer">
        <div className="LogoAndTitle">
          <img className="LogoMyTinerary" src="/MyTinerary.png" alt="MyTinerary Logo" />
          <h1 className="MyTNabvar">MyTinerary</h1>
        </div>

        <button
          className={`ToggleButton ${showMenu ? "CloseButton" : ""}`}
          onClick={() => setShowMenu((s) => !s)}
          type="button"
        >
          {showMenu ? "X Close" : "☰ Menu"}
        </button>
      </div>

      <nav className={`NavbarLinks ${showMenu ? "ShowMenu" : ""}`}>
        <ul>
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/cities" onClick={closeMenu}>
              Cities
            </NavLink>
          </li>

          <li>
            <NavLink to="/vanguard" onClick={closeMenu}>
              Vanguard
            </NavLink>
          </li>

          {/* ✅ nuevo: Devices visible solo si estás logueado */}
          {user && (
            <li>
              <NavLink to="/devices" onClick={closeMenu}>
                Devices
              </NavLink>
            </li>
          )}

          {user ? (
            <li className="user-profile">
              <img
                className="userImage"
                src={
                  user.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvIFhtkP1KVLsieF9iXxl1HN63NJSdNcbzFOkLztujFA&s"
                }
                alt="User"
              />

              {/* <button
                className="buttonLogout"
                type="button"
                onClick={() => {
                  dispatch(logout());
                  closeMenu();
                }}
              >
                Log Out
              </button> */}

              <button
  className="buttonLogout"
  type="button"
  onClick={() => {
    dispatch(logout());
    closeMenu();
    navigate("/signin", { replace: true });
  }}
>
  Log Out
</button>

            </li>
          ) : (
            <>
              <li>
                <NavLink to="/signup" onClick={closeMenu}>
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/signin" onClick={closeMenu}>
                  Sign In
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavbarMain;
