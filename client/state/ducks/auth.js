/*----------  Namespace  ----------*/
export const AUTH = '[auth]';

/*----------  Actions  ----------*/
export const SIGNUP_USER = `${AUTH} SIGNUP_USER`;
export const SIGN_UP_NAME = `${AUTH} SIGN_UP_NAME`;
export const SIGN_UP_EMAIL = `${AUTH} SIGN_UP_EMAIL`;
export const SIGN_UP_PASSWORD = `${AUTH} SIGN_UP_PASSWORD`;
export const ERROR_SIGN_UP_NAME = `${AUTH} ERROR_SIGN_UP_NAME`;
export const ERROR_SIGN_UP_EMAIL = `${AUTH} ERROR_SIGN_UP_EMAIL`;
export const ERROR_SIGN_UP_PASSWORD = `${AUTH} ERROR_SIGN_UP_PASSWORD`;



/*----------  Initial State  ----------*/
const INITTIAL_AUTH_STATE = {
  signUpName: '',
  signUpEmail: '',
  signUpPassword: '',
  errorSignUpName: '',
  errorSignUpEmail: '',
  errorSignUpPassword: '',
};

/*----------  Action Creators  ----------*/
export const signUpName = (signUpName) => ({
  type: SIGN_UP_NAME,
  signUpName,
});

export const signUpEmail = (signUpEmail) => ({
  type: SIGN_UP_EMAIL,
  signUpEmail,
});

export const signUpPassword = (signUpPassword) => ({
  type: SIGN_UP_PASSWORD,
  signUpPassword,
});

export const errorSignUpName = (errorSignUpName) => ({
  type: ERROR_SIGN_UP_NAME,
  errorSignUpName,
});

export const errorSignUpEmail = (errorSignUpEmail) => ({
  type: ERROR_SIGN_UP_EMAIL,
  errorSignUpEmail,
});

export const errorSignUpPassword = (errorSignUpPassword) => ({
  type: ERROR_SIGN_UP_PASSWORD,
  errorSignUpPassword,
});

export const signUpUser = () => ({
  type: SIGNUP_USER,
});

/*===================================
=            authReducer            =
===================================*/

export default function authReducer(state = INITTIAL_AUTH_STATE, action) {
  switch (action.type) {

    case SIGN_UP_NAME:
      return { ...state, signUpName: action.signUpName };

    case SIGN_UP_EMAIL:
      return { ...state, signUpEmail: action.signUpEmail };

    case SIGN_UP_PASSWORD:
      return { ...state, signUpPassword: action.signUpPassword };

    case ERROR_SIGN_UP_NAME:
      return { ...state, errorSignUpName: action.errorSignUpName };

    case ERROR_SIGN_UP_EMAIL:
      return { ...state, errorSignUpEmail: action.errorSignUpEmail };

    case ERROR_SIGN_UP_PASSWORD:
      return { ...state, errorSignUpPassword: action.errorSignUpPassword }; 

    default:
      return state;

  } // end switch
} // end function

/*=====  End of authReducer  ======*/
