/*----------  Custom Imports  ----------*/
import { SUBMIT_REGISTER_FORM } from '@/state/ducks/auth';


/*======================================
=            authMiddleware            =
======================================*/

const authMiddleware = () => (next) => (action) => {
  next(action);

  switch (action.type) {

    case SUBMIT_REGISTER_FORM:
      console.log(action);

  } // end switch

};

export default authMiddleware;

/*=====  End of authMiddleware  ======*/
