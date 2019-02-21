// Vendor Imports
import { debounce } from 'debounce';

// Custom Imports
import { apiRequest, API_SUCCESS, API_ERROR } from '@/state/ducks/api';
import { showErrorMessage } from '@/state/ducks/toast';
import {
  START,
  LOOKUP,
  UPDATE_CATEGORY_GROUP_LABEL,
  UPDATE_LINEITEM,
  setLoadedData,
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

    case START:
      processStartBudget(getState(), next);
      break;
    
    case `${START} ${API_SUCCESS}`:
      processBudgetData(next, action);
      break;
    
    case `${START} ${API_ERROR}`:
      // Needs a more robust solution, for now this will work.
      next(showErrorMessage('Start Budget API Error: Unhandled Error!'));
      break;

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
        cancelable: true,
      }));
      break;

    case `${LOOKUP} ${API_SUCCESS}`:
      processBudgetData(next, action);
      break;

    case `${LOOKUP} ${API_ERROR}`:
      processLookupApiError(next, action);
      break;
    
    case UPDATE_CATEGORY_GROUP_LABEL:
      updateCategoryLabelRequest_Debounced(next, action);
      break;
    
    case `${UPDATE_CATEGORY_GROUP_LABEL} ${API_SUCCESS}`:
      processUpdateCategoryGroupLabelApiSuccess(next, action);
      break;

    case `${UPDATE_CATEGORY_GROUP_LABEL} ${API_ERROR}`:
      processUpdateCategoryGroupLabelApiError(next, action);
      break;
    
    case UPDATE_LINEITEM:
      updateLineitemRequest_Debounced(next, action);
      break;

  }

};

export default budgetMiddleware;

const processStartBudget = ({ budget }, next) => {
  const { currentYear, currentMonth } = budget;
  next(apiRequest({
    data: {
      year: currentYear,
      month: currentMonth,
    },
    method: 'POST',
    url: '/budget/start',
    feature: START,
  }));
};

const processBudgetData = (next, { payload }) => {
  const {
    budgetStartDate,
    categoryGroups,
  } = payload.data;
  const parsedStartDate = new Date(budgetStartDate);
  const currentMonth = parsedStartDate.getUTCMonth();
  const currentYear = parsedStartDate.getUTCFullYear();

  next(setLoadedData({ categoryGroups, currentMonth, currentYear }));
  next(setBudgetStatusLoaded());
}; 

const processLookupApiError = (next, { payload }) => {
  const error = payload && payload.errors && payload.errors[0];
  if (error && error.msg === 'No budget matching that query') {
    next(setBudgetStatusNotStarted());
  } else {
    next(showErrorMessage('An unknown error occured attempting to load budget'));
  }
};

/* Debounce the api request for 1 second */
const updateCategoryLabelRequest_Debounced = debounce((next, action) => {
  next(apiRequest({
    data: {
      accessId: action.accessId,
      categoryLabel: action.categoryLabel,
    },
    method: 'POST',
    url: '/budget/update_category',
    feature: UPDATE_CATEGORY_GROUP_LABEL,
  }));
}, 1000);

const processUpdateCategoryGroupLabelApiSuccess = (next, { payload }) => {
  const { status, message } = payload;
  if (status === 1 && message === 'Category label updated') return; // no-op if OK
  next(showErrorMessage(`Unexpected: ${message}`));
};

const processUpdateCategoryGroupLabelApiError = (next, { payload }) => {
  const { message, errors } = payload;
  if (errors.length > 0) {
    next(showErrorMessage(errors[0].msg));
  } else {
    next(showErrorMessage(message));
  }
};

const updateLineitemRequest_Debounced = debounce((next, action) => {
  const payload = { accessId: action.accessId };
  if (typeof action.label !== 'undefined') payload.label = action.label;
  if (typeof action.estimateDate !== 'undefined') payload.estimateDate = action.estimateDate;
  if (typeof action.estimate !== 'undefined') payload.estimate = action.estimate;
  next(apiRequest({
    data: payload,
    method: 'POST',
    url: '/budget/update_record',
    feature: UPDATE_LINEITEM,
  }));
}, 1000);