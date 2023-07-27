import React from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="error">
      <div className="error__text">
      <h2 className="error__title">404</h2>
      <p className='error__subtitle'>Страница не найдена</p>
      </div>
      <button className='error__link' onClick={() => navigate(-1)}>Назад</button>
    </div>
   );
}

export default NotFound;
