// Vendor Imports
const appRoot = require('app-root-path');
const { Model, snakeCaseMappers } = require('objection');

/**
 * BaseModel - Used to set global configratuions
 */
class BaseModel extends Model {

  // Identify the Models root path
  static get modelPaths() {
    return [`${appRoot}/server/db/models`];
  }

  // Convert snake_case db columns to camelCase in code
  static get columnNameMappers() {
    return snakeCaseMappers({
      underscoreBeforeDigits: true,
    });
  }
}

module.exports = BaseModel;
