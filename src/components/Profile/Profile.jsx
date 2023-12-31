import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../Context/CurrentUserContext/CurrentUserContext";
import useFormValidation from "../../hooks/FormValidation/useFormValidation";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

function Profile({ onLogout, onSubmit, isLoading, error, setError }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, isValid, handleChange, setValues, setIsValid } =
    useFormValidation({
      name: currentUser.name,
      email: currentUser.email,
    });
  const [isShowSaveBtn, setIsShowSaveBtn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "profile") {
      setError((prev) => ({
        ...prev,
        message: "",
      }));
    }
  }, [location.pathname, setError]);

  useEffect(() => {
    setValues((user) => ({
      ...user,
      name: currentUser.name,
      email: currentUser.email,
    }));
  }, [currentUser, setValues]);

  useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email)
      setIsValid(false);
  }, [currentUser, values, setIsValid]);

  function handleEditBtnClick() {
    setError((prev) => ({
      ...prev,
      message: "",
    }));
    setIsShowSaveBtn(true);
  }

  function handleLogout() {
    onLogout();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name: values.name, email: values.email });
    setTimeout(() => {
      setIsShowSaveBtn(false);
    }, 500);
  }

  function isSaveBtn() {
    return isLoading ? (
      <Preloader />
    ) : (
      <button type="submit" className="profile__btn-save" disabled={!isValid}>
        Сохранить
      </button>
    );
  }

  return (
    <>
      <Header />
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form
          name="profile"
          className="profile__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <label htmlFor="name" className="profile__label">
            <span className="profile__span-input">Имя</span>
            <input
              type="text"
              name="name"
              id=""
              value={values.name}
              className="profile__input"
              onFocus={handleEditBtnClick}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="email" className="profile__label">
            <span className="profile__span-input">E-mail</span>
            <input
              type="text"
              name="email"
              id=""
              value={values.email}
              className="profile__input"
              onFocus={handleEditBtnClick}
              onChange={handleChange}
              required
            />
          </label>
          <span
            className={`${
              error.isError
                ? "profile__span-responce-error"
                : "profile__span-responce-error profile__span-responce-error_ok"
            }`}
          >
            {error.message}
          </span>
          {isShowSaveBtn ? (
            isSaveBtn()
          ) : (
            <>
              <button
                type="button"
                className="profile__btn-edit"
                onClick={handleEditBtnClick}
              >
                Редактировать
              </button>
              <button
                type="button"
                className="profile__btn-loguot"
                onClick={handleLogout}
              >
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </section>
    </>
  );
}

export default Profile;
