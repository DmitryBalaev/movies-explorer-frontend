import React from 'react'
import './MoviesList.css'

function MoviesList({ children }) {
  return (
    <section className="movies">
    <ul className="movies__list">
      {children}
    </ul>
    <button className='movies__more'>Ещё</button>
  </section>
   );
}

export default MoviesList;
