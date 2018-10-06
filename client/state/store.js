/*----------  Vendor Imports  ----------*/
import { createStore, applyMiddleware, compose } from 'redux';

/*----------  Custom Imports  ----------*/
import rootReducer from '@/state/ducks';
import uiMiddleware from '@/state/middleware/feature/ui';
import apiMiddleware from '@/state/middleware/core/api';

/*----------  Setup  ----------*/
// Get the DevTools : https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*----------  Define & Order Middleware  ----------*/
const featureMiddleware = [
  uiMiddleware,
];
const coreMiddleware = [
  apiMiddleware,
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
