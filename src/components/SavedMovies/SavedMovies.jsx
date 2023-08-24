import React, { useContext } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import Footer from "../Footer/Footer";
import Content from "../Content/Content";
import MoviesList from "../MoviesList/MoviesList";
import { useSearch } from "../../hooks/useSearch/useSearch";
import { DeviceWidthContext } from "../../Context/DeviceWidthContext/DeviceWidthContext";

function SavedMovies({ movies, onPosterClick, handleError, handleDelete }) {
  const device = useContext(DeviceWidthContext);
  const {
    filtredMovies,
    message,
    isLoadingMovie,
    handleSearch,
    renderCount,
    setPage,
    page,
  } = useSearch(
    {
      movies: movies,
      isMoviesPage: false,
      isSavedMoviesPage: true,
    },
    device
  );

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
          handleDelete={handleDelete}
          setPage={setPage}
          renderCount={renderCount}
          page={page}
        />
      </Content>
      <Footer />
    </>
  );
}

export default SavedMovies;
