/*----------  Vendor Imports  ----------*/
import axios, { CancelToken } from 'axios';

/*----------  Custom Imports  ----------*/
import {
  API_REQUEST,
  apiSuccess,
  apiError,
} from '@/state/ducks/api';
import { showErrorMessage } from '@/state/ducks/toast';

// Cancelation Store
const cancelStore = {};

/*----------  apiMiddleware  ----------*/
const apiMiddleware = ({ dispatch }) => (next) => async (action) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const { url, method, feature, cancelable } = action.meta;

    // Init Request Body
    const request = {
      method,
      url,
      data: action.payload,
    };

    // Handle cancel request option.
    if (cancelable) {
      if (typeof cancelStore[action.type] !== typeof undefined) {
        cancelStore[action.type].cancel('Operation canceled due to new request');
      }
      cancelStore[action.type] = CancelToken.source();
      request.cancelToken = cancelStore[action.type].token;
    }

    let thunk;
    try {
      thunk = await axios(request);
    } catch (error) {
      if (axios.isCancel(error)) return; // No-op for canceled requests
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
