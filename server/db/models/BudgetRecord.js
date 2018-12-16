// Vendor imports
const appRoot = require('app-root-path');
const { Model } = require('objection');
const uuid = require('uuid/v4');

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
    return 'id';
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

      estimate: {
        relation: Model.BelongsToOneRelation,
        modelClass: Calendar,
        join: {
          from: 'budget_record.estimate_date',
          to: 'calendar.db_date',
        },
      },

    };
  }

  async $beforeInsert() {
    const newUUID = uuid().replace(/-/g, '').substr(0, 16);
    const idBuf = Buffer.from(newUUID);
    this.accessId = idBuf;
  }
  
  $afterInsert() {
    this.parseUUID();
  }
  
  $afterGet() {
    this.parseUUID();
  }

  parseUUID() {
    if (!this.accessId) return; // Sometimes, your selects don't return the id
    const buf = Buffer.from(this.accessId, 'binary');
    const access_id = buf.toString('utf8');
    this.accessId = access_id;
  }

}

module.exports = BudgetRecord;