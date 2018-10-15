/*----------  Vendor Imports  ----------*/
import axios from 'axios';

/*----------  Custom Imports  ----------*/
import {
  API_REQUEST,
  apiSuccess,
  apiError,
} from '@/state/ducks/api';

/*----------  apiMiddleware  ----------*/
const apiMiddleware = ({ dispatch }) => (next) => async (action) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const { url, method, feature } = action.meta;

    let request = {
      method,
      url,
      data: action.payload,
    };

    let response;
    try {
      response = await axios(request);
    } catch (error) {
      return dispatch(apiError({ error, feature }));
    }

    const { data } = response;
    dispatch(apiSuccess({ data, feature }));

  } // end if

}; // end apiMiddleware

export default apiMiddleware;
