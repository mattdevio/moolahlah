/*----------  Vendor Imports  ----------*/
import * as R from 'ramda';

/*----------  Custom Imports  ----------*/
import { apiRequest } from '@/state/ducks/api';
import {
  SIGN_UP_NAME,
  SIGN_UP_EMAIL,
  SIGN_UP_PASSWORD,
  SIGNUP_USER,
  signUpName,
  signUpEmail,
  signUpPassword,
  errorSignUpName,
  errorSignUpEmail,
  errorSignUpPassword,
} from '@/state/ducks/auth';

/*======================================
=            authMiddleware            =
======================================*/

const authMiddleware = ({ getState }) => (next) => (action) => {
  next(action);

  switch (action.type) {

    case SIGN_UP_NAME:
      return next(errorSignUpName(''));

    case SIGN_UP_EMAIL:
      return next(errorSignUpEmail(''));

    case SIGN_UP_PASSWORD:
      return next(errorSignUpPassword(''));

    case SIGNUP_USER:
      processSignUpForm(getState(), next, action.type);
      break;

  }

};

export default authMiddleware;

/*=====  End of authMiddleware  ======*/

const processSignUpForm = ({ auth }, next, actionType) => {
  const payload = R.map(
    R.trim,
    R.pick(['signUpName', 'signUpEmail', 'signUpPassword'], auth)
  );
  next(signUpName(payload.signUpName));
  next(signUpEmail(payload.signUpEmail));
  next(signUpPassword(payload.signUpPassword));

  let isValid = true;
  if (R.isEmpty(payload.signUpName)) {
    isValid = false;
    next(errorSignUpName('Please enter your name'));
  } else if (payload.signUpName.length < 3) {
    isValid = false;
    next(errorSignUpName('Your name is too short!'));
  }

  if (R.isEmpty(payload.signUpEmail)) {
    isValid = false;
    next(errorSignUpEmail('Every account needs an email'));
  } else if (payload.signUpEmail.indexOf('@') < 1) {
    isValid = false;
    next(errorSignUpEmail('Please enter a valid email address'));
  }

  if (R.isEmpty(payload.signUpPassword)) {
    isValid = false;
    next(errorSignUpPassword('Please provide a password'));
  } else if (payload.signUpPassword.length < 6) {
    isValid = false;
    next(errorSignUpPassword('Password too short'));
  }

  if (isValid) {
    next(apiRequest({
      feature: actionType,
      data: payload,
      method: 'post',
      url: '/api/signupuser',
    }));
  }

};
