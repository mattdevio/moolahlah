/*----------  Vendor Imports  ----------*/
import { toast } from 'react-toastify';

/*----------  Custom Imports  ----------*/
import { ERROR_MESSAGE } from '@/state/ducks/toast';


/*=======================================
=            toastMiddleware            =
=======================================*/


const toastMiddleware = () => (next) => async (action) => {
  next(action);

  switch (action.type) {

    case ERROR_MESSAGE:
      toast.error(action.payload, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      break;

  } // end switch

};

export default toastMiddleware;

/*=====  End of toastMiddleware  ======*/
