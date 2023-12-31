import React, { useEffect, useState } from "react";
import "./MoviesList.css";
import { useLocation } from "react-router-dom";
import SearchMessage from "../SearchMessage/SearchMessage";
import Movie from "../Movie/Movie";
import Preloader from "../Preloader/Preloader";
import { BEAT_URL_SHORT } from "../../utils/constants";

function MoviesList({
  movies,
  text,
  savedMovies,
  isLoading,
  onPosterClick,
  onLikeClick,
  handleDelete,
  handleSearch,
  setPage,
  renderCount,
  page,
}) {
  const location = useLocation();
  const [isBtnMoreShow, setIsBtnMoreShow] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const getImageLink = (movie) => {
    return movie.movieId ? movie.image : BEAT_URL_SHORT + movie.image.url;
  };

  const getDuration = (movie) => {
    const hours = Math.floor(movie.duration / 60);
    const minutes = Math.floor(movie.duration % 60);
    return `${hours > 0 ? hours + "ч " : ""}${minutes}м`;
  };

  const getId = (movie) => {
    return movie.movieId ? movie.movieId : movie.id;
  };

  useEffect(() => {
    movies.length >= renderCount
      ? setIsBtnMoreShow(true)
      : setIsBtnMoreShow(false);
  }, [movies, renderCount, page]);

  const handleMoreBtnClick = () => {
    setIsBtnMoreShow(false);
    setIsMoreLoading(true);
    setTimeout(() => {
      setIsBtnMoreShow(true);
      setIsMoreLoading(false);
      setPage((prev) => prev + 1);
    }, 200);
  };

  const isMovieLike = (movie) => {
    const isLike = savedMovies.reduce((acc, film) => {
      if (film.movieId === movie.id) {
        movie._id = film._id;
        return true;
      }
      return acc;
    }, false);

    return isLike;
  };

  const renderMovie = (renderCount) => {
    if (movies.length > 0) {
      return movies.slice(0, renderCount).map((film) => {
        return (
          <Movie
            key={getId(film)}
            duration={getDuration(film)}
            image={getImageLink(film)}
            currentMovie={film}
            name={film.nameRU}
            alt={`постер фильма: ${film.nameRU}`}
            onPosterClick={onPosterClick}
            onLikeClick={onLikeClick}
            isMovieLike={isMovieLike(film)}
            handleDelete={handleDelete}
            handleSearch={handleSearch}
          />
        );
      });
    }
  };
  return (
    <section className="movies">
      {movies.length === 0 && <SearchMessage text={text} />}
      {isLoading ? (
        <Preloader />
      ) : (
        <ul className="movies__list">{renderMovie(renderCount)}</ul>
      )}
      {location.pathname === "/movies" && isBtnMoreShow ? (
        <button className="movies__more" onClick={handleMoreBtnClick}>
          Ещё
        </button>
      ) : (
        ""
      )}
      {isMoreLoading && <Preloader />}
    </section>
  );
}

export default MoviesList;
