import React from 'react';
import { Link } from 'react-router-dom';
// Assets
import Logo from '../assets/logo512.png';
// Components
import LogoutButton from './LogoutButton';

function NavBar() {
  return (
    <nav>
      <Link aria-label="logo" to="/form/list">
        <img src={Logo} alt="logo" />
      </Link>
      <ul>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
