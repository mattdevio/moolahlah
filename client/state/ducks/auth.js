/*----------  Namespace  ----------*/
export const AUTH = '[auth]';

/*----------  Actions  ----------*/
export const REGISTER_NAME = `${AUTH} REGISTER_NAME`;
export const REGISTER_NAME_ERROR = `${AUTH} REGISTER_NAME_ERROR`;
export const REGISTER_EMAIL = `${AUTH} REGISTER_EMAIL`;
export const REGISTER_EMAIL_ERROR = `${AUTH} REGISTER_EMAIL_ERROR`;
export const REGISTER_PASSWORD = `${AUTH} REGISTER_PASSWORD`;
export const REGISTER_PASSWORD_ERROR = `${AUTH} REGISTER_PASSWORD_ERROR`;
export const SUBMIT_REGISTER_FORM = `${AUTH} SUBMIT_REGISTER_FORM`;
export const SIGNIN_EMAIL = `${AUTH} SIGNIN_EMAIL`;
export const SIGNIN_EMAIL_ERROR = `${AUTH} SIGNIN_EMAIL_ERROR`;
export const SIGNIN_PASSWORD = `${AUTH} SIGNIN_PASSWORD`;
export const SIGNIN_PASSWORD_ERROR = `${AUTH} SIGNIN_PASSWORD_ERROR`;
export const SUBMIT_SIGNIN_FORM = `${AUTH} SUBMIT_SIGNIN_FORM`;
export const AUTHENTICATED_USER = `${AUTH} AUTHENTICATED_USER`;
export const CHECK_SESSION = `${AUTH} CHECK_SESSION`;
export const SIGN_OUT = `${AUTH} SIGN_OUT`;

/*----------  Default State  ----------*/
const INITIAL_AUTH_STATE = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerName_Error: '',
  registerEmail_Error: '',
  registerPassword_Error: '',
  signinEmail: '',
  signinPassword: '',
  signinEmail_Error: '',
  signinPassword_Error: '',
  authenticatedUser: {
    name: '',
    email: '',
    password: '',
  },
};

/*----------  Action Creators  ----------*/
export const signOut = () => ({
  type: SIGN_OUT,
});

export const setRegisterName = registerName => ({
  type: REGISTER_NAME,
  registerName,
});

export const setRegisterEmail = registerEmail => ({
  type: REGISTER_EMAIL,
  registerEmail,
});

export const setRegisterPassword = registerPassword => ({
  type: REGISTER_PASSWORD,
  registerPassword,
});

export const setRegisterNameError = registerName_Error => ({
  type: REGISTER_NAME_ERROR,
  registerName_Error: registerName_Error ? registerName_Error : '',
});

export const setRegisterEmailError = registerEmail_Error => ({
  type: REGISTER_EMAIL_ERROR,
  registerEmail_Error: registerEmail_Error ? registerEmail_Error : '',
});

export const setRegisterPasswordError = registerPassword_Error => ({
  type: REGISTER_PASSWORD_ERROR,
  registerPassword_Error: registerPassword_Error ? registerPassword_Error : '',
});

export const submitRegisterForm = () => ({
  type: SUBMIT_REGISTER_FORM,
});

export const setSigninEmail = signinEmail => ({
  type: SIGNIN_EMAIL,
  signinEmail,
});

export const setSigninPassword = signinPassword => ({
  type: SIGNIN_PASSWORD,
  signinPassword,
});

export const setSigninEmailError = signinEmail_Error => ({
  type: SIGNIN_EMAIL_ERROR,
  signinEmail_Error: signinEmail_Error ? signinEmail_Error : '',
});

export const setSigninPasswordError = signinPassword_Error => ({
  type: SIGNIN_PASSWORD_ERROR,
  signinPassword_Error: signinPassword_Error ? signinPassword_Error : '',
});

export const submitSigninForm = () => ({
  type: SUBMIT_SIGNIN_FORM,
});

export const authenticatedUser = ({ name, email, password }) => ({
  type: AUTHENTICATED_USER,
  name,
  email,
  password,
});

export const checkSession = () => ({
  type: CHECK_SESSION,
});

/*===================================
=            authReducer            =
===================================*/

export default function authReducer(state = INITIAL_AUTH_STATE, action) {
  switch (action.type) {

    case REGISTER_NAME:
      return Object.assign({}, state, {
        registerName: action.registerName,
      });

    case REGISTER_EMAIL:
      return Object.assign({}, state, {
        registerEmail: action.registerEmail,
      });

    case REGISTER_PASSWORD:
      return Object.assign({}, state, {
        registerPassword: action.registerPassword,
      });

    case REGISTER_NAME_ERROR:
      return Object.assign({}, state, {
        registerName_Error: action.registerName_Error,
      });

    case REGISTER_EMAIL_ERROR:
      return Object.assign({}, state, {
        registerEmail_Error: action.registerEmail_Error,
      });

    case REGISTER_PASSWORD_ERROR:
      return Object.assign({}, state, {
        registerPassword_Error: action.registerPassword_Error,
      });

    case SIGNIN_EMAIL:
      return Object.assign({}, state, {
        signinEmail: action.signinEmail,
      });

    case SIGNIN_PASSWORD:
      return Object.assign({}, state, {
        signinPassword: action.signinPassword,
      });

    case SIGNIN_EMAIL_ERROR:
      return Object.assign({}, state, {
        signinEmail_Error: action.signinEmail_Error,
      });

    case SIGNIN_PASSWORD_ERROR:
      return Object.assign({}, state, {
        signinPassword_Error: action.signinPassword_Error,
      });

    case AUTHENTICATED_USER:
      return Object.assign({}, state, {
        authenticatedUser: {
          name: action.name,
          email: action.email,
          password: action.password,
        }
      });

    case SIGN_OUT:
      return INITIAL_AUTH_STATE;

    default:
      return state;

  } // end switch
} // end authReducedr

/*=====  End of authReducer  ======*/


