import React from 'react'
import './Profile.css'
import Header from '../Header/Header';

function Profile() {
  return (
    <>
    <Header/>
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form action="" className='profile__form' noValidate>
        <label htmlFor="name" className='profile__label'>
          <span className='profile__span-input'>Имя</span>
          <input type="text" name="name" id="" value='Виталий' />
          <span className='profile__span-error'></span>
        </label>
        <label htmlFor="email" className='profile__label'>
          <span className='profile__span-input'>Имя</span>
          <input type="text" name="email" id="" value='pochta@yandex.ru' />
          <span className='profile__span-error'></span>
        </label>
        <span className='profile__span-responce-error'></span>
        <button className='profile__btn-edit'>Редактировать</button>
        <button className='profile__btn-loguot'>Выйти из аккаунта</button>
        <button className='profile__btn-save'>Сохранить</button>
      </form>
    </section>
    </>
   );
}

export default Profile;
