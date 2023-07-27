import React from "react";
import "./Form.css";
import Input from "./Input/Input";
import { Link } from "react-router-dom";

function Form({ handleChange, isRegister }) {
  const texts = isRegister
    ? {
        buttonText: "Зарегистрироваться",
        descriptionText: "Уже зарегистрированы?",
        linkText: "Войти",
        linkPath: "/signin",
      }
    : {
        buttonText: "Войти",
        descriptionText: "Ещё не зарегистрированы?",
        linkText: "Регистрация",
        linkPath: "/signup",
      };
  return (
    <form className="form">
      {isRegister && (
        <Input
          placeholder="Имя"
          name="name"
          minLength={2}
          maxLength={30}
          handleChange={handleChange}
        />
      )}
      <Input placeholder="E-mail" name="email" handleChange={handleChange} />
      <Input placeholder="Пароль" name="password" handleChange={handleChange} />
      <p className={isRegister ? 'form__responce-error' : 'form__responce-error form__responce-error_type_login'}></p>
      <button type="submit" className="form__button">{texts.buttonText}</button>
      <p className="from__question">
        {texts.descriptionText}
        <Link to={texts.linkPath} className="from__link">{texts.linkText}</Link>
      </p>
    </form>
  );
}

export default Form;
