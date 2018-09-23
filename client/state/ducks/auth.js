/*----------  Vendor Imports  ----------*/
import * as R from 'ramda';

/*----------  Namespace  ----------*/
export const AUTH = '[auth]';

/*----------  Actions  ----------*/
export const SIGNUP_USER = `${AUTH} SIGNUP_USER`;
export const SIGN_UP_FIELDS = `${AUTH} SIGN_UP_FIELDS`;


/*----------  Initial State  ----------*/
const INITTIAL_AUTH_STATE = {
  signUpName: '',
  signUpEmail: '',
  signUpPassword: '',
};

/*----------  Action Creators  ----------*/
export const setSignUpFields = (fields) => ({
  type: SIGN_UP_FIELDS,
  payload: R.pick(['signUpName', 'signUpEmail', 'signUpPassword'], fields),
});

export const signUpUser = () => ({
  type: SIGNUP_USER,
});

/*===================================
=            authReducer            =
===================================*/

export default function authReducer(state = INITTIAL_AUTH_STATE, action) {
  switch (action.type) {

    case SIGN_UP_FIELDS:
      return R.merge({ ...state }, action.payload);

    default:
      return state;

  } // end switch
} // end function

/*=====  End of authReducer  ======*/
