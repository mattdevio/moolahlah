// Vendor Imports
const appRoot = require('app-root-path');
const { Router } = require('express');
const { transaction } = require('objection');

// Custom imports
const { logger } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/middleware/apiResponse`);
const protectedRoute = require(`${appRoot}/server/middleware/protectedRoute`);
const categoryGroupDefaults = require(`${appRoot}/server/bin/categoryGroupDefaults`);
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
  const startDate = `${year}-${month+1}-01`;
  logger.debug(`Attempting to start budget for ${email} '${startDate}'`);

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
      startDate: startDate,
    });
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }
  logger.debug(JSON.stringify(budget__, null, 2));

  // Insert and fetch the default categories w/ their ID
  let categories__;
  try {
    categories__ = await Promise.all(categoryGroupDefaults.map(categoryDefault => Category
      .query(trx).insertAndFetch({
        ...categoryDefault,
        budgetId: budget__.id,
      })));
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }
  logger.debug(JSON.stringify(categories__, null, 2));

  // Build 2 budget_record entries for each category
  const budgetRecordInserts = [];
  categories__.forEach(categoryRecord => {
    for(let i=0; i<2; i++) {
      budgetRecordInserts.push({
        budgetId: budget__.id,
        categoryId: categoryRecord.id,
        label: '',
        estimateDate: startDate,
        estimate: 0.00,
      });
    }
  });

  // Insert budget records in to the database
  let budgetRecords__;
  try {
    budgetRecords__ = await Promise.all(budgetRecordInserts.map(record => BudgetRecord
      .query(trx).insertAndFetch(record)));
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }
  logger.debug(JSON.stringify(budgetRecords__, null, 2));

  // Commit the transaction
  try {
    await trx.commit();
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  // Build category groups data structure
  const categoryGroups = categories__.map(categoryRecord => {    
    const lineItems = budgetRecords__
      .filter(record => record.categoryId === categoryRecord.id)
      .map(record => ({
        accessId: record.accessId,
        label: record.label,
        estimateDate: record.estimateDate,
        estimate: record.estimate,
      }));
    return {
      categoryLabel: categoryRecord.categoryLabel,
      accessId: categoryRecord.accessId,
      canEdit: categoryRecord.canEdit,
      isDebit: categoryRecord.isDebit,
      lineItems: lineItems,
    };
  });
  
  // Send budget information back to client
  res.status(201).json(apiResponse({
    message: 'Budget created',
    data: {
      budgetStartDate: budget__.startDate,
      categoryGroups: categoryGroups,
    },
  }));

});

/**
 * POST /lookup
 * Protected Route
 * Returns all budget information coresponding to month and year if exists
 */
budgetRouter.post('/lookup', protectedRoute(), Budget.lookupBudgetValidation(), async (req, res, next) => {

  const { email } = req.session.data;
  const { id, startDate } = req.budgetData; // this data gets attached to the request in Budget.lookupBudgetValidation

  logger.debug(`Lookup budget ${startDate} #${id} for ${email}.`);

  // Get categories labels
  let categories__;
  try {
    categories__ = await Category.query().where('budget_id', id);
  } catch (e) {
    return next(e);
  }

  // Get budget records
  let budgetRecords__;
  try {
    budgetRecords__ = await BudgetRecord.query().where('budget_id', id);
  } catch (e) {
    return next(e);
  }

  // Build category groups data structure
  const categoryGroups = categories__.map(categoryRecord => {    
    const lineItems = budgetRecords__
      .filter(record => record.categoryId === categoryRecord.id)
      .map(record => ({
        accessId: record.accessId,
        label: record.label,
        estimateDate: record.estimateDate,
        estimate: record.estimate,
      }));
    return {
      categoryLabel: categoryRecord.categoryLabel,
      accessId: categoryRecord.accessId,
      canEdit: categoryRecord.canEdit,
      isDebit: categoryRecord.isDebit,
      lineItems: lineItems,
    };
  });

  // Send budget information back to client
  res.status(200).json(apiResponse({
    message: 'Existing budget data retrieved',
    data: {
      budgetStartDate: startDate,
      categoryGroups: categoryGroups,
    },
  }));

});


/**
 * POST /update_record
 * Protected Route
 * Updates the budget line record with new information
 */
budgetRouter.post('/update_record', protectedRoute(), Budget.updateRecordValidation(), async (req, res, next) => {

  const { email } = req.session.data;
  const { accessId, label, estimateDate, estimate } = req.body;

  // Build the update object
  const updateObject = {};
  if (typeof label !== 'undefined') updateObject['br.label'] = label; 
  if (typeof estimateDate !== 'undefined') updateObject['br.estimateDate'] = estimateDate;
  if (typeof estimate !== 'undefined') updateObject['br.estimate'] = estimate;

  let budgetRecordUpdate__;
  try {
    budgetRecordUpdate__ = await User.query()
      .leftJoinRelation('budgetRecord', { alias: 'br' })
      .where('email', email)
      .andWhere('br.access_id', accessId)
      .update(updateObject);
  } catch (e) {
    return next(e);
  }
  logger.debug(JSON.stringify(budgetRecordUpdate__, null, 2));

  // Update query will return the number of rows affected, we are expecint that to be 1.
  if (budgetRecordUpdate__ !== 1) {
    return res.status(406).json(apiResponse({
      status: 0,
      message: 'No update'
    }));
  }

  // Fetch the updated budget
  let budgetRecord__;
  try {
    budgetRecord__ = await BudgetRecord.query()
      .select('access_id', 'label', 'estimate_date', 'estimate')
      .where('access_id', accessId).first();
  } catch (e) {
    return next(e);
  }
  logger.debug(JSON.stringify(budgetRecord__, null, 2));

  res.status(200).json(apiResponse({
    message: 'Record updated',
    data: budgetRecord__,
  }));

});


// Export router
module.exports = budgetRouter;
