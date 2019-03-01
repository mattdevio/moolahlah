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
 * Creates a new transaction record
 */
transactionRouter.post('/create_transaction', protectedRoute(), Category.createTransactionValidation(), async (req, res, next) => {

  const { name, belongsTo, date, cost, notes } = req.body;

  // Start a transaction
  let trx;
  try {
    trx = await transaction.start(KNEX_INSTANCE);
  } catch (e) {
    return next(e);
  }

  // Get the category data need for the relationships
  let category__;
  try {
    category__ = await Category.query(trx)
      .select({
        budgetId: 'budget_id',
        categoryId: 'id',
      })
      .where('access_id', belongsTo).first();
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }
  logger.debug(JSON.stringify(category__, null ,2));

  // Build a new transaction data structure
  const newTransactionRecord = {
    'budget_id': category__.budgetId,
    'category_id': category__.categoryId,
    'name': name,
    'transaction_date': date,
    'cost': cost,
    'notes': notes,
  };

  // Add new transaction data to database
  let newRecord__;
  try {
    newRecord__ = await TransactionRecord.query(trx)
      .insertAndFetch(newTransactionRecord);
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }
  logger.debug(JSON.stringify(newRecord__, null ,2));

  // Commit the transaction
  try {
    await trx.commit();
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  // Respond with new information to client
  res.json(apiResponse({
    message: 'Transaction created',
    data: {
      belongsTo: belongsTo,
      accessId: newRecord__.accessId,
      name: newRecord__.name,
      date: newRecord__.transactionDate,
      cost: newRecord__.cost,
      notes: newRecord__.notes,
    },
  }));

});

/**
 * POST /delete_transaction
 * Deletes a transaction record
 */
transactionRouter.post('/delete_transaction', protectedRoute(), TransactionRecord.deleteTransactionValidation(), async (req, res, next) => {

  const { accessId } = req.body;

  // Delete
  let deleteTransaction__;
  try {
    deleteTransaction__ = await TransactionRecord.query()
      .delete()
      .where('access_id', accessId);
  } catch (e) {
    return next(e);
  }

  // Validate
  if (deleteTransaction__ !== 1) return res.status(400).json(apiResponse({
    status: 0,
    message: 'Failed to delete transaction',
  }));

  // Respond
  res.json(apiResponse({
    message: 'Transaction deleted',
    data: {
      accessId: accessId,
    },
  }));

});


// Export router
module.exports = transactionRouter;