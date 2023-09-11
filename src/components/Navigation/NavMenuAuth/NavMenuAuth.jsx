import React from "react";
import { Link } from "react-router-dom";
import "./NavMenuAuth.css";

function NavMenuAuth() {
  return (
    <nav className="nav-promo">
      <ul className="nav-promo__links">
        <li>
          <Link to="/signup" className="nav-promo__link nav-promo__link_register">Регистрация</Link>
        </li>
        <li>
          <Link to="/signin" className="nav-promo__link nav-promo__link_login">Войти</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenuAuth;
