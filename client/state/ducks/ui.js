/*----------  Namespace  ----------*/
export const UI = '[ui]';

/*----------  Actions  ----------*/
export const WINDOW_DIMENSIONS = `${UI} WINDOW_DIMENSIONS`;
export const LOADING_MODAL = `${UI} LOADING_MODAL`;
export const READY_TO_DISPLAY = `${UI} READY_TO_DISPLAY`;

/*----------  Default State  ----------*/
const INITIAL_UI_STATE = {
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  readyToDisplay: false,
};

/*----------  Action Creators  ----------*/
export const setWindowDimensions = (windowWidth, windowHeight) => ({
  type: WINDOW_DIMENSIONS,
  windowWidth,
  windowHeight,
});

export const setDisplayOn = (readyToDisplay) => ({
  type: READY_TO_DISPLAY,
  readyToDisplay,
});

/*=================================
=            uiReducer            =
=================================*/

export default function uiReducer(state = INITIAL_UI_STATE, action) {
  switch (action.type) {

    case WINDOW_DIMENSIONS:
      return Object.assign({}, state, {
        windowWidth: action.windowWidth,
        windowHeight: action.windowHeight,
      });

    case READY_TO_DISPLAY:
      return Object.assign({}, state, {
        readyToDisplay: action.readyToDisplay,
      });

    default:
      return state;

  } // end switch
} // end function

/*=====  End of uiReducer  ======*/



