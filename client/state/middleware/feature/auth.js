/*----------  Vendor Imports  ----------*/
import * as R from 'ramda';

/*----------  Custom Imports  ----------*/
import { SIGNUP_USER, setSignUpFields } from '@/state/ducks/auth';
import { apiRequest } from '@/state/ducks/api';

/*======================================
=            authMiddleware            =
======================================*/

const authMiddleware = ({ getState }) => (next) => (action) => {
  next(action);

  switch (action.type) {

    case SIGNUP_USER:
      validateFields(action.type, next, getState());
      break;

  }

};

export default authMiddleware;

/*=====  End of authMiddleware  ======*/

const validateFields = (actionType, next, { auth }) => {
  const payload = R.map(
    R.trim,
    R.pick(['signUpName', 'signUpEmail', 'signUpPassword'], auth)
  );
  const valuesAreNotEmpty = R.not(R.any(
    R.isEmpty,
    R.values(payload)
  ));
  if (valuesAreNotEmpty) {
    // show feedback by toggling form off
    next(apiRequest({
      feature: actionType,
      data: payload,
      method: 'post',
      url: '/api/signupuser',
    }));
  }  else {
    next(setSignUpFields(payload));
    
  }
};