// Vendor imports
const appRoot = require('app-root-path');

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
    return {

      budget: {
        
      },

    };
  }

}

module.exports = BudgetRecord;