/*----------  Vendor Imports  ----------*/
import * as R from 'ramda';
import validator from 'validator';

/*----------  Custom Imports  ----------*/
import history from '@/bin/history';
import { DASHBOARD_BASE, LANDING } from '@/constants/routes';
import { setDisplayOn } from '@/state/ducks/ui';
import {
  CHECK_SESSION,
  REGISTER_NAME,
  REGISTER_EMAIL,
  REGISTER_PASSWORD,
  SUBMIT_REGISTER_FORM,
  SIGNIN_EMAIL,
  SIGNIN_PASSWORD,
  SUBMIT_SIGNIN_FORM,
  SIGN_OUT,
  UPDATE_PASSWORD,
  REQUEST_UPDATE_EMAIL,
  REQUEST_UPDATE_NAME,
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
  authenticatedUser,
  setUpdatedEmail,
  setUpdatedName,
} from '@/state/ducks/auth';
import {
  apiRequest,
  API_SUCCESS,
  API_ERROR,
} from '@/state/ducks/api';
import { showErrorMessage, showSuccessMessage } from '@/state/ducks/toast';


/*======================================
=            authMiddleware            =
======================================*/

const authMiddleware = ({ getState }) => (next) => (action) => {
  next(action);

  switch (action.type) {

    case REQUEST_UPDATE_EMAIL:
      next(apiRequest({
        data: {
          email: action.email,
        },
        method: 'POST',
        url: '/user/update_email',
        feature: REQUEST_UPDATE_EMAIL,
      }));
      break;

    case `${REQUEST_UPDATE_EMAIL} ${API_SUCCESS}`:
      processRequestUpdateEmailApiSuccess(next, action);
      break;

    case `${REQUEST_UPDATE_EMAIL} ${API_ERROR}`:
      processRequestUpdateEmailApiError(next, action);
      break;
    
    case REQUEST_UPDATE_NAME:
      next(apiRequest({
        data: {
          name: action.name,
        },
        method: 'POST',
        url: '/user/update_name',
        feature: REQUEST_UPDATE_NAME,
      }));
      break;

    case `${REQUEST_UPDATE_NAME} ${API_SUCCESS}`:
      processRequestUpdateNameApiSuccess(next, action);
      break;

    case `${REQUEST_UPDATE_NAME} ${API_ERROR}`:
      processRequestUpdateNameApiError(next, action);
      break;  

    case UPDATE_PASSWORD:
      next(apiRequest({
        data: {
          password: action.password
        },
        method: 'POST',
        url: '/user/update_password',
        feature: UPDATE_PASSWORD,
      }));
      break;

    case `${UPDATE_PASSWORD} ${API_SUCCESS}`:
      next(showSuccessMessage('🚀 Password Updated!!'));
      break;
    
    case `${UPDATE_PASSWORD} ${API_ERROR}`:
      processUpdatePasswordApiError(next, action);
      break;

    case SIGN_OUT:
      next(apiRequest({
        data: {},
        method: 'POST',
        url: '/user/logout',
        feature: SIGN_OUT,
      }));
      break;

    case `${SIGN_OUT} ${API_SUCCESS}`:
      history.push(LANDING);
      break;

    case `${SIGN_OUT} ${API_ERROR}`:
      history.push(LANDING);
      break;
      

    case CHECK_SESSION:
      next(apiRequest({
        feature: CHECK_SESSION,
        method: 'GET',
        url: '/user/profile',
      }));
      break;

    case `${CHECK_SESSION} ${API_SUCCESS}`:
      processCheckSessionSuccess(next, action);
      next(setDisplayOn(true));
      break;

    case `${CHECK_SESSION} ${API_ERROR}`:
      // Couldn't validate cookie, no-op
      next(setDisplayOn(true));
      break;

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
      processRegisterSuccess(next, action);
      break;

    case `${SUBMIT_REGISTER_FORM} ${API_ERROR}`:
      processRegisterError(next, action);
      break;

    case `${SUBMIT_SIGNIN_FORM} ${API_SUCCESS}`:
      processSigninSuccess(next, action);
      break;

    case `${SUBMIT_SIGNIN_FORM} ${API_ERROR}`:
      processSigninError(next, action);
      break;

  } // end switch

};

export default authMiddleware;

/*=====  End of authMiddleware  ======*/

/**
 * processCheckSessionSuccess
 * Set the authenticated user if the session cookie returns a valid user
 */
const processCheckSessionSuccess = (next, { payload }) => {
  const { data } = payload;
  const route = history.location.pathname.toLowerCase();
  if (data && data.email) {
    next(authenticatedUser({
      name: data.name,
      email: data.email,
      password: data.password,
    }));
    // If user is on an authentication route, send them to the dashboard
    if (route === '/' || /^\/auth/.test(route)) {
      history.push(DASHBOARD_BASE);
    }
  }
};

/**
 * clearErrorIfSet
 * If there is an error message in 'errorKey', clear it
 */
const clearErrorIfSet = ({ auth }, next, errorKey, errorMessageActionCreator) => {
  if (auth[errorKey] === '') return;
  next(errorMessageActionCreator());
};

/**
 * processRegisterAndSubmit
 * Validate the form fields and send the register user request
 */
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

  // validate name
  if (validator.isEmpty(payload.registerName)) {
    isValid = false;
    next(setRegisterNameError('Field is required'));
  }

  // validate email
  if (validator.isEmpty(payload.registerEmail)) {
    isValid = false;
    next(setRegisterEmailError('Field is required'));
  } else if (!validator.isEmail(payload.registerEmail)) {
    isValid = false;
    next(setRegisterEmailError('Not a valid email address'));
  }

  // validate password
  if (validator.isEmpty(payload.registerPassword)) {
    isValid = false;
    next(setRegisterPasswordError('Field is required'));
  } else if (!validator.isLength(payload.registerPassword, { min: 6 })) {
    isValid = false;
    next(setRegisterPasswordError('Must be atleast 6 characters'));
  } else if (!validator.matches(payload.registerPassword, /\d/)) {
    isValid = false;
    next(setRegisterPasswordError('Must contain a number'));
  }

  if (isValid) {
    next(apiRequest({
      feature: SUBMIT_REGISTER_FORM,
      method: 'POST',
      url: '/user',
      data: {
        name: payload.registerName,
        email: payload.registerEmail,
        password: payload.registerPassword,
      },
    }));
  }

}; // end processRegisterAndSubmit

/**
 * processReigsterSuccess
 * Store the authenticated user after registration success
 */
const processRegisterSuccess = (next, { payload }) => {

  const { data } = payload;
  next(authenticatedUser({
    name: data.name,
    email: data.email,
    password: data.password,
  }));

  history.push(DASHBOARD_BASE);

};

/**
 * processRegisterError
 * Process error response from register user and display errors if any
 */
const processRegisterError = (next, { payload }) => {

  const { errors } = payload;
  const obj = errors.reduce((acc, val) => {
    acc[val.param] = val.msg;
    return acc;
  }, {});

  if (obj.email) next(setRegisterEmailError(obj.email));
  if (obj.name) next(setRegisterNameError(obj.name));
  if (obj.password) next(setRegisterPasswordError(obj.password));

};

/**
 * processSigninAndSubmit
 * Validate the form fields and send the signin user request
 */
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

  let isValid = true;

  if (validator.isEmpty(payload.signinEmail)) {
    isValid = false;
    next(setSigninEmailError('Field is required'));
  } else if (!validator.isEmail(payload.signinEmail)) {
    isValid = false;
    next(setSigninEmailError('Not a valid email address'));
  }

  if (validator.isEmpty(payload.signinPassword)) {
    isValid = false;
    next(setSigninPasswordError('Field is required'));
  }

  if (isValid) {
    next(apiRequest({
      feature: SUBMIT_SIGNIN_FORM,
      method: 'POST',
      url: '/user/login',
      data: {
        email: payload.signinEmail,
        password: payload.signinPassword,
      },
    }));
  }

};

/**
 * processSigninSuccess
 * Store the authenticated user after signin success
 */
const processSigninSuccess = (next, { payload }) => {

  const { data } = payload;

  next(authenticatedUser({
    name: data.name,
    email: data.email,
    password: data.password,
  }));

  history.push(DASHBOARD_BASE);

};

/**
 * processSigninError
 * Process error response from signin user and display errors if any
 */
const processSigninError = (next, { payload }) => {

  const { errors } = payload;
  const obj = errors.reduce((acc, val) => {
    acc[val.param] = val.msg;
    return acc;
  }, {});

  if (obj.email) next(setSigninEmailError(obj.email));
  if (obj.password) next(setSigninPasswordError(obj.password));

};

const processUpdatePasswordApiError = (next, { payload }) => {
  const { errors, message } = payload;
  if (errors.length > 0) {
    next(showErrorMessage(errors[0].msg));
  } else {
    next(showErrorMessage(message));
  }
};

const processRequestUpdateEmailApiSuccess = (next, { payload }) => {
  const { message, data } = payload;
  next(setUpdatedEmail({ email: data.email }));
  next(showSuccessMessage('Email updated!'));
  if (message !== 'Email updated') {
    next(showErrorMessage(`Unexpected: ${message}`));
  }
};

const processRequestUpdateEmailApiError = (next, { payload }) => {
  const { errors, message } = payload;
  if (errors.length > 0) {
    next(showErrorMessage(errors[0].msg));
  } else {
    next(showErrorMessage(message));
  }
};

const processRequestUpdateNameApiSuccess = (next, { payload }) => {
  const { message, data } = payload;
  next(setUpdatedName({ name: data.name }));
  next(showSuccessMessage('Name updated!'));
  if (message !== 'Name updated') {
    next(showErrorMessage(`Unexpected: ${message}`));
  }
};

const processRequestUpdateNameApiError = (next, { payload }) => {
  const { errors, message } = payload;
  if (errors.length > 0) {
    next(showErrorMessage(errors[0].msg));
  } else {
    next(showErrorMessage(message));
  }
};