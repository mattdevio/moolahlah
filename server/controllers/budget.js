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
  const categoryGroups = categories__.reduce((accumulator, value) => {    
    const lineItems = budgetRecords__
      .filter(record => record.categoryId === value.id)
      .reduce((acc, val) => {
        acc[val.accessId] = {
          label: val.label,
          estimateDate: val.estimateDate,
          estimate: val.estimate,
        };
        return acc;
      }, {});
    if (value.isDebit) {
      accumulator.debit[value.accessId] = {
        categoryLabel: value.categoryLabel,
        canEdit: value.canEdit,
        isDebit: value.isDebit,
        lineItems: lineItems,
      };
    } else {
      accumulator.income[value.accessId] = {
        categoryLabel: value.categoryLabel,
        canEdit: value.canEdit,
        isDebit: value.isDebit,
        lineItems: lineItems,
      };
    } 
    return accumulator;
  }, { debit: {}, income: {} });
  
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
  const categoryGroups = categories__.reduce((accumulator, value) => {    
    const lineItems = budgetRecords__
      .filter(record => record.categoryId === value.id)
      .reduce((acc, val) => {
        acc[val.accessId] = {
          label: val.label,
          estimateDate: val.estimateDate,
          estimate: val.estimate,
        };
        return acc;
      }, {});
    if (value.isDebit) {
      accumulator.debit[value.accessId] = {
        categoryLabel: value.categoryLabel,
        canEdit: value.canEdit,
        isDebit: value.isDebit,
        lineItems: lineItems,
      };
    } else {
      accumulator.income[value.accessId] = {
        categoryLabel: value.categoryLabel,
        canEdit: value.canEdit,
        isDebit: value.isDebit,
        lineItems: lineItems,
      };
    } 
    return accumulator;
  }, { debit: {}, income: {} });

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
budgetRouter.post('/update_record', protectedRoute(), BudgetRecord.updateRecordValidation(), async (req, res, next) => {

  const { accessId, label, estimateDate, estimate } = req.body;

  // Build the update object
  const updateObject = {};
  if (typeof label !== 'undefined') updateObject['label'] = label; 
  if (typeof estimateDate !== 'undefined') updateObject['estimate_date'] = estimateDate;
  if (typeof estimate !== 'undefined') updateObject['estimate'] = estimate;

  // Start a transaction
  let trx;
  try {
    trx = await transaction.start(KNEX_INSTANCE);
  } catch (e) {
    return next(e);
  }

  // Update the budget record
  let budgetRecordUpdate__;
  try {
    budgetRecordUpdate__ = await BudgetRecord.query(trx)
      .update(updateObject)
      .where('access_id', accessId);
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  // Make sure the record was updated
  if (budgetRecordUpdate__ !== 1) {
    await trx.rollback().catch(next); // Kill the transaction
    return res.status(400).json(apiResponse({
      message: 'Budget record not updated',
      status: 0,
    }));
  }

  // Fetch the updated budget
  let budgetRecord__;
  try {
    budgetRecord__ = await BudgetRecord.query(trx)
      .select({
        accessId: 'access_id',
        label: 'label',
        esitmateDate: 'estimate_date',
        estimate: 'estimate',
      })
      .where('access_id', accessId).first();
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  // Commit the transaction
  try {
    await trx.commit();
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  // Send response back to client
  res.status(200).json(apiResponse({
    message: 'Record updated',
    data: budgetRecord__,
  }));

});


/**
 * POST /update_category
 * Updates a category label by the accessId
 */
budgetRouter.post('/update_category', protectedRoute(), Category.updateCategoryValidation(), async (req, res, next) => {

  const { accessId, categoryLabel } = req.body;

  // Start a transaction
  let trx;
  try {
    trx = await transaction.start(KNEX_INSTANCE);
  } catch (e) {
    return next(e);
  }

  // Update the category label
  let updateCategoryLabel__;
  try {
    updateCategoryLabel__ = await Category.query(trx)
      .update({
        categoryLabel: categoryLabel,
      })
      .where('access_id', accessId);
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  // Make sure the label was updated
  if (updateCategoryLabel__ !== 1) {
    await trx.rollback().catch(next); // Kill the transaction
    return res.status(400).json(apiResponse({
      message: 'Category label was not updated',
      status: 0,
    }));
  }

  // Fetch the updated record
  let categoryLabel__;
  try {
    categoryLabel__ = await Category.query(trx)
      .select({
        accessId: 'access_id',
        categoryLabel: 'category_label',
        canEdit: 'can_edit',
        isDebit: 'is_debit',
      })
      .where('access_id', accessId).first();
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  // Commit the transaction
  try {
    await trx.commit();
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  // Send the data back as updated
  res.json(apiResponse({
    message: 'Category label updated',
    data: categoryLabel__,
  }));

});

/**
 * POST /delete_record
 * Removes a line item from a category group
 */
budgetRouter.post('/delete_record', protectedRoute(), BudgetRecord.deleteRecordValidation(), async (req, res, next) => {

  const { accessId } = req.body;

  let deleteRecord__;
  try {
    deleteRecord__ = await BudgetRecord.query()
      .delete()
      .where('access_id', accessId);
  } catch (e) {
    return next(e);
  }

  if (deleteRecord__ !== 1) return res.status(400).json(apiResponse({
    status: 0,
    message: 'Failed to delete record',
  }));

  res.json(apiResponse({
    message: 'Record deleted',
    data: {
      accessId: accessId,
    },
  }));

});

/**
 * POST /create_record
 * Creates a new line item record for a given category group accessId.
 */
budgetRouter.post('/create_record', protectedRoute(), Category.createRecordValidation(), async (req, res, next) => {

  const { accessId } = req.body;

  let categoryData__;
  try {
    categoryData__ = await Category.query()
      .select({
        budgetId: 'category.budget_id',
        categoryId: 'category.id',
        startDate: 'budget.start_date',
        accessId: 'category.access_id',
        isDebit: 'category.is_debit',
      })
      .leftJoinRelation('budget')
      .where('access_id', accessId).first();
  } catch (e) {
    next(e);
  }

  const newBudgetRecord = {
    budget_id: categoryData__.budgetId,
    category_id: categoryData__.categoryId,
    label: '',
    estimateDate: categoryData__.startDate,
    estimate: 0.00,
  };

  let newRecordInsert__;
  try {
    newRecordInsert__ = await BudgetRecord.query()
      .insertAndFetch(newBudgetRecord);
  } catch (e) {
    next(e);
  }

  if (!newRecordInsert__) res.status(400).json(apiResponse({
    message: 'Record not created',
    status: 0,
  }));

  res.json(apiResponse({
    message: 'Record created',
    data: {
      accessId: newRecordInsert__.accessId,
      label: newRecordInsert__.label,
      estimateDate: newRecordInsert__.estimateDate,
      estimate: newRecordInsert__.estimate,
      parent: categoryData__.accessId,
      isDebit: categoryData__.isDebit,
    },
  }));

});


/**
 * POST /delete_category
 * Removes a category group and all of children lineitesm by the categorys accessId
 * The children line items will be deleted from the database due to foreign relationship cascading deletion
 */
budgetRouter.post('/delete_category', protectedRoute(), Category.deleteRecordValidation(), async (req, res, next) => {

  const { accessId } = req.body;

  let deleteCategory__;
  try {
    deleteCategory__ = await Category.query()
      .delete()
      .where('access_id', accessId);
  } catch (e) {
    return next(e);
  }

  if (deleteCategory__ !== 1) return res.status(400).json(apiResponse({
    status: 0,
    message: 'Failed to delete category',
  }));

  res.json(apiResponse({
    message: 'Category deleted',
    data: {
      accessId: accessId,
    },
  }));

});


budgetRouter.post('/add_category', protectedRoute(), Budget.addCategoryValidation(), async (req, res, next) => {

  const { year, month } = req.body;
  const { email } = req.session.data;

  // Start a transaction
  let trx;
  try {
    trx = await transaction.start(KNEX_INSTANCE);
  } catch (e) {
    return next(e);
  }

  // Get the budget id
  let budgetData__;
  try {
    budgetData__ = await Budget.query(trx)
      .leftJoinRelation('users')
      .where('users.email', email)
      .andWhere('budget.start_date', `${year}-${month+1}-01`)
      .first();
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  if (!budgetData__) {
    return trx.rollback('Unable to lookup budget data')
      .then(next)
      .catch(next);
  }

  // Add a new category
  let addCategory__;
  try {
    addCategory__ = await Category.query()
      .insertAndFetch({
        'category_label': '',
        'can_edit': true,
        'is_debit': true,
        'budget_id': budgetData__.id,
      });
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  if (!addCategory__) {
    return trx.rollback('Unable to add category')
      .then(next)
      .catch(next);
  }

  // Add a line item for the category
  let addLineitem__;
  try {
    addLineitem__ = await BudgetRecord.query()
      .insertAndFetch({
        'budget_id': budgetData__.id,
        'category_id': addCategory__.id,
        'label': '',
        'estimate_date': budgetData__.startDate,
        'estimate': 0,
      });
  } catch(e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  if (!addLineitem__) {
    return trx.rollback('Unable to add lineitem')
      .then(next)
      .catch(next);
  }

  // Commit the transaction
  try {
    await trx.commit();
  } catch (e) {
    return trx.rollback(e)
      .then(next)
      .catch(next);
  }

  // Send new data back to client
  res.json(apiResponse({
    message: 'Category created',
    data: {
      'accessId': addCategory__.accessId,
      'canEdit': addCategory__.canEdit,
      'isDebit': addCategory__.isDebit,
      'categoryLabel': addCategory__.categoryLabel,
      'lineItems': {
        [addLineitem__.accessId]: {
          label: addLineitem__.label,
          estimateDate: addLineitem__.estimateDate,
          estimate: addLineitem__.estimate,
        },
      },
    },
  }));

});



// Export router
module.exports = budgetRouter;
