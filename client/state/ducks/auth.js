/*----------  Namespace  ----------*/
export const AUTH = '[auth]';

/*----------  Actions  ----------*/
export const REGISTER_NAME = `${AUTH} REGISTER_NAME`;
export const REGISTER_NAME_ERROR = `${AUTH} REGISTER_NAME_ERROR`;
export const REGISTER_EMAIL = `${AUTH} REGISTER_EMAIL`;
export const REGISTER_EMAIL_ERROR = `${AUTH} REGISTER_EMAIL_ERROR`;
export const REGISTER_PASSWORD = `${AUTH} REGISTER_PASSWORD`;
export const REGISTER_PASSWORD_ERROR = `${AUTH} REGISTER_PASSWORD_ERROR`;

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

/*===================================
=            authReducer            =
===================================*/

export default function authReducer(state = INITIAL_AUTH_STATE, action) {
  switch (action.type) {

    default:
      return state;

  } // end switch
} // end authReducedr

/*=====  End of authReducer  ======*/


