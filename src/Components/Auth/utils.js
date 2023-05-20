/* eslint-disable no-useless-escape */

const emailRegEx = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const validateEmail = (email) => {
  return emailRegEx.test(email);
};
export const validatePassword = (password) => {
  const passwordRegEx = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
  if (!passwordRegEx.test(password)) {
    return 'Password must contain an uppercase, lowercase and number';
  }
  return '';
};
export const comparePasswords = (password, confirmPassword) => {
  return password === confirmPassword;
};
