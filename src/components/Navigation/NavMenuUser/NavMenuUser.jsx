import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavMenuUser.css";

function NavMenuUser() {
  const location = useLocation();
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  function onBurgerMenuOpen() {
    setBurgerMenuOpen(true);
  }
  function onBurgerMenuClose() {
    setBurgerMenuOpen(false);
  }

  return (
    <>
      <nav className="nav">
        <ul className="nav__links">
          <li>
            <Link
              className={
                location.pathname === "/movies"
                  ? "nav__link nav__link_current"
                  : "nav__link"
              }
              to="/movies"
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === "/saved-movies"
                  ? "nav__link nav__link_current"
                  : "nav__link"
              }
              to="/saved-movies"
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link to="/profile" className="nav__link-profile">
          Аккаунт<span className="nav__link-icon"></span>
        </Link>
      </nav>
      <button className="burger-menu" onClick={onBurgerMenuOpen}></button>
      <div
        className={
          isBurgerMenuOpen ? "burger__menu burger__menu_opened" : "burger__menu"
        }
      >
        <div className="burger__layout" onClick={onBurgerMenuClose}></div>
        <div className="burger__content">
          <ul className="burger__links">
            <li className="burger__links-item">
              <Link
                onClick={onBurgerMenuClose}
                to='/'
                className={
                  location.pathname === "/"
                    ? "burger__link burger__link_current"
                    : "burger__link"
                }
              >
                Главная
              </Link>
            </li>
            <li className="burger__links-item">
              <Link
                onClick={onBurgerMenuClose}
                to="/movies"
                className={
                  location.pathname === "/movies"
                    ? "burger__link burger__link_current"
                    : "burger__link"
                }
              >
                Фильмы
              </Link>
            </li>
            <li className="burger__links-item">
              <Link
                onClick={onBurgerMenuClose}
                to="/saved-movies"
                className={
                  location.pathname === "/saved-movies"
                    ? "burger__link burger__link_current"
                    : "burger__link"
                }
              >
                Сохранённые фильмы
              </Link>
            </li>
            <li className="burger__links-item">
              <Link to="/profile" className="nav__link-profile" onClick={onBurgerMenuClose}>
                Аккаунт<span className="nav__link-icon"></span>
              </Link>
            </li>
          </ul>
          <button
            className="burger__close-btn"
            onClick={onBurgerMenuClose}
          ></button>
        </div>
      </div>
    </>
  );
}

export default NavMenuUser;
