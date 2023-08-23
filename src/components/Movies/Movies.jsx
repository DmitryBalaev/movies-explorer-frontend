import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import Footer from "../Footer/Footer";
import Content from "../Content/Content";
import MoviesList from "../MoviesList/MoviesList";

import { useSearch } from "../../hooks/useSearch/useSearch";

function Movies({
  movies,
  savedMovies,
  onPosterClick,
  handleError,
  onLikeClick,
}) {
  const { filtredMovies, message, isLoadingMovie, handleSearch } = useSearch({
    movies: movies,
    isMoviesPage: true,
    isSavedMoviesPage: false,
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
          savedMovies={savedMovies}
          text={message}
          isLoading={isLoadingMovie}
          onPosterClick={onPosterClick}
          onLikeClick={onLikeClick}
        />
      </Content>
      <Footer />
    </>
  );
}

export default Movies;
