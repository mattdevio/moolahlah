// Vendor imports
const appRoot = require('app-root-path');
const { Model } = require('objection');
const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Custom Imports
const BaseModel = require(`${appRoot}/server/db/models/BaseModel`);
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

      user: {
        relation: Model.BelongsToOneRelation,
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

      handleValidationErrors(),
    ];
  }

}

module.exports = Budget;
