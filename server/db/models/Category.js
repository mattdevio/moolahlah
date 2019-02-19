// Vendor imports
const appRoot = require('app-root-path');
const { Model } = require('objection');

// Custom Imports
const BaseModel = require(`${appRoot}/server/db/models/BaseModel`);

/**
 * Category Model
 * Defines the model for the database
 */
class Category extends BaseModel {

  static get tableName() {
    return 'category';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    const Budget = require(`${appRoot}/server/db/models/Budget`);
    return {

      categoryType: {
        relation: Model.BelongsToOneRelation,
        modelClass: Budget,
        join: {
          from: 'category.budget_id',
          to: 'budget.id',
        },
      },

    };
  }

}

module.exports = Category;
