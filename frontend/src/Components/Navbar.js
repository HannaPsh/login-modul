import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const { theme, toggleTheme, user, loggedIn } = useContext(ThemeContext);
  return (
    <div className="header">
      <div className="header-item">
        <Link to="/home">
          <strong>Home Page</strong>
        </Link>
      </div>
      <div className="header-item">
        {user ? (
          <NavLink to="/profile">{user.name}</NavLink>
        ) : (
          <NavLink to="/">Login</NavLink>
        )}
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Theme:light' : 'Theme:dark'}
        </button>
      </div>
    </div>
  );
}
