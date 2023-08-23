import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLinks = ({ showMenu }) => {
  const links = [
    { to: '/', content: 'Home', id: '1' },
    { to: '/cities', content: 'Cities', id: '2' },
    { to: '/favourites', content: 'Favourites', id: '3' },
    { to: '/mybookings', content: 'MyBookings', id: '4' },
  ];

  return (
    <nav className={`NavbarLinks ${showMenu ? 'ShowMenu' : ''}`}>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Link to={link.to}>{link.content}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarLinks;
