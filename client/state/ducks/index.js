/*----------  Vendor Imports  ----------*/
import { combineReducers } from 'redux';

/*----------  Custom Imports  ----------*/
import uiReducer from './ui';
import authReducer from './auth';
import designReducer from './design';

/*----------  Build Reducer  ----------*/
const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  design: designReducer,
});

// Export
export default rootReducer;
