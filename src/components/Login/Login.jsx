import React from 'react'
import './Login.css'
import Form from '../Form/From'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  return (
    <section className="login">
      <div className="login__logo" onClick={() => navigate('/')}></div>
      <h1 className="login__title">Рады видеть!</h1>
      <Form isRegister={false}/>
    </section>
   );
}

export default Login;
