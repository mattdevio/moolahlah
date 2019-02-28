// Namespace
export const ANALYTICS = '[analytics]';

// Actions
export const REQUEST_YEAR_REVIEW = `${ANALYTICS} REQUEST_YEAR_REVIEW`;
export const SET_LOADING = `${ANALYTICS} SET_LOADING`;
export const SET_YEAR = `${ANALYTICS} SET_YEAR`;

// Initial Data
const TODAY = new Date();
const INITIAL_ANALYTICS_DATA = {
  year: TODAY.getFullYear(),
  loading: true,
};


// Action Creators
export const requestYearReview = ({ year }) => ({
  type: REQUEST_YEAR_REVIEW,
  year,
});

export const setLoading = ({ loading }) => ({
  type: SET_LOADING,
  loading,
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

    default:
      return state;

  }

};

export default analyticsReducer;






