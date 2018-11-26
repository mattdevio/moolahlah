// Vendor Imports
const uuid = require('uuid/v4');

// Custom Imports
const BaseModel = require('./BaseModel');

/**
 * User Model
 * Defines a user in the database.
 */
class User extends BaseModel {

  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'uuid';
  }

  $beforeInsert() {
    this.genAndEncodeUUID();
  }
  
  $afterInsert() {
    this.parseUUID();
  }
  
  $afterGet() {
    this.parseUUID();
  }
  
  genAndEncodeUUID() {
    const newUUID = uuid().replace(/-/g, '').substr(0, 16);
    const buf = Buffer.from(newUUID);
    this.$id(buf);
  }

  parseUUID() {
    const buf = Buffer.from(this.$id(), 'binary');
    const userUUID = buf.toString('utf8');
    this.$id(userUUID);
  }

} // end User Model

module.exports = User;
