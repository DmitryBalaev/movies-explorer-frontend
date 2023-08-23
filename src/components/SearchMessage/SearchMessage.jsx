import React from 'react'
import "./SearchMessage.css"

function SearchMessage ({ text }) {
  return (
    <div className="search-message">
      <h2 className="search-message__text">
        {text}
      </h2>
    </div>
  )
}

export default SearchMessage;
