// Vendor imports
const appRoot = require('app-root-path');

// Custom Imports
const BaseModel = require(`${appRoot}/server/db/models/BaseModel`);

/**
 * Calendar Model
 * Defines the date for the database
 */
class Calendar extends BaseModel {

  static get tableName() {
    return 'calendar';
  }

  static get idColumn() {
    return 'id';
  }

}

module.exports = Calendar;
