// Vendor Imports
const appRoot = require('app-root-path');
const { Router } = require('express');
const { raw } = require('objection');
const moment = require('moment');

// Custom imports
const { logger } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/middleware/apiResponse`);
const protectedRoute = require(`${appRoot}/server/middleware/protectedRoute`);
const {
  Budget,
  BudgetRecord,
  TransactionRecord,
} = require(`${appRoot}/server/db/models`);

// Setup
const analyticsRouter = Router();

// // Get a reference to the knex sql builder
// const KNEX_INSTANCE = Budget.knex();


/**
 * POST /year_review
 * Gets the data needed for the year review
 */
analyticsRouter.post('/year_review', protectedRoute(), Budget.yearReviewValidation(), async (req, res, next) => {

  const { year } = req.body;
  const { email } = req.session.data;

  // Get the budgets that match that year
  // Not sure how expensive this call is.
  let budgetsInYear__;
  try {
    budgetsInYear__ = await Budget.query()
      .select({
        budgetId: 'budget.id',
        startDate: 'budget.start_date',
      })
      .leftJoinRelation('users')
      .where(raw('SUBSTRING(budget.start_date, 1, 4)'), year.toString())
      .andWhere('users.email', email);
  } catch (e){
    return next(e);
  }
  logger.debug(JSON.stringify(budgetsInYear__, null, 2));

  // Get the category groups totals for each budget
  let categoriesPerBudget__;
  try {
    categoriesPerBudget__ = await Promise.all(budgetsInYear__.map(budget => {
      return new Promise(async (resolve, reject) => {
        let query__;
        try {
          query__ = await BudgetRecord.query()
            .select({
              isDebit: 'category.is_debit',
              total: raw('SUM(budget_record.estimate)'),
            })
            .leftJoinRelation('category')
            .where('budget_record.budget_id', budget.budgetId)
            .groupBy('category.is_debit');
        } catch (e) {
          return reject(e);
        }
        resolve({
          [budget.budgetId]: query__.reduce((acc, val) => {
            if (val.isDebit) {
              acc['debit'] = val.total;
            } else {
              acc['income'] = val.total;
            }
            return acc;
          }, {}),
        });
      });
    }));
  } catch (e) {
    return next(e);
  }

  // flatten array of category groups into one object
  const allBudgetCategoryTotals = categoriesPerBudget__.reduce((acc, val) => {
    acc = {
      ...acc,
      ...val,
    };
    return acc;
  }, {});
  logger.debug(JSON.stringify(allBudgetCategoryTotals, null, 2));

  // Get the transaction group totals for each budget
  let transactionsPerBudget__;
  try {
    transactionsPerBudget__ = await Promise.all(budgetsInYear__.map(budget => {
      return new Promise(async (resolve, reject) => {
        let query__;
        try {
          query__ = await TransactionRecord.query()
            .select({
              isDebit: 'category.is_debit',
              total:  raw('SUM(transaction_record.cost)'),
            })
            .leftJoinRelation('category')
            .where('transaction_record.budget_id', budget.budgetId)
            .groupBy('category.is_debit');
        } catch (e) {
          return reject(e);
        }
        resolve({
          [budget.budgetId]: query__.reduce((acc, val) => {
            if (val.isDebit) {
              acc['debit'] = val.total;
            } else {
              acc['income'] = val.total;
            }
            return acc;
          }, {}),
        });
      });
    }));
  } catch (e) {
    return next(e);
  }

  // flatten array of category groups into one object
  const allBudgetTransactionTotals = transactionsPerBudget__.reduce((acc, val) => {
    acc = {
      ...acc,
      ...val,
    };
    return acc;
  }, {});
  logger.debug(JSON.stringify(allBudgetTransactionTotals, null, 2));

  // Flatted category and transactions into one object
  const overview = budgetsInYear__.reduce((acc, val) => {
    acc[moment.utc(val.startDate).format('MMM')] = {
      estimate: allBudgetCategoryTotals[val.budgetId],
      actual: allBudgetTransactionTotals[val.budgetId],
    };
    return acc;
  }, { year });
  logger.debug(JSON.stringify(overview, null, 2));

  // Respond to the client
  res.json(apiResponse({
    message: 'Year review generated',
    data: overview,
  }));

});


/**
 * POST /month_review
 * Get the data for the month review
 */
analyticsRouter.post('/month_review', protectedRoute(), Budget.monthReviewValidation(), async (req, res, next) => {

  const { email } = req.session.data;
  const { year, month } = req.body;

  let budget__;
  try {
    budget__ = await Budget.query()
      .select({
        budgetId: 'budget.id',
      })
      .leftJoinRelation('users')
      .where('budget.start_date', `${year}-${month+1}-01`)
      .andWhere('users.email', email)
      .first();
  } catch (e) {
    return next(e);
  }

  let budgetRecords__;
  try {
    budgetRecords__ = await BudgetRecord.query()
      .leftJoinRelation('category')
      .select({
        category: 'category.category_label',
        id: 'category.access_id',
        total: raw('SUM(budget_record.estimate)'),
        isDebit: 'category.is_debit',
      })
      .where('budget_record.budget_id', budget__.budgetId)
      .groupBy('budget_record.category_id');
  } catch (e) {
    return next(e);
  }

  const normalBudgetRecords = budgetRecords__.reduce((acc, val) => {
    acc[val.id] = {
      ...val,
      id: undefined,
    };
    return acc;
  }, {});

  let transactionRecords__;
  try {
    transactionRecords__ = await TransactionRecord.query()
      .leftJoinRelation('category')
      .select({
        category: 'category.category_label',
        id: 'category.access_id',
        total: raw('SUM(transaction_record.cost)'),
        isDebit: 'category.is_debit',
      })
      .where('transaction_record.budget_id', budget__.budgetId)
      .groupBy('transaction_record.category_id');
  } catch (e) {
    return next(e);
  }

  const normalTransactionRecords = transactionRecords__.reduce((acc, val) => {
    acc[val.id] = {
      ...val,
      id: undefined,
    };
    return acc;
  }, {});

  const allData = {
    debit: {},
    income: {},
  };
  Object.keys(normalBudgetRecords).forEach(key => {
    const base = normalBudgetRecords[key].isDebit ? 'debit' : 'income';
    allData[base][key] = {
      label: normalBudgetRecords[key].category,
      planned: normalBudgetRecords[key].total,
      actual: normalTransactionRecords[key] ? normalTransactionRecords[key].total : '0.0000',
    };
  });
  

  res.json(apiResponse({
    message: 'Month review generated',
    data: allData,
  }));

});


// Export Routre
module.exports = analyticsRouter;
