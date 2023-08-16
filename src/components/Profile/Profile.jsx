import React, { useContext, useState } from 'react'
import './Profile.css'
import Header from '../Header/Header';
import { CurrentUserContext } from '../../Context/CurrentUserContext/CurrentUserContext';
import useFormValidation from '../../hooks/FormValidation/useFormValidation';

function Profile({ onLogout }) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isValid, handleChange, resetForm, setIsValid } = useFormValidation({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [ isShowSaveBtn, setIsShowSaveBtn ] = useState(false)
  function handleEditBtnClick () {
    setIsShowSaveBtn(true)
  }

  function handleSaveBtnClick (e) {
    e.preventDefault()
    setIsShowSaveBtn(false)
  }

  function handleLogout () {
    onLogout()
  }
  return (
    <>
    <Header/>
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form action="" className='profile__form' noValidate>
        <label htmlFor="name" className='profile__label'>
          <span className='profile__span-input'>Имя</span>
          <input type="text" name="name" id="" defaultValue={currentUser.name} className='profile__input' onFocus={handleEditBtnClick} />
        </label>
        <label htmlFor="email" className='profile__label'>
          <span className='profile__span-input'>E-mail</span>
          <input type="text" name="email" id="" defaultValue={currentUser.email} className='profile__input' onFocus={handleEditBtnClick}/>
        </label>
        <span className='profile__span-responce-error'></span>
        {isShowSaveBtn ? (
          <button type='submit' className='profile__btn-save' onClick={handleSaveBtnClick}>Сохранить</button>
        ) : (
        <>
        <button type='button' className='profile__btn-edit' onClick={handleEditBtnClick}>Редактировать</button>
        <button type='button' className='profile__btn-loguot' onClick={handleLogout}>Выйти из аккаунта</button>
        </>
        )}
      </form>
    </section>
    </>
   );
}

export default Profile;
