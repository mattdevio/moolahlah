/*----------  Vendor Imports  ----------*/
import { toast } from 'react-toastify';

/*----------  Custom Imports  ----------*/
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/state/ducks/toast';


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
    
    case SUCCESS_MESSAGE:
      toast.success(action.payload, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

  } // end switch

};

export default toastMiddleware;

/*=====  End of toastMiddleware  ======*/
