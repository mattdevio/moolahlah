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
    const CategoryType = require(`${appRoot}/server/db/models/CategoryType`);
    return {

      categoryType: {
        relation: Model.BelongsToOneRelation,
        modelClass: CategoryType,
        join: {
          from: 'category.category_type_id',
          to: 'category_type.id',
        },
      },

    };
  }

}

module.exports = Category;
