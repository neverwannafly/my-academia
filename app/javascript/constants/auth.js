import { EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from './regex';

const extractKeys = (source = []) => {
  const obj = {};
  source.forEach((row) => { obj[row.key] = ''; });

  return obj;
};

export const signupFormFields = [
  { label: 'Username', key: 'username' },
  { label: 'Email', key: 'email' },
  { label: 'Password', key: 'password' },
];

export const signinFormFields = [
  { label: 'Username', key: 'username' },
  { label: 'Password', key: 'password' },
];

export const signupFormKeys = extractKeys(signupFormFields);
export const signinFormKeys = extractKeys(signinFormFields);

const createValidator = (regexValidator) => (val) => {
  if (val.length === 0) {
    return {
      isError: true,
      error: 'Please enter atleast one character',
    };
  }

  const { error, regex } = regexValidator;
  let isError = false;

  const resp = regex.test(val);

  if (!resp) {
    isError = true;
  }

  return { isError, error };
};

export const formValidators = {
  username: createValidator(USERNAME_REGEX),
  password: createValidator(PASSWORD_REGEX),
  email: createValidator(EMAIL_REGEX),
};

export const extractError = (obj) => {
  const err = {};
  Object.keys(obj).forEach((key) => {
    const [value] = obj[key];
    err[key] = value;
  });

  return err;
};
