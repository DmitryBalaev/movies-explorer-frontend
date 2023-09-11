import { useContext } from "react";
import { DeviceWidthContext } from "../../Context/DeviceWidthContext/DeviceWidthContext";
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
  handleDelete,
}) {
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
      isMoviesPage: true,
      isSavedMoviesPage: false,
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
          savedMovies={savedMovies}
          text={message}
          isLoading={isLoadingMovie}
          onPosterClick={onPosterClick}
          onLikeClick={onLikeClick}
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

export default Movies;
