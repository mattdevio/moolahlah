/*----------  Vendor Imports  ----------*/
import * as R from 'ramda';
import validator from 'validator';

/*----------  Custom Imports  ----------*/
import * as endpoints from '@/constants/endpoints';
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
import {
  apiRequest,
  API_SUCCESS,
  API_ERROR,
} from '@/state/ducks/api';


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

    case `${SUBMIT_REGISTER_FORM} ${API_SUCCESS}`:
      console.dir(action);
      break;

    case `${SUBMIT_REGISTER_FORM} ${API_ERROR}`:
      console.dir(action);
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

  if (validator.isEmpty(payload.registerName)) {
    isValid = false;
    next(setRegisterNameError('Field is required'));
  }

  if (validator.isEmpty(payload.registerEmail)) {
    isValid = false;
    next(setRegisterEmailError('Field is required'));
  } else if (!validator.isEmail(payload.registerEmail)) {
    isValid = false;
    next(setRegisterEmailError('Not a valid email address'));
  }

  if (validator.isEmpty(payload.registerPassword)) {
    isValid = false;
    next(setRegisterPasswordError('Field is required'));
  } else if (validator.isLength(payload.registerPassword, { min: 6 })) {
    isValid = false;
    next(setRegisterPasswordError('Must be atleast 6 characters'));
  } else if (!validator.matches(payload.registerPassword, /\d/)) {
    isValid = false;
    next(setRegisterPasswordError('Must container a number'));
  }

  if (isValid) {
    next(apiRequest({
      feature: SUBMIT_REGISTER_FORM,
      data: payload,
      method: 'POST',
      url: endpoints.USER, 
    }));
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

  next(setSigninEmail(payload.signinEmail));
  next(setSigninPassword(payload.signinPassword));




};
