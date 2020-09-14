import validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  let errors = {};
  
  if (validator.isEmpty(data.category)) {
    errors.category = 'This field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}