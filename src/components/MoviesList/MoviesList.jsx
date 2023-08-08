import React from "react";
import "./MoviesList.css";
import { useLocation } from "react-router-dom";

function MoviesList({ children }) {
  const location = useLocation();
  return (
    <section className="movies">
      <ul className="movies__list">{children}</ul>
      {location.pathname === "/saved-movies" ? (
        ""
      ) : (
        <button className="movies__more">Ещё</button>
      )}
    </section>
  );
}

export default MoviesList;
