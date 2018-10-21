/*----------  Namespace  ----------*/
export const DESIGN = '[design]';

/*----------  Actions  ----------*/
export const CURRENT_YEAR = `${DESIGN} CURRENT_YEAR`;
export const CURRENT_MONTH = `${DESIGN} CURRENT_MONTH`;

/*----------  Initial State  ----------*/
const TODAY = new Date();
const DESIGN_INITIAL_STATE = {
  currentYear: TODAY.getFullYear(),
  currentMonth: TODAY.getMonth(),
};

/*----------  Action Creators  ----------*/
export const setCurrentYear = currentYear => ({
  type: CURRENT_YEAR,
  currentYear,
});

export const setCurrentMonth = currentMonth => ({
  type: CURRENT_MONTH,
  currentMonth,
});

/*=====================================
=            designReducer            =
=====================================*/

const designReducer = (state = DESIGN_INITIAL_STATE, action) => {
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

export default designReducer;

/*=====  End of designReducer  ======*/
