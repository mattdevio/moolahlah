// Vendor imports
const appRoot = require('app-root-path');
const { Model } = require('objection');

// Custom Imports
const BaseModel = require(`${appRoot}/server/db/models/BaseModel`);

/**
 * BudgetRecord Model
 * Represents the budget_record table in the database
 */
class BudgetRecord extends BaseModel {

  static get tableName() {
    return 'budget_record';
  }

  static get idColumn() {
    return 'budget_record';
  }

  static get relationMappings() {
    const Budget = require(`${appRoot}/server/db/models/Budget`);
    const CategoryType = require(`${appRoot}/server/db/models/CategoryType`);
    const Calendar = require(`${appRoot}/server/db/models/calendar`);
    return {

      budget: {
        relation: Model.BelongsToOneRelation,
        modelClass: Budget,
        join: {
          from: 'budget_record.budget_id',
          to: 'budget.id',
        },
      },

      categoryType: {
        relation: Model.BelongsToOneRelation,
        modelClass: CategoryType,
        join: {
          from: 'budget_record.budget_id',
          to: 'category_type.id'
        },
      },

      estimateDate: {
        relation: Model.BelongsToOneRelation,
        modelClass: Calendar,
        join: {
          from: 'budget_record.estimate_date',
          to: 'calendar.db_date',
        },
      },

    };
  }

}

module.exports = BudgetRecord;