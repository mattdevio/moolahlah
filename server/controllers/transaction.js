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
  TransactionRecord,
  Category,
} = require(`${appRoot}/server/db/models`);

// Setup
const transactionRouter = Router();

// Get a reference to the knex sql builder
const KNEX_INSTANCE = Budget.knex();


/**
 * POST /create_transaction
 * 
 */
transactionRouter.post('/create_transaction', protectedRoute(), Category.createTransactionValidation(), async (req, res, next) => {

  const { name, belongsTo, date, cost, notes } = req.body;

  let budgetRecord__;
  try {
    budgetRecord__ = await Category.query()
      .leftJoinRelation('budget')
      .where('access_id', belongsTo).first();
  } catch (e) {
    return next(e);
  }

  const newTransactionRecord = {
    'budget_id': budgetRecord__.id,
    'name': name,
    'belongs_to': Buffer.from(belongsTo),
    'transaction_date': date,
    'cost': cost,
    'notes': notes,
  };

  let newRecord__;
  try {
    newRecord__ = await TransactionRecord.query()
      .insertAndFetch(newTransactionRecord);
  } catch (e) {
    return next(e);
  }

  console.dir(newRecord__);

  res.json(apiResponse({
    message: 'Nothing here yet',
  }));

});







// Export router
module.exports = transactionRouter;