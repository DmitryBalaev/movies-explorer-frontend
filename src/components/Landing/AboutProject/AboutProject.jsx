import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutProject.css'

function AboutProject() {
  return (
    <section className="about">
      <SectionTitle>О проекте</SectionTitle>
      <ul className="about__list">
        <li className="about__list-item">
          <h4 className='about__subtitle'>Дипломный проект включал 5 этапов</h4>
          <p className='about__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="about__list-item">
          <h4 className='about__subtitle'>На выполнение диплома ушло 5 недель</h4>
          <p className='about__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="about__status">
        <div className="about__status-item">
        <p className='about__duration'>1 неделя</p>
        <p className='about__name'>Back-end</p>
        </div>
        <div className="about__status-item">
        <p className='about__duration'>4 недели</p>
        <p className='about__name'>Front-end</p>
        </div>
      </div>
    </section>
   );
}

export default AboutProject;
