// Namespace
export const ANALYTICS = '[analytics]';

// Actions
export const REQUEST_YEAR_REVIEW = `${ANALYTICS} REQUEST_YEAR_REVIEW`;
export const SET_YEAR_REVIEW_DATA = `${ANALYTICS} SET_YEAR_REVIEW_DATA`;
export const SET_STATUS = `${ANALYTICS} SET_STATUS`;
export const SET_YEAR = `${ANALYTICS} SET_YEAR`;

export const AnalyticStatusEnum = Object.freeze({
  empty: 1,
  loading: 2,
  loaded: 3,
});

// Initial Data
const TODAY = new Date();
const INITIAL_ANALYTICS_DATA = {
  year: TODAY.getFullYear(),
  status: AnalyticStatusEnum.empty, // Always starts empty
  yearReview: {},
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

export const setStatusLoaded = () => ({
  type: SET_STATUS,
  status: AnalyticStatusEnum.loaded,
  meta: {
    AnalyticStatusEnum,
  }
});

export const setStatusLoading = () => ({
  type: SET_STATUS,
  status: AnalyticStatusEnum.loading,
  meta: {
    AnalyticStatusEnum,
  }
});

export const setStatusEmpty = () => ({
  type: SET_STATUS,
  status: AnalyticStatusEnum.empty,
  meta: {
    AnalyticStatusEnum,
  }
});

export const setYear = ({ year }) => ({
  type: SET_YEAR,
  year,
});


// Analytics Reducer
const analyticsReducer = (state = INITIAL_ANALYTICS_DATA, action) => {

  switch(action.type) {

    case SET_YEAR:
      return Object.assign({}, state, {
        year: action.year,
      });

    case SET_STATUS:
      return Object.assign({}, state, {
        status: action.status,
      });

    case SET_YEAR_REVIEW_DATA:
      return Object.assign({}, state, {
        yearReview: action.yearReview,
      });

    default:
      return state;

  }

};

export default analyticsReducer;






