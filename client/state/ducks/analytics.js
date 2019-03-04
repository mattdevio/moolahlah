// Custom Imports
import { SIGN_OUT } from '@/state/ducks/auth';

// Namespace
export const ANALYTICS = '[analytics]';

// Actions
export const REQUEST_YEAR_REVIEW = `${ANALYTICS} REQUEST_YEAR_REVIEW`;
export const SET_YEAR_REVIEW_DATA = `${ANALYTICS} SET_YEAR_REVIEW_DATA`;
export const REQUEST_MONTH_REVIEW = `${ANALYTICS} REQUEST_MONTH_REVIEW`;
export const SET_MONTH_REVIEW_DATA = `${ANALYTICS} SET_MONTH_REVIEW_DATA`;
export const SET_YEAR_REVIEW_STATUS = `${ANALYTICS} SET_YEAR_REVIEW_STATUS`;
export const SET_MONTH_REVIEW_STATUS = `${ANALYTICS} SET_MONTH_REVIEW_STATUS`;
export const SET_YEAR = `${ANALYTICS} SET_YEAR`;
export const SET_MONTH = `${ANALYTICS} SET_MONTH`;

export const AnalyticStatusEnum = Object.freeze({
  empty: 1,
  loading: 2,
  loaded: 3,
});

// Initial Data
const TODAY = new Date();
const INITIAL_ANALYTICS_DATA = {
  year: TODAY.getFullYear(),
  month: TODAY.getMonth(),
  yearReviewStatus: AnalyticStatusEnum.empty, // Always start empty
  monthReviewStatus: AnalyticStatusEnum.empty, // Always start empty
  yearReview: {},
  monthReview: {},
};


// Action Creators
export const requestYearReview = ({ year }) => ({
  type: REQUEST_YEAR_REVIEW,
  year,
});

export const setYearReviewData = yearReview => ({
  type: SET_YEAR_REVIEW_DATA,
  yearReview,
});

export const requestMonthReview = ({ year, month }) => ({
  type: REQUEST_MONTH_REVIEW,
  month,
  year,
});

export const setMonthReviewData = monthReview => ({
  type: SET_MONTH_REVIEW_DATA,
  monthReview,
});

export const setYearReviewStatusLoaded = () => ({
  type: SET_YEAR_REVIEW_STATUS,
  yearReviewStatus: AnalyticStatusEnum.loaded,
  meta: {
    AnalyticStatusEnum,
  }
});

export const setYearReviewStatusLoading = () => ({
  type: SET_YEAR_REVIEW_STATUS,
  yearReviewStatus: AnalyticStatusEnum.loading,
  meta: {
    AnalyticStatusEnum,
  }
});

export const setYearReviewStatusEmpty = () => ({
  type: SET_YEAR_REVIEW_STATUS,
  yearReviewStatus: AnalyticStatusEnum.empty,
  meta: {
    AnalyticStatusEnum,
  }
});

export const setMonthReviewStatusLoaded = () => ({
  type: SET_MONTH_REVIEW_STATUS,
  monthReviewStatus: AnalyticStatusEnum.loaded,
  meta: {
    AnalyticStatusEnum,
  }
});

export const setMonthReviewStatusLoading = () => ({
  type: SET_MONTH_REVIEW_STATUS,
  monthReviewStatus: AnalyticStatusEnum.loading,
  meta: {
    AnalyticStatusEnum,
  }
});

export const setMonthReviewStatusEmpty = () => ({
  type: SET_MONTH_REVIEW_STATUS,
  monthReviewStatus: AnalyticStatusEnum.empty,
  meta: {
    AnalyticStatusEnum,
  }
});

export const setYear = ({ year }) => ({
  type: SET_YEAR,
  year,
});

export const setMonth = ({ month }) => ({
  type: SET_MONTH,
  month,
});


// Analytics Reducer
const analyticsReducer = (state = INITIAL_ANALYTICS_DATA, action) => {

  switch(action.type) {

    case SET_YEAR:
      return Object.assign({}, state, {
        year: action.year,
      });

    case SET_YEAR_REVIEW_STATUS:
      return Object.assign({}, state, {
        yearReviewStatus: action.yearReviewStatus,
      });

    case SET_MONTH_REVIEW_STATUS:
      return Object.assign({}, state, {
        monthReviewStatus: action.monthReviewStatus,
      });

    case SET_YEAR_REVIEW_DATA:
      return Object.assign({}, state, {
        yearReview: action.yearReview,
      });

    case SET_MONTH_REVIEW_DATA:
      return Object.assign({}, state, {
        monthReview: action.monthReview,
      });

    case SET_MONTH:
      return Object.assign({}, state, {
        month: action.month,
      });

    case SIGN_OUT:
      return INITIAL_ANALYTICS_DATA;

    default:
      return state;

  }

};

export default analyticsReducer;






