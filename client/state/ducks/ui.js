/*----------  Namespace  ----------*/
export const UI = '[ui]';

/*----------  Actions  ----------*/
export const WINDOW_DIMENSIONS = `${UI} WINDOW_DIMENSIONS`;

/*----------  Default State  ----------*/
const INITIAL_UI_STATE = {
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  focusableInputs: {},
};

/*----------  Action Creators  ----------*/
export const setWindowDimensions = (windowWidth, windowHeight) => ({
  type: WINDOW_DIMENSIONS,
  windowWidth,
  windowHeight,
});

/*=================================
=            uiReducer            =
=================================*/

export default function uiReducer(state = INITIAL_UI_STATE, action) {
  switch (action.type) {

    case WINDOW_DIMENSIONS:
      return reduceWindowDimensions(state, action);

    default:
      return state;

  } // end switch
} // end function

const reduceWindowDimensions = (state, { windowWidth, windowHeight }) => ({
  ...state,
  windowWidth,
  windowHeight,
});

/*=====  End of uiReducer  ======*/



