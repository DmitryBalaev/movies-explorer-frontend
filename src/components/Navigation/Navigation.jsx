import React, { useContext } from 'react'
import NavMenuAuth from './NavMenuAuth/NavMenuAuth'
import NavMenuUser from './NavMenuUser/NavMenuUser';
import './Navigation.css'
import { CurrentUserContext } from '../../Context/CurrentUserContext/CurrentUserContext';

function NavMenu() {
  const isLoggedIn = useContext(CurrentUserContext)
  return (
    <>
    {
      isLoggedIn ?
      <NavMenuUser/> :
      <NavMenuAuth/>
    }
    </>
   );
}

export default NavMenu;
