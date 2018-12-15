// Vendor imports
const appRoot = require('app-root-path');

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

}

module.exports = Category;
