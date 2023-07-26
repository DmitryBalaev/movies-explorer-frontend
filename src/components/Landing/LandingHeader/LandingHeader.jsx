import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LandingHeader.css";

function LandingHeader() {
  const navigate = useNavigate();
  return (
    <header className="landing-header">
      <nav className="landing-header__nav">
        <div
          className="landing-header__logo"
          onClick={() => navigate("/")}
        ></div>
        <ul className="landing-header__links">
          <li>
            <Link className="landing-header__link" to="/signup">
              Регистрация
            </Link>
          </li>
          <li>
            <Link
              className="landing-header__link landing-header__link_login"
              to="signin"
            >
              Войти
            </Link>
          </li>
        </ul>
      </nav>
      <div className="landing-header-wrapper">
        <h1 className="landing-header__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
    </header>
  );
}

export default LandingHeader;
