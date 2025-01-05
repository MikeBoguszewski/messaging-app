import validator from 'validator';

export function validateEmail(email) {
  if (!email) {
    return "Email is required";
  } else if (!validator.isEmail(email)) {
    return "Please enter a valid email address";
  } else {
    return "";
  }
}

export function validatePassword(password) {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters";
  } else {
    return "";
  }
}