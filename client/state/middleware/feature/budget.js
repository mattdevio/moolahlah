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
  REQUEST_DELETE_LINEITEM,
  REQUEST_NEW_LINEITEM,
  REQUEST_DELETE_CATEGORY,
  REQUEST_NEW_CATEGORY,
  setLoadedData,
  setBudgetStatusLoading,
  setBudgetStatusLoaded,
  setBudgetStatusNotStarted,
  setLineitemIsBeingDeleted,
  deleteLineitem,
  addLineitem,
  setCategoryIsBeingDeleted,
  deleteCategory,
  newCategory,
  CURRENT_YEAR,
  CURRENT_MONTH,
  lookupBudget,
} from '@/state/ducks/budget';

/**
 * budgetMiddleware
 * Handle all budget request modifications
 */
const budgetMiddleware = ({ getState, dispatch }) => next => action => {
  next(action);

  switch (action.type) {

    case CURRENT_YEAR:
    case CURRENT_MONTH:
      dispatchLookupBudget(getState(), dispatch);
      break;

    case START:
      next(setBudgetStatusLoading());
      processStartBudget(getState(), next);
      break;
    
    case `${START} ${API_SUCCESS}`:
      processBudgetData(next, action);
      break;
    
    case `${START} ${API_ERROR}`:
      // Needs a more robust solution, for now this will work.
      next(setBudgetStatusNotStarted());
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
    
    case `${UPDATE_LINEITEM} ${API_SUCCESS}`:
      processUpdateLineitemApiSuccess(next, action);
      break;
    
    case `${UPDATE_LINEITEM} ${API_ERROR}`:
      processUpdateLineitemApiError(next, action);
      break;
    
    case REQUEST_DELETE_LINEITEM:
      next(setLineitemIsBeingDeleted({
        isDebit: action.isDebit,
        parent: action.parent,
        accessId: action.accessId,
        isBeingDeleted: true,
      }));
      next(apiRequest({
        data: {
          accessId: action.accessId,
        },
        method: 'POST',
        url: '/budget/delete_record',
        feature: REQUEST_DELETE_LINEITEM,
        cacheAction: action,
      }));
      break;
    
    case `${REQUEST_DELETE_LINEITEM} ${API_SUCCESS}`:
      processRequestDeleteItemApiSuccess(next, action);
      break;

    case `${REQUEST_DELETE_LINEITEM} ${API_ERROR}`:
      processRequestDeleteItemApiError(next, action);
      break;
    
    case `${REQUEST_NEW_LINEITEM}`:
      next(apiRequest({
        data: {
          accessId: action.accessId,
        },
        method: 'POST',
        url: '/budget/create_record',
        feature: REQUEST_NEW_LINEITEM,
      }));
      break;
    
    case `${REQUEST_NEW_LINEITEM} ${API_SUCCESS}`:
      processNewLineItemApiSuccess(next, action);
      break;

    case `${REQUEST_NEW_LINEITEM} ${API_ERROR}`:
      processNewLineItemApiError(next, action);
      break;
    
    case REQUEST_DELETE_CATEGORY:
      next(setCategoryIsBeingDeleted({
        accessId: action.accessId,
        isDebit: action.isDebit,
        isBeingDeleted: true,
      }));
      next(apiRequest({
        data: {
          accessId: action.accessId,
        },
        method: 'POST',
        url: '/budget/delete_category',
        feature: REQUEST_DELETE_CATEGORY,
        cacheAction: action,
      }));
      break;
    
    case `${REQUEST_DELETE_CATEGORY} ${API_SUCCESS}`:
      processRequestDeleteCategoryApiSuccess(next, action);
      break;

    case `${REQUEST_DELETE_CATEGORY} ${API_ERROR}`:
      next(setCategoryIsBeingDeleted({
        accessId: action.accessId,
        isDebit: action.isDebit,
        isBeingDeleted: true,
      }));
      processRequestDeleteCategoryApiError(next, action);
      break;
    
    case REQUEST_NEW_CATEGORY:
      processRequestNewCategory(getState(), next);
      break;

    case `${REQUEST_NEW_CATEGORY} ${API_SUCCESS}`:
      processRequestNewCategoryApiSuccess(next, action);
      break;

    case `${REQUEST_NEW_CATEGORY} ${API_ERROR}`:
      processRequestNewCategoryApiError(next, action);
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
    unassignedAccessId,
  } = payload.data;
  const parsedStartDate = new Date(budgetStartDate);
  const currentMonth = parsedStartDate.getUTCMonth();
  const currentYear = parsedStartDate.getUTCFullYear();
  // Add extra option to line item so I can tell when its being deleted
  Object.keys(categoryGroups).forEach(catKeys => {
    Object.keys(categoryGroups[catKeys]).forEach(cats => {
      categoryGroups[catKeys][cats].isBeingDeleted = false;
      Object.keys(categoryGroups[catKeys][cats].lineItems).forEach(li => {
        categoryGroups[catKeys][cats].lineItems[li].isBeingDeleted = false;
      });
    });
  });

  next(setLoadedData({ categoryGroups, currentMonth, currentYear, unassignedAccessId }));
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

const processUpdateLineitemApiSuccess = (next, { payload }) => {
  const { status, message } = payload;
  if (status === 1 && message === 'Record updated') return; // no-op if OK
  next(showErrorMessage(`Unexpected: ${message}`));
};

const processUpdateLineitemApiError = (next, { payload }) => {
  const { message, errors } = payload;
  if (errors.length > 0) {
    next(showErrorMessage(errors[0].msg));
  } else {
    next(showErrorMessage(message));
  }
};

const processRequestDeleteItemApiSuccess = (next, { meta, payload }) => {
  const { status, message } = payload;
  const { isDebit, parent, accessId } = meta.cacheAction;
  if (status === 1 && message === 'Record deleted') {
    next(deleteLineitem({
      isDebit,
      parent,
      accessId,
    }));
  } else {
    next(deleteLineitem({
      isDebit,
      parent,
      accessId,
    }));
    next(showErrorMessage(`Unexpected: ${message}`));
  }
};

const processRequestDeleteItemApiError = (next, { meta, payload }) => {
  const { message, errors } = payload;
  const { isDebit, parent, accessId } = meta.cacheAction;
  next(setLineitemIsBeingDeleted({
    isDebit,
    parent,
    accessId,
    isBeingDeleted: false,
  }));
  if (errors.length > 0) {
    next(showErrorMessage(errors[0].msg));
  } else {
    next(showErrorMessage(message));
  }
};

const processNewLineItemApiSuccess = (next, { payload }) => {
  const { message, status, data } = payload;
  const { accessId, label, estimateDate, estimate, parent, isDebit } = data;
  if (status === 1 && message === 'Record created') {
    next(addLineitem({
      accessId,
      label,
      estimateDate,
      estimate,
      parent,
      isDebit,
    }));
  } else {
    next(addLineitem({
      accessId,
      label,
      estimateDate,
      estimate,
      parent,
      isDebit,
    }));
    next(showErrorMessage(`Unexpected: ${message}`));
  }
};

const processNewLineItemApiError = (next, { payload }) => {
  const { errors, message } = payload;
  if (errors.length > 0) {
    next(showErrorMessage(errors[0].msg));
  } else {
    next(showErrorMessage(message));
  }
};


const processRequestDeleteCategoryApiSuccess = (next, { meta, payload }) => {
  const { status, message } = payload;
  const { isDebit, accessId } = meta.cacheAction;
  if (status === 1 && message === 'Category deleted') {
    next(deleteCategory({
      accessId,
      isDebit,
    }));
  } else {
    next(deleteCategory({
      accessId,
      isDebit,
    }));
    next(showErrorMessage(`Unexpected: ${message}`));
  }
};

const processRequestDeleteCategoryApiError = (next, { payload }) => {
  const { errors, message } = payload;
  if (errors.length > 0) {
    next(showErrorMessage(errors[0].msg));
  } else {
    next(showErrorMessage(message));
  }
};

const processRequestNewCategory = ({ budget }, next) => {
  const { currentYear, currentMonth } = budget;
  next(apiRequest({
    data: {
      year: currentYear,
      month: currentMonth,
    },
    method: 'POST',
    url: '/budget/add_category',
    feature: REQUEST_NEW_CATEGORY,
  }));
};

const processRequestNewCategoryApiSuccess = (next, { payload }) => {
  const { status, message } = payload;
  if (status === 1 && message === 'Category created') {
    next(newCategory(payload.data));
  } else {
    next(newCategory(payload.data));
    next(showErrorMessage(`Unexpected: ${message}`));
  }
};

const processRequestNewCategoryApiError = (next, { payload }) => {
  const { errors, message } = payload;
  if (errors.length > 0) {
    next(showErrorMessage(errors[0].msg));
  } else {
    next(showErrorMessage(message));
  }
};

const dispatchLookupBudget = ({ budget }, dispatch) => {
  dispatch(lookupBudget({
    currentYear: budget.currentYear,
    currentMonth: budget.currentMonth,
  }));
};