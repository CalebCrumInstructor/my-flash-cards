import { validateEmail } from './index';

const toggleError = (credentials, setCredentials, name) => {
  const newObj = {
    ...credentials,
  };

  newObj[name].error = true;

  setCredentials(newObj);
};

export const clearAllErrors = (credentials, setCredentials) => {
  const newObj = {
    ...credentials,
  };

  for (const key in newObj) {
    newObj[key].error = false;
  }

  setCredentials(newObj);
};

const checker = (
  registerCreds,
  setRegisterCreds,
  isRegistration,
) => {
  const { email, password, secondPassword } = registerCreds;
  let returnVal = true;

  if (password.val.length > 25 || password.val.length < 8) {
    toggleError(registerCreds, setRegisterCreds, password.name);
    returnVal = false;
  }

  if (isRegistration) {
    if (password.val !== secondPassword.val) {
      toggleError(registerCreds, setRegisterCreds, secondPassword.name);
      returnVal = false;
    }
  }

  if (!validateEmail(email.val)) {
    toggleError(registerCreds, setRegisterCreds, email.name);
    returnVal = false;
  }

  return returnVal;
};

export const validateRegistrationOrLogin = (
  credentials,
  setCredentials,
  isRegistration,
) => {
  clearAllErrors(credentials, setCredentials);

  return checker(credentials, setCredentials, isRegistration);
};
