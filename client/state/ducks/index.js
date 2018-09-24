/*----------  Vendor Imports  ----------*/
import { combineReducers } from 'redux';

/*----------  Custom Imports  ----------*/
import uiReducer from './ui';
import authReducer from './auth';

/*----------  Build Reducer  ----------*/
const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
});

// Export
export default rootReducer;
