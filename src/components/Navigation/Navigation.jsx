import React, { useContext } from 'react'
import NavMenuAuth from './NavMenuAuth/NavMenuAuth'
import NavMenuUser from './NavMenuUser/NavMenuUser';
import './Navigation.css'
import { CurrentUserContext } from '../../Context/CurrentUserContext/CurrentUserContext';

function NavMenu() {
  const isAuth = useContext(CurrentUserContext)
  return (
    <>
    {
      isAuth ?
      <NavMenuUser/> :
      <NavMenuAuth/>
    }
    </>
   );
}

export default NavMenu;
