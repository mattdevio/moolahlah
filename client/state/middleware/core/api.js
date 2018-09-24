/*----------  Vendor Imports  ----------*/
import axios from 'axios';

/*----------  Custom Imports  ----------*/
import {
  API_REQUEST,
  apiSuccess,
  apiError,
} from '@/state/ducks/api';

/*----------  apiMiddleware  ----------*/
const apiMiddleware = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type.includes(API_REQUEST)) {
    const { url, method, feature } = action.meta;

    let request = {
      method,
      url,
      data: action.payload,
    };

    axios(request)
      .then(response => response.data)
      .then(data => dispatch(apiSuccess({ data, feature })))
      .catch(error => dispatch(apiError({ error, feature })));

  } // end if

}; // end apiMiddleware

export default apiMiddleware;
