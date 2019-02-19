// Vendor imports
const appRoot = require('app-root-path');
const { Model } = require('objection');
const uuid = require('uuid/v4');

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

module.exports = Category;
