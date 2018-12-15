// Vendor Imports
const appRoot = require('app-root-path');
const { Router } = require('express');

// Custom imports
const { logger } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/middleware/apiResponse`);
const protectedRoute = require(`${appRoot}/server/middleware/protectedRoute`);
const BudgetModel = require(`${appRoot}/server/db/models/Budget`);
const UserModel = require(`${appRoot}/server/db/models/User`);

// Setup
const budgetRouter = Router();

/**
 * POST /start
 * Protected Route
 * Starts a new budget
 */
budgetRouter.post('/start', protectedRoute(), BudgetModel.startBudgetValidation(), async function(req, res, next) {
  
  const { email } = req.session.data;
  const { year, month } = req.body;
  logger.debug(`Starting budget for ${email} '${year}-${month+1}-01'`);

  let result;
  try {
    result = await BudgetModel.query().insert({
      user_uuid: UserModel.query().select('uuid').where('email', email),
      start_date: `${year}-${month+1}-01`,
    });
  } catch (e) {
    return next(e);
  }

  logger.debug(result);

  res.json(apiResponse({message: 'not implemented'}));
});

// Export router
module.exports = budgetRouter;
