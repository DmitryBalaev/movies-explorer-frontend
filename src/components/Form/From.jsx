import React from "react";
import "./Form.css";
import Input from "./Input/Input";
import { Link } from "react-router-dom";
import useFormValidation from "../../hooks/FormValidation/useFormValidation";
import Preloader from "../Preloader/Preloader";

function Form({ isRegister, onLogin, onRegister, isLoading, error }) {
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
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    resetForm();
    isRegister
      ? onRegister({
          email: values.email,
          password: values.password,
          name: values.name,
        })
      : onLogin({ email: values.email, password: values.password });
  };
  return (
    <form
      className="form"
      name={isRegister ? "register" : "login"}
      onSubmit={handleSubmit}
      noValidate
    >
      {isRegister && (
        <Input
          placeholder="Имя"
          name="name"
          values={values}
          errors={errors}
          minLength={2}
          maxLength={30}
          handleChange={handleChange}
        />
      )}
      <Input
        placeholder="E-mail"
        name="email"
        handleChange={handleChange}
        values={values}
        errors={errors}
      />
      <Input
        placeholder="Пароль"
        name="password"
        handleChange={handleChange}
        values={values}
        errors={errors}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <p
            className={`
              ${
                isRegister
                  ? "form__responce-error"
                  : "form__responce-error form__responce-error_type_login"
              }
              ${error.isError ? "" : "from__responce-error_type_ok"}
            `}
          >
            {error.message}
          </p>
          <button
            type="submit"
            className={`form__button ${
              isRegister ? "" : "form__button_login"
            } ${!isValid && "form__button_disabled"}`}
            disabled={!isValid}
          >
            {texts.buttonText}
          </button>
          <p className="from__question">
            {texts.descriptionText}
            <Link to={texts.linkPath} className="from__link">
              {texts.linkText}
            </Link>
          </p>
        </>
      )}
    </form>
  );
}

export default Form;
