// Namespace
export const BUDGET = '[budget]';

// Actions
export const START = `${BUDGET} START`;
export const CURRENT_YEAR = `${BUDGET} CURRENT_YEAR`;
export const CURRENT_MONTH = `${BUDGET} CURRENT_MONTH`;
export const LOOKUP = `${BUDGET} LOOKUP`;
export const STATUS = `${BUDGET} STATUS`;
export const SET_DATA = `${BUDGET} SET_DATA`;
export const DELETE_LINE_ITEM = `${BUDGET} DELETE_LINE_ITEM`;
export const LINE_ITEM_LABEL = `${BUDGET} LINE_ITEM_LABEL`;
export const LINE_ITEM_DATE = `${BUDGET} LINE_ITEM_DATE`;
export const LINE_ITEM_PLANNED = `${BUDGET} LINE_ITEM_PLANNED`;

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
  incomeCategories: [],
  expenseCategories: [],
  budgetRecords: [],
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

export const setBudgetData = ({ incomeCategories, expenseCategories, budgetRecords }) => ({
  type: SET_DATA,
  incomeCategories,
  expenseCategories,
  budgetRecords,
});

export const deleteLineItem = ({ identity }) => ({
  type: DELETE_LINE_ITEM,
  identity,
});

export const lineItemLabel = ({ identity, label }) => ({
  type: LINE_ITEM_LABEL,
  identity,
  label, 
});

export const lineItemDate = ({ identity, date }) => ({
  type: LINE_ITEM_DATE,
  identity,
  date,
});

export const lineItemPlanned = ({ identity, planned }) => ({
  type: LINE_ITEM_PLANNED,
  identity,
  planned,
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
    
    case SET_DATA:
      return Object.assign({}, state, {
        incomeCategories: action.incomeCategories,
        expenseCategories: action.expenseCategories,
        budgetRecords: action.budgetRecords,
      });

    default:
      return state;

  } // end switch
};

export default budgetReducer;
