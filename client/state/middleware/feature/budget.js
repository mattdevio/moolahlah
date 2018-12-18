// Custom Imports
import { apiRequest, API_SUCCESS, API_ERROR } from '@/state/ducks/api';
import { showErrorMessage } from '@/state/ducks/toast';
import {
  LOOKUP,
  setBudgetData,
  setBudgetStatusLoading,
  setBudgetStatusLoaded,
  setBudgetStatusNotStarted,
} from '@/state/ducks/budget';

/**
 * budgetMiddleware
 * Handle all budget request modifications
 */
const budgetMiddleware = ({ getState }) => next => action => {
  next(action);

  switch (action.type) {

    case LOOKUP:
      next(setBudgetStatusLoading());
      next(apiRequest({
        data: {
          year: action.currentYear,
          month: action.currentMonth,
        },
        method: 'POST',
        url: '/budget/lookup',
        feature: LOOKUP,
      }));
      break;

    case `${LOOKUP} ${API_SUCCESS}`:
      processLookupApiSuccess(getState(), next, action);
      break;

    case `${LOOKUP} ${API_ERROR}`:
      processLookupApiError(next, action);
      break;

  }

};

export default budgetMiddleware;


const processLookupApiSuccess = ({ budget }, next, { payload }) => {
  const {
    budgetStartDate,
    incomeCategories,
    expenseCategories,
    budgetRecords,
  } = payload.data;
  const parsedStartDate = new Date(budgetStartDate);

  // Ignore responses that dont match the currently selected year and month
  if (parsedStartDate.getUTCFullYear() === budget.currentYear && parsedStartDate.getUTCMonth() === budget.currentMonth) {
    next(setBudgetData({ incomeCategories, expenseCategories, budgetRecords }));
    next(setBudgetStatusLoaded());
  }

}; 

const processLookupApiError = (next, { payload }) => {
  const error = payload && payload.errors && payload.errors[0];
  if (error && error.msg === 'No budget matching that query') {
    next(showErrorMessage(error.msg));
    next(setBudgetStatusNotStarted());
  } else {
    next(showErrorMessage('An unknown error occured attempting to load budget'));
  }
};
