// Custom Imports
import { apiRequest, API_SUCCESS, API_ERROR } from '@/state/ducks/api';
import { showErrorMessage } from '@/state/ducks/toast';

/**
 * analyticsMiddleware
 * Process all request and side affects for the analytics section
 */
const analyticsMiddleware = () => next => action => {
  next(action);

  switch(action.type) {

    default:
      break;

  }

};

export default analyticsMiddleware;
