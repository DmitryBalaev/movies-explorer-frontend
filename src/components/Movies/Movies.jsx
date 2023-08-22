import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import Footer from "../Footer/Footer";
import Content from "../Content/Content";
import MoviesList from "../MoviesList/MoviesList";
import Movie from "../Movie/Movie";

function Movies({ movies, onSubmitSearch, setMovies, savedMovies, isLoading, setIsLoading, onPosterClick }) {
  const [valueSearch, setValueSearch] = useState({});

  useEffect(() => {
    let isShort = localStorage.getItem("isShort") === 'true' ? true : false
    let savedMovies = JSON.parse(localStorage.getItem("searchMovies"));
    if (savedMovies !== null) {
      isShort === true
      ? setMovies(JSON.parse(localStorage.getItem("searchMovies")).filter((item) => item.duration <= 40))
      : setMovies(JSON.parse(localStorage.getItem("searchMovies")));
    }
  }, [valueSearch]);

  const getImageLink = (movie) => {
    return movie.movieId
      ? movie.image
      : "https://api.nomoreparties.co/" + movie.image.url;
  };

  const getDuration = (movie) => {
    const hours = Math.floor(movie.duration / 60);
    const minutes = Math.floor(movie.duration % 60);
    return `${hours > 0 ? hours + "ч " : ""}${minutes}м`;
  };

  const getId = (movie) => {
    return movie.movieId ? movie.movieId : movie.id;
  };

  const renderMovie = () => {
    if (movies.length > 0) {
      return movies.map((film) => {
        return (
          <Movie
            key={getId(film)}
            duration={getDuration(film)}
            image={getImageLink(film)}
            currentMovie={film}
            name={film.nameRU}
            alt={`постер фильма: ${film.nameRU}`}
            onPosterClick={onPosterClick}
          />
        );
      });
    }
  };
  return (
    <>
      <Header />
      <Content>
        <SearchForm onSubmitSearch={onSubmitSearch} valueSearch={valueSearch} setValueSearch={setValueSearch} />
        <MoviesList>{renderMovie()}</MoviesList>
      </Content>
      <Footer />
    </>
  );
}

export default Movies;
