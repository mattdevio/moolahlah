// Custom Imports
import { apiRequest, API_SUCCESS, API_ERROR } from '@/state/ducks/api';
import { showErrorMessage } from '@/state/ducks/toast';
import {
  REQUEST_YEAR_REVIEW,
  SET_YEAR,
  SET_MONTH,
  setYearReviewData,
  requestYearReview,
  setYearReviewStatusLoading,
  setYearReviewStatusLoaded,
  setYearReviewStatusEmpty,
  setMonthReviewStatusLoading,
  setMonthReviewStatusLoaded,
  setMonthReviewStatusEmpty,
  requestMonthReview,
  setMonthReviewData,
} from '@/state/ducks/analytics';
import { REQUEST_MONTH_REVIEW } from '../../ducks/analytics';

/**
 * analyticsMiddleware
 * Process all request and side affects for the analytics section
 */
const analyticsMiddleware = ({ dispatch, getState }) => next => action => {
  next(action);

  switch(action.type) {

    case SET_YEAR:
      dispatch(requestYearReview({
        year: action.year,
      }));
      //  eslint-disable-next-line no-case-declarations
      const { month } = getState().analytics;
      dispatch(requestMonthReview({
        month: month,
        year: action.year,
      }));
      break;

    case SET_MONTH:
      //  eslint-disable-next-line no-case-declarations
      const { year } = getState().analytics;
      dispatch(requestMonthReview({
        month: action.month,
        year: year,
      }));
      break;

    case REQUEST_MONTH_REVIEW:
      next(setMonthReviewStatusLoading());
      next(apiRequest({
        data: {
          year: action.year,
          month: action.month,
        },
        method: 'POST',
        url: '/analytics/month_review',
        feature: REQUEST_MONTH_REVIEW,
      }));
      break;

    case `${REQUEST_MONTH_REVIEW} ${API_SUCCESS}`:
      processRequestMonthReviewApiSuccess(next, action);
      next(setMonthReviewStatusLoaded());
      break;

    case `${REQUEST_MONTH_REVIEW} ${API_ERROR}`:
      processRequestMonthReviewApiError(next, action);
      break;

    case REQUEST_YEAR_REVIEW:
      next(setYearReviewStatusLoading());
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
      next(setYearReviewStatusLoaded());
      break;

    case `${REQUEST_YEAR_REVIEW} ${API_ERROR}`:
      processRequestYearReviewApiError(next, action);
      next(setYearReviewStatusEmpty());
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

const processRequestMonthReviewApiSuccess = (next, { payload }) => {
  const { status, message, data } = payload;
  if (status === 1 && message === 'Month review generated') {
    next(setMonthReviewData(data));
  } else {
    next(setMonthReviewData(data));
    next(showErrorMessage(`Unexpected: ${message}`));
  }
};

const processRequestMonthReviewApiError = (next, { payload }) => {
  const { message, errors } = payload;
  if (errors.length > 0) {
    if (errors[0].msg !== 'No budget by that month') {
      next(showErrorMessage(errors[0].msg));
      next(setMonthReviewStatusEmpty());
    } else {
      next(setMonthReviewStatusEmpty());
    }
  } else {
    next(showErrorMessage(message));
    next(setMonthReviewStatusEmpty());
  }
};