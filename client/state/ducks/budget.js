// Custom Imports
import { SIGN_OUT } from '@/state/ducks/auth';

// Namespace
export const BUDGET = '[budget]';

// Actions
export const START = `${BUDGET} START`;
export const CURRENT_YEAR = `${BUDGET} CURRENT_YEAR`;
export const CURRENT_MONTH = `${BUDGET} CURRENT_MONTH`;
export const LOOKUP = `${BUDGET} LOOKUP`;
export const STATUS = `${BUDGET} STATUS`;
export const SET_LOADED_DATA = `${BUDGET} SET_LOADED_DATA`;
export const UPDATE_CATEGORY_GROUP_LABEL = `${BUDGET} UPDATE_CATEGORY_GROUP_LABEL`;
export const UPDATE_LINEITEM = `${BUDGET} UPDATE_LINEITEM`;
export const REQUEST_DELETE_LINEITEM = `${BUDGET} REQUEST_DELETE_LINEITEM`;
export const LINEITEM_IS_BEING_DELETED = `${BUDGET} LINEITEM_IS_BEING_DELETED`;
export const DELETE_LINEITEM = `${BUDGET} DELETE_LINEITEM`;
export const REQUEST_NEW_LINEITEM = `${BUDGET} REQUEST_NEW_LINEITEM`;
export const ADD_LINEITEM = `${BUDGET} ADD_LINEITEM`;
export const REQUEST_DELETE_CATEGORY = `${BUDGET} REQUEST_DELETE_CATEGORY`;
export const CATEGORY_IS_BEING_DELETED = `${BUDGET} CATEGORY_IS_BEING_DELETED`;
export const DELETE_CATEGORY = `${BUDGET} DELETE_CATEGORY`;
export const REQUEST_NEW_CATEGORY = `${BUDGET} REQUEST_NEW_CATEGORY`;
export const NEW_CATEGORY = `${BUDGET} NEW_CATEGORY`;
export const ADD_TRANSACTION = `${BUDGET} ADD_TRANSACTION`;
export const ADD_TRANSACTION_TO_STORE = `${BUDGET} ADD_TRANSACTION_TO_STORE`;
export const DELETE_TRANSACTION = `${BUDGET} DELETE_TRANSACTION`;
export const DELETE_TRANSACTION_FROM_STORE = `${BUDGET} DELETE_TRANSACTION_FROM_STORE`;

// Enumerations
export const BudgetStatusEnum = Object.freeze({
  loading: 1,
  loaded: 2,
  notStarted: 3,
  error: 4,
});

// Initial State
const TODAY = new Date();
const BUDGET_INITIAL_STATE = {
  currentYear: TODAY.getFullYear(),
  currentMonth: TODAY.getMonth(),
  budgetStatus: BudgetStatusEnum.loading,
  categoryGroups: {},
  unassignedAccessId: '',
  transactions: [],
};

// Action Creators

export const startBudget = () => ({
  type: START,
});

export const setCurrentYear = currentYear => ({
  type: CURRENT_YEAR,
  currentYear,
});

export const setCurrentMonth = currentMonth => ({
  type: CURRENT_MONTH,
  currentMonth,
});

export const lookupBudget = ({ currentMonth, currentYear }) => ({
  type: LOOKUP,
  currentYear,
  currentMonth,
});

export const setBudgetStatusLoading = () => ({
  type: STATUS,
  budgetStatus: BudgetStatusEnum.loading,
});

export const setBudgetStatusLoaded = () => ({
  type: STATUS,
  budgetStatus: BudgetStatusEnum.loaded,
});

export const setBudgetStatusNotStarted = () => ({
  type: STATUS,
  budgetStatus: BudgetStatusEnum.notStarted,
});

export const setBudgetStatusErrored = () => ({
  type: STATUS,
  budgetStatus: BudgetStatusEnum.error,
});

export const setLoadedData = ({ categoryGroups, currentMonth, currentYear, unassignedAccessId, transactions }) => ({
  type: SET_LOADED_DATA,
  categoryGroups,
  currentMonth,
  currentYear,
  unassignedAccessId,
  transactions,
});

export const updateCategoryGroupLabel = ({ isDebit, accessId, categoryLabel }) => ({
  type: UPDATE_CATEGORY_GROUP_LABEL,
  accessId,
  categoryLabel,
  isDebit,
});

export const updateLineitem = ({ isDebit, parent, accessId, label, estimateDate, estimate }) => ({
  type: UPDATE_LINEITEM,
  accessId,
  label,
  estimateDate,
  estimate,
  parent,
  isDebit,
});

export const requestDeleteLineitem = ({ isDebit, parent, accessId }) => ({
  type: REQUEST_DELETE_LINEITEM,
  isDebit,
  parent,
  accessId,
});

export const setLineitemIsBeingDeleted = ({ isDebit, parent, accessId, isBeingDeleted }) => ({
  type: LINEITEM_IS_BEING_DELETED,
  isDebit,
  parent,
  accessId,
  isBeingDeleted,
});

export const deleteLineitem = ({ isDebit, parent, accessId }) => ({
  type: DELETE_LINEITEM,
  isDebit,
  parent,
  accessId,
});

export const requestNewLineItem = ({ accessId }) => ({
  type: REQUEST_NEW_LINEITEM,
  accessId,
});

export const addLineitem = ({ accessId, label, estimateDate, estimate, parent, isDebit }) => ({
  type: ADD_LINEITEM,
  accessId,
  label,
  estimateDate,
  estimate,
  parent,
  isDebit,
});

export const requestDeleteCategory = ({ isDebit, accessId }) => ({
  type: REQUEST_DELETE_CATEGORY,
  isDebit,
  accessId,
});

export const setCategoryIsBeingDeleted = ({ isDebit, accessId, isBeingDeleted }) => ({
  type: CATEGORY_IS_BEING_DELETED,
  isDebit,
  accessId,
  isBeingDeleted,
});

export const deleteCategory = ({ isDebit, accessId }) => ({
  type: DELETE_CATEGORY,
  isDebit,
  accessId,
});

export const requestNewCategory = () => ({
  type: REQUEST_NEW_CATEGORY,
});

export const newCategory = categoryData => ({
  type: NEW_CATEGORY,
  categoryData,
});

export const addTransaction = ({ name, belongsTo, date, cost, notes }) => ({
  type: ADD_TRANSACTION,
  name,
  belongsTo,
  date,
  cost,
  notes,
});

export const addTransactionToStore = ({ accessId, name, belongsTo, date, cost, notes }) => ({
  type: ADD_TRANSACTION_TO_STORE,
  name,
  belongsTo,
  date,
  cost,
  notes,
  accessId,
});

export const deleteTransaction = ({ accessId }) => ({
  type: DELETE_TRANSACTION,
  accessId,
});

export const deleteTransactionFromStore = ({ accessId }) => ({
  type: DELETE_TRANSACTION_FROM_STORE,
  accessId,
});

/**
 * budgetReducer
 * Manage the state of the budget
 */
const budgetReducer = (state = BUDGET_INITIAL_STATE, action) => {
  switch (action.type) {

    case CURRENT_YEAR:
      return Object.assign({}, state, {
        currentYear: action.currentYear,
      });

    case CURRENT_MONTH:
      return Object.assign({}, state, {
        currentMonth: action.currentMonth,
      });
    
    case STATUS:
      return Object.assign({}, state, {
        budgetStatus: action.budgetStatus,
      });
    
    case SET_LOADED_DATA:
      return Object.assign({}, state, {
        categoryGroups: action.categoryGroups,
        currentMonth: action.currentMonth,
        currentYear: action.currentYear,
        unassignedAccessId: action.unassignedAccessId,
        transactions: action.transactions,
      });
    
    case UPDATE_CATEGORY_GROUP_LABEL:
      return reduceCategoryGroupLabel(state, action);
    
    case UPDATE_LINEITEM:
      return reduceUpdateLineitem(state, action);
    
    case LINEITEM_IS_BEING_DELETED:
      return reduceIsBeingDeletedAttribute(state, action);

    case DELETE_LINEITEM:
      return reduceDeleteLineitem(state, action);
    
    case ADD_LINEITEM:
      return reduceAddLineitem(state, action);

    case CATEGORY_IS_BEING_DELETED:
      return reduceCategoryIsBeingDeleted(state, action);

    case DELETE_CATEGORY:
      return reduceDeleteCategory(state, action);

    case NEW_CATEGORY:
      return reduceNewCategory(state, action);

    case ADD_TRANSACTION_TO_STORE:
      return reduceAddTransactionToStore(state, action);
    
    case DELETE_TRANSACTION_FROM_STORE:
      return reduceDeleteTransactionFromStore(state, action);

    case SIGN_OUT:
      return BUDGET_INITIAL_STATE;

    default:
      return state;

  } // end switch
};

export default budgetReducer;

const reduceCategoryGroupLabel = (state, { isDebit, categoryLabel, accessId }) => {
  const groupKey = isDebit ? 'debit' : 'income';
  return Object.assign({}, state, {
    categoryGroups: {
      ...state['categoryGroups'],
      [groupKey]: {
        ...state['categoryGroups'][groupKey],
        [accessId]: {
          ...state['categoryGroups'][groupKey][accessId],
          categoryLabel: categoryLabel,
        },
      },
    },
  });
};

const reduceUpdateLineitem = (state, { isDebit, parent, accessId, label, estimateDate, estimate }) => {
  const groupKey = isDebit ? 'debit' : 'income';
  return Object.assign({}, state, {
    categoryGroups: {
      ...state['categoryGroups'],
      [groupKey]: {
        ...state['categoryGroups'][groupKey],
        [parent]: {
          ...state['categoryGroups'][groupKey][parent],
          lineItems: {
            ...state['categoryGroups'][groupKey][parent]['lineItems'],
            [accessId]: {
              ...state['categoryGroups'][groupKey][parent]['lineItems'][accessId],
              label: typeof label === 'undefined' ?
                state['categoryGroups'][groupKey][parent]['lineItems'][accessId].label :
                label,
              estimateDate: typeof estimateDate === 'undefined' ?
                state['categoryGroups'][groupKey][parent]['lineItems'][accessId].estimateDate :
                estimateDate,
              estimate: typeof estimate === 'undefined' ?
                state['categoryGroups'][groupKey][parent]['lineItems'][accessId].estimate :
                estimate,
            },
          },
        },
      },
    },
  });
};

const reduceIsBeingDeletedAttribute = (state, { isDebit, parent, accessId, isBeingDeleted }) => {
  const groupKey = isDebit ? 'debit' : 'income';
  return Object.assign({}, state, {
    categoryGroups: {
      ...state['categoryGroups'],
      [groupKey]: {
        ...state['categoryGroups'][groupKey],
        [parent]: {
          ...state['categoryGroups'][groupKey][parent],
          lineItems: {
            ...state['categoryGroups'][groupKey][parent]['lineItems'],
            [accessId]: {
              ...state['categoryGroups'][groupKey][parent]['lineItems'][accessId],
              isBeingDeleted: isBeingDeleted,
            },
          },
        },
      },
    },
  });
};

const reduceDeleteLineitem = (state, { isDebit, parent, accessId }) => {
  const groupKey = isDebit ? 'debit' : 'income';
  return Object.assign({}, state, {
    categoryGroups: {
      ...state['categoryGroups'],
      [groupKey]: {
        ...state['categoryGroups'][groupKey],
        [parent]: {
          ...state['categoryGroups'][groupKey][parent],
          lineItems: {
            ...state['categoryGroups'][groupKey][parent]['lineItems'],
            [accessId]: undefined,
          },
        },
      },
    },
  });
};

const reduceAddLineitem = (state, { accessId, label, estimateDate, estimate, parent, isDebit }) => {
  const groupKey = isDebit ? 'debit' : 'income';
  return Object.assign({}, state, {
    categoryGroups: {
      ...state['categoryGroups'],
      [groupKey]: {
        ...state['categoryGroups'][groupKey],
        [parent]: {
          ...state['categoryGroups'][groupKey][parent],
          lineItems: {
            ...state['categoryGroups'][groupKey][parent]['lineItems'],
            [accessId]: {
              label,
              estimateDate,
              estimate,
            },
          },
        },
      },
    },
  });
};

const reduceCategoryIsBeingDeleted = (state, { accessId, isDebit, isBeingDeleted }) => {
  const groupKey = isDebit ? 'debit' : 'income';
  return Object.assign({}, state, {
    categoryGroups: {
      ...state['categoryGroups'],
      [groupKey]: {
        ...state['categoryGroups'][groupKey],
        [accessId]: {
          ...state['categoryGroups'][groupKey][accessId],
          isBeingDeleted: isBeingDeleted,
        }
      },
    },
  });
};

const reduceDeleteCategory = (state, { accessId, isDebit }) => {
  const groupKey = isDebit ? 'debit' : 'income';
  return Object.assign({}, state, {
    categoryGroups: {
      ...state['categoryGroups'],
      [groupKey]: {
        ...state['categoryGroups'][groupKey],
        [accessId]: undefined,
      },
    },
  });
};

const reduceNewCategory = (state, { categoryData }) => {
  const groupKey = categoryData.isDebit ? 'debit' : 'income';
  Object.keys(categoryData.lineItems).forEach(key => {
    categoryData.lineItems[key].isBeingDeleted = false;
  });
  return Object.assign({}, state, {
    categoryGroups: {
      ...state['categoryGroups'],
      [groupKey]: {
        ...state['categoryGroups'][groupKey],
        [categoryData.accessId]: {
          isDebit: categoryData.isDebit,
          canEdit: categoryData.canEdit,
          categoryLabel: categoryData.categoryLabel,
          isBeingDeleted: false,
          lineItems: categoryData.lineItems,
        },
      },
    },
  });
};

const reduceAddTransactionToStore = (state, { accessId, belongsTo, name, date, cost, notes }) => {
  return Object.assign({}, state, {
    transactions: [
      ...state.transactions,
      {
        accessId,
        belongsTo,
        name,
        date,
        cost,
        notes,
      },
    ],
  });
};

const reduceDeleteTransactionFromStore = (state, { accessId }) => {
  return Object.assign({}, state, {
    transactions: [
      ...state.transactions.filter(transaction => transaction.accessId !== accessId),
    ],
  });
};