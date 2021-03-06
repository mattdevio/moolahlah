/*----------  Vendor Imports  ----------*/
import { createStore, applyMiddleware, compose } from 'redux';

/*----------  Custom Imports  ----------*/
import rootReducer from '@/state/ducks';
import uiMiddleware from '@/state/middleware/feature/ui';
import authMiddleware from '@/state/middleware/feature/auth';
import budgetMiddleware from '@/state/middleware/feature/budget';
import analyticsMiddleware from '@/state/middleware/feature/analytics';
import apiMiddleware from '@/state/middleware/core/api';
import toastMiddleware from '@/state/middleware/core/toast';

/*----------  Setup  ----------*/
// Get the DevTools : https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*----------  Define & Order Middleware  ----------*/
const featureMiddleware = [
  uiMiddleware,
  authMiddleware,
  budgetMiddleware,
  analyticsMiddleware,
];
const coreMiddleware = [
  apiMiddleware,
  toastMiddleware,
];

/*----------  Build Enhancer  ----------*/
const enhancer = composeEnhancers(
  applyMiddleware(
    ...featureMiddleware,
    ...coreMiddleware,
  ),
);

/*----------  Create Store  ----------*/
const store = createStore(
  rootReducer,                   // The Reducer
  {},                            // Starting State
  enhancer,                      // The Enhancer
);

// Export
export default store;
