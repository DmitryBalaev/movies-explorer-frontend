import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import NavMenu from '../NavMenu/Navmenu';

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
    <div
      className="header__logo"
      onClick={() => {
        navigate("/");
      }}
    ></div>
    <NavMenu/>
  </header>
   );
}

export default Header;
