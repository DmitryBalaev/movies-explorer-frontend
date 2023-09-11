import React from "react";
import "./Movie.css";
import { useLocation } from "react-router-dom";

function Movie({
  image,
  name,
  duration,
  alt,
  onPosterClick,
  currentMovie,
  onLikeClick,
  isMovieLike,
  handleDelete,
}) {
  const location = useLocation();

  const handleLike = () => {
    if (!isMovieLike) {
      return onLikeClick(currentMovie);
    }
    return handleDelete(currentMovie._id);
  };

  return (
    <li className="movie">
      <img
        src={image}
        alt={alt}
        className="movie__img"
        onClick={() => onPosterClick(currentMovie)}
      />
      <div className="movie__name-wrapper">
        <p className="movie__name">{name}</p>
        {location.pathname === "/saved-movies" ? (
          <button
            className="movie__btn-delete"
            onClick={() => handleDelete(currentMovie._id)}
          ></button>
        ) : (
          <button
            className={
              isMovieLike
                ? "movie__btn-like movie__btn-like_liked"
                : "movie__btn-like"
            }
            onClick={handleLike}
          ></button>
        )}
      </div>
      <p className="movie__duration">{duration}</p>
    </li>
  );
}

export default Movie;
