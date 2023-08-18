import React, { useEffect } from "react";
import "./SearchForm.css";

function SearchForm({ onSubmitSearch, valueSearch, setValueSearch }) {
  const handleChange = (e) => {
    setValueSearch({ ...valueSearch, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setValueSearch({ ...valueSearch, [e.target.name]: e.target.checked });
    localStorage.setItem("isShort", valueSearch.search__checkbox)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSearch(valueSearch);
  };

  useEffect(() => {
    valueSearch.search = localStorage.getItem("search")
    valueSearch.search_checkbox = localStorage.getItem("isShort") === 'true' ? true : false
    console.log(valueSearch.search_checkbox)
  }, [])
  return (
    <section className="search">
      <form action="" className="search_form" onSubmit={handleSubmit}>
        <div className="search__input-wrapper">
          <input
            type="text"
            name="search"
            id=""
            value={valueSearch.search}
            className="search__input"
            placeholder="Фильмы"
            onChange={handleChange}
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
              name="search_checkbox"
              id=""
              className="search__checkbox"
              onChange={handleCheckbox}
              checked={valueSearch.search_checkbox}
            />
            <span className="search__switch"></span>
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
