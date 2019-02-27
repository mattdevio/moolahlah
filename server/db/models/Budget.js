// Vendor imports
const appRoot = require('app-root-path');
const { Model } = require('objection');
const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Custom Imports
const BaseModel = require(`${appRoot}/server/db/models/BaseModel`);
const User = require(`${appRoot}/server/db/models/User`);
const handleValidationErrors = require(`${appRoot}/server/middleware/handleValidationErrors`);

/**
 * Budget Model
 * Defines the Budget Model in the database
 */
class Budget extends BaseModel {

  static get tableName() {
    return 'budget';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    const User = require(`${appRoot}/server/db/models/User`);
    const Calendar = require(`${appRoot}/server/db/models/Calendar`);
    return {

      users: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'budget.user_uuid',
          to: 'users.uuid'
        },
      },

      calendar: {
        relation: Model.BelongsToOneRelation,
        modelClass: Calendar,
        join: {
          from: 'budget.start_date',
          to: 'calendar.db_date',
        },
      },

    };
  }

  static startBudgetValidation() {
    return [

      sanitizeBody(['year', 'month'])
        .toInt(),

      body(['year', 'month'])
        .not().isEmpty().withMessage('Field Required'),

      body('year')
        .isInt({ min: 2012, max: 2026 }).withMessage('Must be an "int" between 2012 and 2026 inclusive'),
      
      body('month')
        .isInt({ min: 0, max: 11 }).withMessage('Must be an "int" between 0 and 11 inclusive'),

      body()
        .custom(({ year, month }, { req }) => new Promise(async function(resolve, reject) {
          const { email } = req.session.data;
          const result = await Budget.query().select().where({
            user_uuid: User.query().select('uuid').where('email', email),
            start_date: `${year}-${month+1}-01`,
          });
          (result.length === 0) ? resolve() : reject('Budget instance already exists');
        })),

      handleValidationErrors(),

    ];
  }

  static lookupBudgetValidation() {
    return [

      sanitizeBody(['year', 'month'])
        .toInt(),
      
      body('year')
        .isInt({ min: 2012, max: 2026 }).withMessage('Must be an "int" between 2012 and 2026 inclusive'),
      
      body('month')
        .isInt({ min: 0, max: 11 }).withMessage('Must be an "int" between 0 and 11 inclusive'),
      
      body()
        .custom(({ year, month }, { req }) => new Promise(async function(resolve, reject) {
          const { email } = req.session.data;
          let result__;
          try {
            result__ = await Budget.query().select('id', 'start_date')
              .where({
                user_uuid: User.query().select('uuid').where('email', email),
                start_date: `${year}-${month+1}-01`,
              }).first();
          } catch (e) {
            return reject('Budget lookup failed');
          }
          if (!result__) return reject('No budget matching that query');
          req.budgetData = result__; // store the budget data on the request
          resolve();
        })),
      
      handleValidationErrors(),

    ];
  }

  static addCategoryValidation() {
    return [

      sanitizeBody(['year', 'month'])
        .toInt(),
      
      body('year')
        .isInt({ min: 2012, max: 2026 }).withMessage('Must be an "int" between 2012 and 2026 inclusive'),
      
      body('month')
        .isInt({ min: 0, max: 11 }).withMessage('Must be an "int" between 0 and 11 inclusive'),

      body()
        .custom(({ year, month }, { req }) => new Promise(async function(resolve, reject) {
          const { email } = req.session.data;
          let budgetExists__;
          try {
            budgetExists__ = await Budget.query()
              .leftJoinRelation('users')
              .where('users.email', email)
              .andWhere('budget.start_date', `${year}-${month+1}-01`);
          } catch (e) {
            return reject('Unable to lookup budget');
          }
          if (budgetExists__.length !== 1) return reject('Budget does not exist');
          resolve();
        })),

      handleValidationErrors(),

    ];
  }

}

module.exports = Budget;
