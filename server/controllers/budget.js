// Vendor Imports
const appRoot = require('app-root-path');
const { Router } = require('express');
const { transaction } = require('objection');

// Custom imports
const { logger } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/middleware/apiResponse`);
const protectedRoute = require(`${appRoot}/server/middleware/protectedRoute`);
const {
  Budget,
  User,
  Category,
  BudgetRecord
} = require(`${appRoot}/server/db/models`);

// Setup
const budgetRouter = Router();

// Get a reference to the knex sql builder
const KNEX_INSTANCE = Budget.knex();

/**
 * POST /start
 * Protected Route
 * Starts a new budget
 */
budgetRouter.post('/start', protectedRoute(), Budget.startBudgetValidation(), async function(req, res, next) {
  
  const { email } = req.session.data;
  const { year, month } = req.body;
  logger.debug(`Starting budget for ${email} '${year}-${month+1}-01'`);

  // Start a transaction
  let trx;
  try {
    trx = await transaction.start(KNEX_INSTANCE);
  } catch (e) {
    return next(e);
  }

  // Add a new budget record to the database
  let budget__;
  try {
    budget__ = await Budget.query(trx).insertAndFetch({
      userUuid: User.query().select('uuid').where('email', email),
      startDate: `${year}-${month+1}-01`,
    });
  } catch (e) {
    await trx.rollback();
    return next(e);
  }
  logger.debug(JSON.stringify(budget__, null, 2));

  // Retrieve the default categories for the database
  let categories__;
  try {
    categories__ = await Category.query(trx)
      .select({
        id: 'category.id',
        label: 'category.category_label', 
        type: 'ct.category_type'
      })
      .leftJoinRelation('categoryType', { alias: 'ct' })
      .whereIn('ct.category_type', ['Income', 'Expense']);
  } catch (e) {
    await trx.rollback();
    return next(e);
  }
  logger.debug(JSON.stringify(categories__, null, 2));

  // Build deefault budget_record entries for a budget
  const budgetRecordInserts = [];
  categories__.forEach(category => {
    if (category.type === 'Income') {
      for(let i=0; i<2; i++) {
        budgetRecordInserts.push({
          budgetId: budget__.id,
          categoryId: category.id,
          estimateDate: budget__.startDate,
        });
      }
    } else {
      for(let i=0; i<3; i++) {
        budgetRecordInserts.push({
          budgetId: budget__.id,
          categoryId: category.id,
          estimateDate: budget__.startDate,
        });
      }
    }
  });

  // Insert budget records in to the database
  try {
    await Promise.all(budgetRecordInserts.map(record => BudgetRecord
      .query(trx).insert(record)));
  } catch (e) {
    trx.rollback();
    return next(e);
  }

  // Commit the transaction
  try {
    await trx.commit();
  } catch (e) {
    return next(e);
  }

  // Fetch Income Categories
  let incomeCategories__;
  try {
    incomeCategories__ = await Category.query()
      .select({
        label: 'category.category_label',
      })
      .rightJoinRelation('categoryType', { alias: 'ct' })
      .where('ct.category_type', 'Income')
      .then(results => results.map(result => result.label));
  } catch (e) {
    return next(e);
  }
  logger.debug(JSON.stringify(incomeCategories__, null, 2));

  // Fetch Expense Categories
  let expenseCategories__;
  try {
    expenseCategories__ = await Category.query()
      .select({
        label: 'category.category_label',
      })
      .rightJoinRelation('categoryType', { alias: 'ct' })
      .where('ct.category_type', 'Expense')
      .then(results => results.map(result => result.label))
  } catch (e) {
    return next(e);
  }
  logger.debug(JSON.stringify(expenseCategories__, null, 2));

  // Fetch Budget Records
  let budgetRecords__;
  try {
    budgetRecords__ = await BudgetRecord.query()
      .select({
        accessId: 'budget_record.access_id',
        category: 'c.category_label',
        label: 'budget_record.label',
        estimateDate: 'budget_record.estimate_date',
        estimate: 'budget_record.estimate',
      })
      .leftJoinRelation('category', { alias: 'c' })
      .where('budget_record.budget_id', budget__.id);
  } catch (e) {
    return next(e);
  }
  logger.debug(JSON.stringify(budgetRecords__, null, 2));
  

  res.status(200).json(apiResponse({
    message: 'Budget created',
    data: {
      budgetStartDate: budget__.startDate,
      incomeCategories: incomeCategories__,
      expenseCategories: expenseCategories__,
      budgetRecords: budgetRecords__,
    },
  }));

});



// Export router
module.exports = budgetRouter;
