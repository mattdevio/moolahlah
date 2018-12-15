// Vendor imports
const appRoot = require('app-root-path');
const { Model } = require('objection');

// Custom Imports
const BaseModel = require(`${appRoot}/server/db/models/BaseModel`);


class Status extends BaseModel {

  static get tableName() {
    return 'status';
  }

  static get idColumn() {
    return 'id';
  }

}

module.exports = Status;
