/*----------  Vendor Imports  ----------*/
import * as R from 'ramda';

/*----------  Custom Imports  ----------*/
import {
  REGISTER_NAME,
  REGISTER_EMAIL,
  REGISTER_PASSWORD,
  SUBMIT_REGISTER_FORM,
  SIGNIN_EMAIL,
  SIGNIN_PASSWORD,
  SUBMIT_SIGNIN_FORM,
  setRegisterName,
  setRegisterEmail,
  setRegisterPassword,
  setRegisterNameError,
  setRegisterEmailError,
  setRegisterPasswordError,
  setSigninEmail,
  setSigninPassword,
  setSigninEmailError,
  setSigninPasswordError,
} from '@/state/ducks/auth';


/*======================================
=            authMiddleware            =
======================================*/

const authMiddleware = ({ getState }) => (next) => (action) => {
  next(action);

  switch (action.type) {

    case REGISTER_NAME:
      clearErrorIfSet(getState(), next, 'registerName_Error', setRegisterNameError);
      break;

    case REGISTER_EMAIL:
      clearErrorIfSet(getState(), next, 'registerEmail_Error', setRegisterEmailError);
      break;

    case REGISTER_PASSWORD:
      clearErrorIfSet(getState(), next, 'registerPassword_Error', setRegisterPasswordError);
      break;

    case SIGNIN_EMAIL:
      clearErrorIfSet(getState(), next, 'signinEmail_Error', setSigninEmailError);
      break;

    case SIGNIN_PASSWORD:
      clearErrorIfSet(getState(), next, 'signinPassword_Error', setSigninPasswordError);
      break;

    case SUBMIT_REGISTER_FORM:
      processRegisterAndSubmit(getState(), next);
      break;

    case SUBMIT_SIGNIN_FORM:
      processSigninAndSubmit(getState(), next);
      break;



  } // end switch

};

export default authMiddleware;

/*=====  End of authMiddleware  ======*/

const clearErrorIfSet = ({ auth }, next, errorKey, errorMessageActionCreator) => {
  if (auth[errorKey] !== '') {
    next(errorMessageActionCreator());
  }
};

const processRegisterAndSubmit = ({ auth }, next) => {

  const payload = R.map(
    R.trim,
    R.pick(
      ['registerName', 'registerEmail', 'registerPassword'],
      auth,
    ),
  );

  next(setRegisterName(payload.registerName));
  next(setRegisterEmail(payload.registerEmail));
  next(setRegisterPassword(payload.registerPassword));

  let isValid = true;

  if (payload.registerName === '') {
    next(setRegisterNameError('This field is required'));
    isValid = false;
  }

  if (payload.registerEmail === '') {
    next(setRegisterEmailError('This field is required'));
    isValid = false;
  } else if (payload.registerEmail.indexOf('@') < 3) {
    next(setRegisterEmailError('Invalid email address'));
  }

  if (payload.registerPassword === '') {
    next(setRegisterPasswordError('This field is required'));
    isValid = false;
  } else if (payload.registerPassword.length < 6) {
    next(setRegisterPasswordError('Password must be atleast 6 characters'));
    isValid = false;
  }

  if (isValid) {
    console.log('all good', payload);
    // Call API Route
  }

}; // end processRegisterAndSubmit

const processSigninAndSubmit = ({ auth }, next) => {

  const payload = R.map(
    R.trim,
    R.pick(
      ['signinEmail', 'signinPassword'],
      auth,
    ),
  );

  console.log(payload);

  next(setSigninEmail(payload.signinEmail));
  next(setSigninPassword(payload.signinPassword));

  let isValid = true;

  if (payload.signinEmail === '') {
    next(setSigninEmailError('This field is required'));
    isValid = false;
  } else if (payload.signinEmail.indexOf('@') < 3) {
    next(setSigninEmailError('Invalid email address'));
  }

  if (payload.signinPassword === '') {
    next(setSigninPasswordError('This field is required'));
    isValid = false;
  } else if (payload.signinPassword.length < 6) {
    next(setSigninPasswordError('Password must be atleast 6 characters'));
    isValid = false;
  }

  if (isValid) {
    console.log('all good', payload);
    // Call API Route
  }

};
