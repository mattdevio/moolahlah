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
} = require(`${appRoot}/server/db/models`);

// Setup
const transactionRouter = Router();

// Get a reference to the knex sql builder
const KNEX_INSTANCE = Budget.knex();


/**
 * POST /create_transaction
 * 
 */
transactionRouter.post('/create_transaction', protectedRoute(), TransactionRecord.createTransactionValidation(), (req, res, next) => {

  res.json(apiResponse({
    message: 'Nothing here yet',
  }));

});







// Export router
module.exports = transactionRouter;