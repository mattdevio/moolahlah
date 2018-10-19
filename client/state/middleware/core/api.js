/*----------  Vendor Imports  ----------*/
import axios from 'axios';

/*----------  Custom Imports  ----------*/
import {
  API_REQUEST,
  apiSuccess,
  apiError,
} from '@/state/ducks/api';
import { showErrorMessage } from '@/state/ducks/toast';

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

    let thunk;
    try {
      thunk = await axios(request);
    } catch (error) {
      if (error && error.response && error.response.data) {
        const { data } = error.response;
        return dispatch(apiError({
          error: data,
          feature,
        }));
      }
      // Send log message to server sometime in the future
      return dispatch(showErrorMessage('⚠️ An unknown error occurred!'));
    }

    const { data } = thunk;
    if (data && (data.status === 1 || data.status === 0)) {
      return dispatch(apiSuccess({ data, feature }));
    }
    // Send log message to server sometime in the future
    dispatch(showErrorMessage('⚠️ An unknown error occurred!'));

  } // end if

}; // end apiMiddleware

export default apiMiddleware;
