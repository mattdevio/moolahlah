/*----------  Vendor Imports  ----------*/
import { combineReducers } from 'redux';

/*----------  Custom Imports  ----------*/
import uiReducer from './ui';
import authReducer from './auth';
import budgetReducer from './budget';
import analyticsReducer from './analytics';

/*----------  Build Reducer  ----------*/
const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  budget: budgetReducer,
  analytics: analyticsReducer,
});

// Export
export default rootReducer;
