import React from 'react'
import './Input.css'

function Input({ placeholder, name, minLength, maxLength, handleChange }) {
  return (
    <label className='input'>
      <span className='input__placeholder'>{placeholder}</span>
      <input
        className='input__input'
        type={name}
        name={name}
        minLength={minLength || null}
        maxLength={maxLength || null}
        onChange={handleChange}
        required
      />
      <span className='input__error'></span>
    </label>
   );
}

export default Input;
