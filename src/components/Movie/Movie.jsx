import React from 'react'
import './Movie.css'
import { useLocation } from "react-router-dom";

function Movie({ image, name, duration, alt, onPosterClick, currentMovie, onLikeClick, isMovieLike }) {
  const location = useLocation()

  return (
    <li className="movie">
    <img src={image} alt={alt} className="movie__img" onClick={() => onPosterClick(currentMovie)} />
    <div className="movie__name-wrapper">
      <p className="movie__name">{name}</p>
      {
        location.pathname === '/saved-movies' ?
        <button className="movie__btn-delete"></button> :
        <button className={isMovieLike ? 'movie__btn-like movie__btn-like_liked' : 'movie__btn-like'} onClick={() => onLikeClick(currentMovie)}></button>
      }
    </div>
    <p className="movie__duration">{duration}</p>
  </li>
   );
}

export default Movie;
