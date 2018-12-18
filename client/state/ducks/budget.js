// Namespace
export const BUDGET = '[budget]';

// Actions
export const CURRENT_YEAR = `${BUDGET} CURRENT_YEAR`;
export const CURRENT_MONTH = `${BUDGET} CURRENT_MONTH`;
export const LOOKUP = `${BUDGET} LOOKUP`;

// Initial State
const TODAY = new Date();
const BUDGET_INITIAL_STATE = {
  currentYear: TODAY.getFullYear(),
  currentMonth: TODAY.getMonth(),
};

// Action Creators
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

    default:
      return state;

  } // end switch
};

export default budgetReducer;
