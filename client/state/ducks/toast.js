/*----------  Namespace  ----------*/
export const TOAST = '[toast]';

/*----------  Actions  ----------*/
export const ERROR_MESSAGE = `${TOAST} ERROR_MESSAGE`;


/*----------  Action Creators  ----------*/
export const showErrorMessage = (errorMessage) => ({
  type: ERROR_MESSAGE,
  payload: errorMessage,
});
