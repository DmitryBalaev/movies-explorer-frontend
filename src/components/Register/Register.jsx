import React from 'react'
import Form from '../Form/From'
import './Register.css'
import { useNavigate } from 'react-router-dom';

function Register({ onLogin, onRegister }) {
  const navigate = useNavigate()
  return (
    <>
      <section className='register'>
        <div className="register__logo" onClick={() => navigate('/')}></div>
        <h1 className="register__title">Добро пожаловать!</h1>
        <Form isRegister={true} onLogin={onLogin} onRegister={onRegister}/>
      </section>
    </>
   );
}

export default Register;
