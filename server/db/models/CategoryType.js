// Vendor imports
const appRoot = require('app-root-path');

// Custom Imports
const BaseModel = require(`${appRoot}/server/db/models/BaseModel`);

/**
 * CategoryType Model
 * Represents the category_type table in the database
 */
class CategoryType extends BaseModel {

  static get tableName() {
    return 'category_type';
  }

  static get idColumn() {
    return 'id';
  }

}

module.exports = CategoryType;
