/*----------  Vendor Imports  ----------*/
import * as R from 'ramda';

/*----------  Custom Imports  ----------*/
import {
  REGISTER_NAME,
  REGISTER_EMAIL,
  REGISTER_PASSWORD,
  SUBMIT_REGISTER_FORM,
  setRegisterName,
  setRegisterEmail,
  setRegisterPassword,
  setRegisterNameError,
  setRegisterEmailError,
  setRegisterPasswordError,
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

    case SUBMIT_REGISTER_FORM:
      processAndSubmit(getState(), next);

  } // end switch

};

export default authMiddleware;

/*=====  End of authMiddleware  ======*/

const processAndSubmit = ({ auth }, next) => {

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
    next(setRegisterEmailError('Invalid Email Address'));
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
  }

};

const clearErrorIfSet = ({ auth }, next, errorKey, errorMessageActionCreator) => {
  if (auth[errorKey] !== '') {
    next(errorMessageActionCreator());
  }
};
