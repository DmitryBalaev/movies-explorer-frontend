import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import Footer from "../Footer/Footer";
import Content from "../Content/Content";
import MoviesList from "../MoviesList/MoviesList";
import { useSearch } from "../../hooks/useSearch/useSearch";

function SavedMovies({ movies, onPosterClick, handleError }) {
  const { filtredMovies, message, isLoadingMovie, handleSearch } = useSearch({
    movies: movies,
    isMoviesPage: false,
    isSavedMoviesPage: true,
  });

  return (
    <>
      <Header />
      <Content>
        <SearchForm
          onSubmitSearch={handleSearch}
          isLoading={isLoadingMovie}
          onError={handleError}
        />
        <MoviesList
          movies={filtredMovies}
          savedMovies={filtredMovies}
          text={message}
          isLoading={isLoadingMovie}
          onPosterClick={onPosterClick}
        />
      </Content>
      <Footer />
    </>
  );
}

export default SavedMovies;
