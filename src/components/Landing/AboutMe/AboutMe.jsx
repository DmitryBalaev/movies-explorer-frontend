import React from 'react';
import "./AboutMe.css";
import SectionTitle from "../SectionTitle/SectionTitle"
import photo from '../../../images/developer-img.png'

function AboutMe() {
  return (
    <section className="me">
      <SectionTitle>Студент</SectionTitle>
      <div className="me__wrapper">
        <div className="me__info">
          <h3 className="me__title">Дмитрий</h3>
          <p className="me__job">Фронтенд-разработчик, 30 лет</p>
          <p className="me__about">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/DmitryBalaev"
            target="_blank"
            className="me__link"
            rel="noreferrer noopener"
          >
            Github
          </a>
        </div>
        <img className="me__photo" src={photo} alt="Фото разработчика сайта" />
      </div>
    </section>
  );
}

export default AboutMe;
