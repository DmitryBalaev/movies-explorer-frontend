import React from 'react'
import './Portfolio.css'

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__links'>
        <li className='portfolio__links-item'>
          <a className='portfolio__link' href='https://dmitrybalaev.github.io/how-to-learn/' target='_blank' rel='noreferrer noopener'>Статичный сайт</a>
        </li>
        <li className='portfolio__links-item'>
          <a className='portfolio__link' href='https://dmitrybalaev.github.io/russian-travel/' target='_blank' rel='noreferrer noopener'>Адаптивный сайт</a>
        </li>
        <li className='portfolio__links-item'>
          <a className='portfolio__link' href='https://mesto.dmitrybalaev.nomoreparties.sbs/' target='_blank' rel='noreferrer noopener'>Одностраничное приложение</a>
        </li>
      </ul>
    </section>
   );
}

export default Portfolio;
