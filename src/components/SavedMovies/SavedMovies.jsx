import React from 'react'
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import './SavedMovies.css'
import Footer from '../Footer/Footer';
import Content from '../Content/Content';
import MoviesList from '../MoviesList/MoviesList';
import Movie from '../Movie/Movie';
import img from "../../images/movies-images/movies.png";
import img1 from '../../images/movies-images/movies1.png'
import img2 from '../../images/movies-images/movies2.png'

function SavedMovies() {
  return (
    <>
      <Header/>
      <Content>
      <SearchForm/>
      <MoviesList>
          <Movie img={img} name={'33 слова о дизайне'} duration={'1ч 47м'} alt={'постер фильма 33 слова о дизайне'}/>
          <Movie img={img1} name={'Киноальманах «100 лет дизайна»'} duration={'1ч 47м'} alt={'постер фильма Киноальманах «100 лет дизайна»'}/>
          <Movie img={img2} name={'В погоне за Бенкси'} duration={'1ч 47м'} alt={'В погоне за Бенкси'}/>
       </MoviesList>
      </Content>
      <Footer/>
    </>
   );
}

export default SavedMovies;
