import { useState, useCallback } from "react";

const useFormValidation = (
  intialValues = {},
  initialErrors = {},
  initialValid = false
) => {
  const [values, setValues] = useState(intialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(initialValid);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setErrors(newErrors);
      setValues(newValues);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    setIsValid,
    setValues,
  };
};

export default useFormValidation;
