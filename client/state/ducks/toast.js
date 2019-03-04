/*----------  Namespace  ----------*/
export const TOAST = '[toast]';

/*----------  Actions  ----------*/
export const ERROR_MESSAGE = `${TOAST} ERROR_MESSAGE`;
export const SUCCESS_MESSAGE = `${TOAST} SUCCESS_MESSAGE`;


/*----------  Action Creators  ----------*/
export const showErrorMessage = (errorMessage) => ({
  type: ERROR_MESSAGE,
  payload: errorMessage,
});

export const showSuccessMessage = (successMessage) => ({
  type: SUCCESS_MESSAGE,
  payload: successMessage,
});
