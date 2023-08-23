import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import { LOCAL_STORAGE_LAST_SEARCH } from "../../utils/constants";
import { useLocation } from "react-router-dom";

function SearchForm({ onSubmitSearch, isLoadingMovie, onError }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState({
    valueSearch: '',
    isShort: false,
  })

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH)) {
      const { valueSearch, isShort } = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_LAST_SEARCH)
      );
      setSearchQuery({
        valueSearch,
        isShort,
      })
    }
  },[location])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!searchQuery.valueSearch.trim()) {
      onError()
      return setSearchQuery({...searchQuery, valueSearch: ''})
    }
    onSubmitSearch(searchQuery)
  }

  const handleCheckbox = (e) => {
    if(!searchQuery.valueSearch.trim()) {
      onError()
      return setSearchQuery({...searchQuery, valueSearch: ''})
    }
    setSearchQuery({...searchQuery, isShort: e.target.checked})
    onSubmitSearch({...searchQuery, isShort: e.target.checked})
  }

  const handleChange = (e) => {
    setSearchQuery({...searchQuery, valueSearch: e.target.value})
  }
  return (
    <section className="search">
      <form action="" className="search_form" onSubmit={handleSubmit}>
        <div className="search__input-wrapper">
          <input
            type="text"
            name="search"
            id=""
            value={searchQuery.valueSearch}
            className="search__input"
            placeholder="Фильмы"
            onChange={handleChange}
            disabled={isLoadingMovie}
          />
          <button type="submit" className="search__btn">
            Найти
          </button>
        </div>
        <div className="search__filter-wrapper">
          <p className="search__text">Короткометражки</p>
          <label className="search__label">
            <input
              type="checkbox"
              name="isShort"
              id=""
              className="search__checkbox"
              onChange={handleCheckbox}
              checked={searchQuery.isShort}
              disabled={isLoadingMovie}
            />
            <span className="search__switch"></span>
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
