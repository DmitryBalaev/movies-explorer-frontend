import React from 'react'
import { useLocation } from 'react-router-dom';
import NavMenuPromo from './NavMenuPromo/NavMenuPromo'

function NavMenu() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? <NavMenuPromo/> : ''}
    </>
   );
}

export default NavMenu;
