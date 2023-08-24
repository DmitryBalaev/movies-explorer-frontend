import React from "react";
import "./Input.css";

function Input({
  placeholder,
  name,
  minLength,
  maxLength,
  handleChange,
  values,
  errors,
  disabled,
}) {
  return (
    <label className="input">
      <span className="input__placeholder">{placeholder}</span>
      <input
        className="input__input"
        type={name}
        name={name}
        minLength={minLength || null}
        maxLength={maxLength || null}
        onChange={handleChange}
        value={values[`${name}`] ?? ""}
        disabled={disabled}
        required
      />
      <span className="input__error">{errors[`${name}`]}</span>
    </label>
  );
}

export default Input;
