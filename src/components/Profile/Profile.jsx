import React, { useState } from 'react'
import './Profile.css'
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

function Profile({ handleLogout }) {
  const navigate = useNavigate()
  const [ isShowSaveBtn, setIsShowSaveBtn ] = useState(false)

  function handleEditBtnClick () {
    setIsShowSaveBtn(true)
  }

  function handleSaveBtnClick (e) {
    e.preventDefault()
    setIsShowSaveBtn(false)
  }

  function handleLogoutBtnClick () {
    handleLogout()
    navigate('/')
  }

  return (
    <>
    <Header/>
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form action="" className='profile__form' noValidate>
        <label htmlFor="name" className='profile__label'>
          <span className='profile__span-input'>Имя</span>
          <input type="text" name="name" id="" defaultValue='Виталий' className='profile__input'/>
        </label>
        <label htmlFor="email" className='profile__label'>
          <span className='profile__span-input'>Имя</span>
          <input type="text" name="email" id="" defaultValue='pochta@yandex.ru' className='profile__input'/>
        </label>
        <span className='profile__span-responce-error'></span>
        {isShowSaveBtn ? (
          <button type='submit' className='profile__btn-save' onClick={handleSaveBtnClick}>Сохранить</button>
        ) : (
        <>
        <button type='button' className='profile__btn-edit' onClick={handleEditBtnClick}>Редактировать</button>
        <button type='button' className='profile__btn-loguot' onClick={handleLogoutBtnClick}>Выйти из аккаунта</button>
        </>
        )}
      </form>
    </section>
    </>
   );
}

export default Profile;
