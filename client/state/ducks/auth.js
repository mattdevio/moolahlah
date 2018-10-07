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

/*----------  Default State  ----------*/
const INITIAL_AUTH_STATE = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerName_Error: '',
  registerEmail_Error: '',
  registerPassword_Error: '',
};

/*----------  Action Creators  ----------*/
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

    default:
      return state;

  } // end switch
} // end authReducedr

/*=====  End of authReducer  ======*/


