// Vendor Imports
const appRoot = require('app-root-path');
const { Router } = require('express');

// Custom imports
const { logger } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/middleware/apiResponse`);
const protectedRoute = require(`${appRoot}/server/middleware/protectedRoute`);
const BudgetModel = require(`${appRoot}/server/db/models/Budget`);
const UserModel = require(`${appRoot}/server/db/models/User`);
const Category = require(`${appRoot}/server/db/models/Category`);

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

  let newBudget;
  try {
    newBudget = await BudgetModel.query().insertAndFetch({
      user_uuid: UserModel.query().select('uuid').where('email', email),
      start_date: `${year}-${month+1}-01`,
    });
  } catch (e) {
    return next(e);
  }

  logger.debug(JSON.stringify(newBudget, null, 2));

  let categories;
  try {
    categories = await Category.query()
      .select({
        id: 'category.id',
        label: 'category.category_label', 
        type: 'ct.category_type'
      })
      .leftJoinRelation('categoryType', { alias: 'ct' })
      .whereIn('ct.category_type', ['Income', 'Expense']);
  } catch (e) {
    return next(e);
  }

  logger.debug(JSON.stringify(categories, null, 2));

  // let newBudgetRecords;
  // try {
  //   newBudgetRecords = await 
  // }

  res.json(apiResponse({message: 'OK'}));
});

// Export router
module.exports = budgetRouter;
