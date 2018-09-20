/*----------  Vendor Imports  ----------*/
import { combineReducers } from 'redux';

/*----------  Custom Imports  ----------*/
import uiReducer from './ui';

/*----------  Build Reducer  ----------*/
const rootReducer = combineReducers({
  ui: uiReducer,
});

// Export
export default rootReducer;
