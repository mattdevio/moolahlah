// Custom Imports
import { apiRequest, API_SUCCESS, API_ERROR } from '@/state/ducks/api';
import { showErrorMessage } from '@/state/ducks/toast';
import {
  REQUEST_YEAR_REVIEW,
  SET_YEAR,
  setYearReviewData,
  requestYearReview,
  setStatusLoading,
  setStatusLoaded,
  setStatusEmpty,
} from '@/state/ducks/analytics';

/**
 * analyticsMiddleware
 * Process all request and side affects for the analytics section
 */
const analyticsMiddleware = ({ dispatch }) => next => action => {
  next(action);

  switch(action.type) {

    case SET_YEAR:
      dispatch(requestYearReview({
        year: action.year,
      }));
      break;

    case REQUEST_YEAR_REVIEW:
      next(setStatusLoading());
      next(apiRequest({
        data: {
          year: action.year,
        },
        method: 'POST',
        url: '/analytics/year_review',
        feature: REQUEST_YEAR_REVIEW,
      }));
      break;
    
    case `${REQUEST_YEAR_REVIEW} ${API_SUCCESS}`:
      processRequestYearReviewApiSuccess(next, action);
      next(setStatusLoaded());
      break;

    case `${REQUEST_YEAR_REVIEW} ${API_ERROR}`:
      processRequestYearReviewApiError(next, action);
      next(setStatusEmpty());
      break;

    default:
      break;

  }

};

export default analyticsMiddleware;

const processRequestYearReviewApiSuccess = (next, { payload }) => {
  const { status, message, data } = payload;
  if (status === 1 && message === 'Year review generated') {
    next(setYearReviewData(data));
  } else {
    next(setYearReviewData(data));
    next(showErrorMessage(`Unexpected: ${message}`));
  }
};

const processRequestYearReviewApiError = (next, { payload }) => {
  const { message, errors } = payload;
  if (errors.length > 0) {
    next(showErrorMessage(errors[0].msg));
  } else {
    next(showErrorMessage(message));
  }
};
