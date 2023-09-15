import React, { useState } from 'react';
import NavbarMain from '../NavbarMain/NavbarMain';
import './headermain.css';

const links = [
  { value: '/', content: 'Home', id: '1', active: true },
  { value: '/cities', content: 'Cities', id: '2', active: false },
  { value: '/signup', content: 'SignUp', id: '3', active: false },
  { value: '/signin', content: 'SignIn', id: '4', active: false },
  { value: '/signout', content: 'SignOut', id: '5', active: false }
];

const HeaderMain = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="HeaderMain">
      <button className="toggle-button" onClick={() => setShowMenu(showMenu)}>
        Menu
      </button>
      {showMenu && <NavbarMain links={links} />}
    </header>
  );
};

export default HeaderMain;



