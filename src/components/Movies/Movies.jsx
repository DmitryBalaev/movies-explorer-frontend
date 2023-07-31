import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import Footer from "../Footer/Footer";
import Content from "../Content/Content";
import MoviesList from "../MoviesList/MoviesList";
import img from "../../images/movies-images/movies.png";
import img1 from '../../images/movies-images/movies1.png'
import img2 from '../../images/movies-images/movies2.png'
import img3 from '../../images/movies-images/movies3.png'
import img4 from '../../images/movies-images/movies4.png'
import img5 from '../../images/movies-images/movies5.png'
import img6 from '../../images/movies-images/movies6.png'
import img7 from '../../images/movies-images/movies7.png'
import img8 from '../../images/movies-images/movies8.png'
import img9 from '../../images/movies-images/movies9.png'
import img10 from '../../images/movies-images/movies10.png'
import img11 from '../../images/movies-images/movies11.png'
import Movie from "../Movie/Movie";


function Movies() {

  return (
    <>
      <Header />
      <Content>
        <SearchForm />
        <MoviesList>
          <Movie img={img} name={'33 слова о дизайне'} duration={'1ч 47м'}/>
          <Movie img={img1} name={'Киноальманах «100 лет дизайна»'} duration={'1ч 47м'}/>
          <Movie img={img2} name={'В погоне за Бенкси'} duration={'1ч 47м'}/>
          <Movie img={img3} name={'Баския: Взрыв реальности'} duration={'1ч 47м'}/>
          <Movie img={img4} name={'Бег это свобода'} duration={'1ч 47м'}/>
          <Movie img={img5} name={'Книготорговцы'} duration={'1ч 47м'}/>
          <Movie img={img6} name={'Когда я думаю о Германии ночью'} duration={'1ч 47м'}/>
          <Movie img={img7} name={'Gimme Danger: История Игги и The Stooge'} duration={'1ч 47м'}/>
          <Movie img={img8} name={'Дженис: Маленькая девочка грустит'} duration={'1ч 47м'}/>
          <Movie img={img9} name={'Соберись перед прыжком'} duration={'1ч 47м'}/>
          <Movie img={img10} name={'Пи Джей Харви: A dog called money'} duration={'1ч 47м'}/>
          <Movie img={img11} name={'По волнам: Искусство звука в кино'} duration={'1ч 47м'}/>
        </MoviesList>
      </Content>
      <Footer />
    </>
  );
}

export default Movies;
