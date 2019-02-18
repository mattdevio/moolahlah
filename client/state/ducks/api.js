/*----------  Actions  ----------*/
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';


/*----------  Action Creators  ----------*/
export const apiRequest = ({ data, method, url, feature, cancelable = false }) => ({
  type: `${feature} ${API_REQUEST}`,
  payload: data,
  meta: {
    method,
    url,
    feature,
    cancelable,
  },
});

export const apiSuccess = ({ data, feature }) => ({
  type: `${feature} ${API_SUCCESS}`,
  payload: data,
  meta: {
    feature,
  },
});

export const apiError = ({ error, feature }) => ({
  type: `${feature} ${API_ERROR}`,
  payload: error,
  meta: {
    feature,
  },
});
