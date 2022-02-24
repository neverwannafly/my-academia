export const EMAIL_REGEX = {
  regex: /[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  error: 'Please enter a valid Email',
};
export const USERNAME_REGEX = {
  regex: /^[a-z][a-z0-9_]*$/,
  error: 'Username must start with a letter and can only contain numbers and small case letters',
};
export const PASSWORD_REGEX = {
  regex: /[^ ]{8,64}/,
  error: 'Password should be between 8 to 64 characters long',
};
