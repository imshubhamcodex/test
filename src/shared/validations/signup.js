import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};
  if (validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!validator.isEmail(data.email)) {
    errors.emailValid = 'Email is invalid';
  }
  if (validator.isEmpty(data.pass)) {
    errors.pass = 'This field is required';
  }
  if (validator.isEmpty(data.certifications)) {
    errors.certifications = 'This field is required';
  }
  if (validator.isEmpty(data.qualifications)) {
    errors.qualifications = 'This field is required';
  }

  if (validator.isEmpty(data.organization)) {
    errors.organization = 'This field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}