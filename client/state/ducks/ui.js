/*----------  Namespace  ----------*/
export const UI = '[ui]';

/*----------  Actions  ----------*/
export const READY_TO_DISPLAY = `${UI} READY_TO_DISPLAY`;

/*----------  Default State  ----------*/
const INITIAL_UI_STATE = {
  readyToDisplay: false,
};

/*----------  Action Creators  ----------*/
export const setDisplayOn = (readyToDisplay) => ({
  type: READY_TO_DISPLAY,
  readyToDisplay,
});


/*=================================
=            uiReducer            =
=================================*/

export default function uiReducer(state = INITIAL_UI_STATE, action) {
  switch (action.type) {

    case READY_TO_DISPLAY:
      return Object.assign({}, state, {
        readyToDisplay: action.readyToDisplay,
      });

    default:
      return state;

  } // end switch
} // end function

/*=====  End of uiReducer  ======*/



