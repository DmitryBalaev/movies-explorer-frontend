import React, { useState } from 'react'
import './Movie.css'
import { useLocation } from "react-router-dom";

function Movie({ image, name, duration, alt }) {
  const [ isLiked, setIsLiked ] = useState(false)
  const location = useLocation()

  function handleLikeMovie () {
    setIsLiked(!isLiked)
  }
  return (
    <li className="movie">
    <img src={image} alt={alt} className="movie__img" />
    <div className="movie__name-wrapper">
      <p className="movie__name">{name}</p>
      {
        location.pathname === '/saved-movies' ?
        <button className="movie__btn-delete"></button> :
        <button className={isLiked ? 'movie__btn-like movie__btn-like_liked' : 'movie__btn-like'} onClick={handleLikeMovie}></button>
      }
    </div>
    <p className="movie__duration">{duration}</p>
  </li>
   );
}

export default Movie;
