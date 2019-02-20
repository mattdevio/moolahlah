// Vendor imports
const appRoot = require('app-root-path');
const uuid = require('uuid/v4');
const { Model } = require('objection');
const { body } = require('express-validator/check');

// Custom Imports
const BaseModel = require(`${appRoot}/server/db/models/BaseModel`);
const handleValidationErrors = require(`${appRoot}/server/middleware/handleValidationErrors`);

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

  async $beforeInsert() {
    const newUUID = uuid().replace(/-/g, '').substr(0, 16);
    const idBuf = Buffer.from(newUUID);
    this.accessId = idBuf;
  }

  static get relationMappings() {

    // Import models here to prevent require loops.
    const User = require(`${appRoot}/server/db/models/User`);

    return {
      users: {
        relation: Model.HasOneThroughRelation,
        modelClass: User,
        join: {
          from: 'category.budget_id',
          through: {
            from: 'budget.id',
            to: 'budget.user_uuid',
          },
          to: 'users.uuid',
        },
      },
    };
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

  static updateCategoryValidation() {
    return [

      body('accessId', 'categoryLabel')
        .not().isEmpty().withMessage('Field required'),
      
      body()
        .custom(({ accessId }, { req }) => new Promise(async function(resolve, reject) {
          const { email } = req.session.data;
          let result__;
          try {
            result__ = await Category.query()
              .leftJoinRelation('users')
              .where('users.email', email)
              .andWhere('category.access_id', accessId);
          } catch (e) {
            return reject('Category label lookup failed');
          }
          if (result__.length !== 1) return reject('Unknown category label accessId');
          if (!result__[0].canEdit) return reject('Category label can not be edited');
          resolve();
        })),
      
      handleValidationErrors(),

    ];
  }

}

module.exports = Category;
