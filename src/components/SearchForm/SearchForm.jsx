import React from "react";
import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__input-wrapper">
        <input
          type="text"
          name=""
          id=""
          className="search__input"
          placeholder="Фильмы"
        />
        <button className="search__btn">Найти</button>
      </div>
      <div className="search__filter-wrapper">
        <p className="search__text">Короткометражки</p>
        <label className="search__label">
          <input
            type="checkbox"
            name="search-checkbox"
            id=""
            className="search__checkbox"
          />
          <span className="search__switch"></span>
        </label>
      </div>
    </section>
  );
}

export default SearchForm;
