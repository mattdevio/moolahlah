
/**
 * budgetMiddleware
 * Handle all budget request modifications
 */
const budgetMiddleware = () => next => action => {
  next(action);

};

export default budgetMiddleware;