import SectionTitle from '../SectionTitle/SectionTitle';
import './Techs.css'

function Techs() {
  return (
    <section className="tech">
      <SectionTitle>Технологии</SectionTitle>
      <div className="tech__info">
        <h3 className="tech__subtitle">7 технологий</h3>
        <p className="tech__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className="tech__stack">
        <li className='tech__stack-item'>HTML</li>
        <li className='tech__stack-item'>CSS</li>
        <li className='tech__stack-item'>JS</li>
        <li className='tech__stack-item'>React</li>
        <li className='tech__stack-item'>Git</li>
        <li className='tech__stack-item'>Express.js</li>
        <li className='tech__stack-item'>mongoDB</li>
      </ul>
    </section>
   );
}

export default Techs;
