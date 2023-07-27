import React from 'react'
import './Header.css'
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
  const navigate = useNavigate();
  const location = useLocation()
  return (
    <header className={location.pathname === '/' ? 'header' : 'header header_transparent'}>
    <div
      className="header__logo"
      onClick={() => {
        navigate("/");
      }}
    ></div>
    <Navigation/>
  </header>
   );
}

export default Header;
