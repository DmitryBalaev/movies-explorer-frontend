import { useEffect, useState } from "react";
import {
  LOCAL_STORAGE_LAST_SEARCH,
  CONFIG_MOVIES_RENDER,
} from "../../utils/constants";

export function useSearch({ movies, isSavedMoviesPage, isMoviesPage }, device) {
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);
  const [message, setMessage] = useState(
    "Для поиска фильмов, введите запрос в строку поиска."
  );
  const [renderCount, setRenderCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState({
    valueSearch: "",
    isShort: false,
    movies: [],
  });

  const setMoviesData = (movies, query) => {
    const regExp = /[!,.\-'";:`{}(%«»]/g;
    const { valueSearch, isShort } = query;

    if (isShort) {
      return movies.filter(
        (film) =>
          film.nameRU
            .trim()
            .replace(regExp, "")
            .toLowerCase()
            .includes(valueSearch.trim().replace(regExp, "").toLowerCase()) &&
          film.duration <= 40
      );
    } else {
      return movies.filter((film) =>
        film.nameRU
          .trim()
          .replace(regExp, "")
          .toLowerCase()
          .includes(valueSearch.trim().replace(regExp, "").toLowerCase())
      );
    }
  };

  const handleSearch = (searchQuery) => {
    setPage(0);
    setIsLoadingMovie(true);
    const moviesData = setMoviesData(movies, searchQuery);
    setFiltredMovies(moviesData);

    if (moviesData.length === 0) {
      setMessage("Ничего не найдено, попробуйте изменить поисковый запрос.");
    }

    if (!searchQuery.valueSearch) {
      setMessage("Для поиска, введите запрос в поисковую строку.");
      setFiltredMovies([]);
    }

    if (isMoviesPage) {
      localStorage.setItem(
        LOCAL_STORAGE_LAST_SEARCH,
        JSON.stringify({
          valueSearch: searchQuery.valueSearch,
          isShort: searchQuery.isShort,
          movies: moviesData,
        })
      );
    }

    setTimeout(() => {
      setIsLoadingMovie(false);
    }, 500);
  };

  useEffect(() => {
    setRenderCount(
      CONFIG_MOVIES_RENDER[device].renderCount +
        CONFIG_MOVIES_RENDER[device].moreRender * page
    );
  }, [page, device, renderCount]);

  useEffect(() => {
    if (isMoviesPage) {
      setFiltredMovies(searchQuery.movies);
    }
  }, [isMoviesPage, searchQuery]);

  useEffect(() => {
    if (LOCAL_STORAGE_LAST_SEARCH in localStorage) {
      setSearchQuery(
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH))
      );
    }
  }, [isMoviesPage]);

  useEffect(() => {
    if (isSavedMoviesPage) {
      setFiltredMovies(movies);
    }
  }, [isSavedMoviesPage, movies]);

  return {
    filtredMovies,
    handleSearch,
    message,
    isLoadingMovie,
    renderCount,
    setPage,
    page,
  };
}
