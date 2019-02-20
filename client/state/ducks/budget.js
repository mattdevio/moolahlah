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

export const setLoadedData = ({ categoryGroups, currentMonth, currentYear }) => ({
  type: SET_LOADED_DATA,
  categoryGroups,
  currentMonth,
  currentYear,
});

export const updateCategoryGroupLabel = ({ accessId, categoryLabel }) => ({
  type: UPDATE_CATEGORY_GROUP_LABEL,
  accessId,
  categoryLabel,
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
      });

    default:
      return state;

  } // end switch
};

export default budgetReducer;
