// Vendor Imports
const appRoot = require('app-root-path');
const uuid = require('uuid/v4');
const { Model } = require('objection');
const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Custom Imports
const BaseModel = require(`${appRoot}/server/db/models/BaseModel`);
const Status = require(`${appRoot}/server/db/models/Status`);
const handleValidationErrors = require(`${appRoot}/server/middleware/handleValidationErrors`);

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

  static get relationMappings() {

    // Import here to avoid require loops
    const Status = require(`${appRoot}/server/db/models/Status`);
    const BudgetRecord = require(`${appRoot}/server/db/models/BudgetRecord`);

    return {

      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status,
        join: {
          from: 'users.status_id',
          to: 'status.id',
        },
      },

      budgetRecord: {
        relation: Model.HasOneThroughRelation,
        modelClass: BudgetRecord,
        join: {
          from: 'users.uuid',
          through: {
            from: 'budget.user_uuid',
            to: 'budget.id'
          },
          to: 'budget_record.budget_id'
        },
      },

    };
  }

  async $beforeInsert() {
    this.status_id = await Status.query().select('id').where('status_type', 'active')
      .then(result => result[0].id);
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
    if (!this.$id()) return; // Sometimes, your selects don't return the id
    const buf = Buffer.from(this.$id(), 'binary');
    const userUUID = buf.toString('utf8');
    this.$id(userUUID);
  }

  static newUserValidation() {
    return [

      sanitizeBody(['email', 'password', 'name'])
        .trim(),

      body(['email', 'password', 'name'])
        .not().isEmpty().withMessage('Field required'),

      body('email')
        .isEmail().withMessage('Not a valid email address')
        .custom(async email => new Promise(async (resolve, reject) => {
          if (!email) return reject();
          User.query()
            .select('email')
            .where('email', email)
            .then(result => result.length > 0 ? reject('Email address already in use') : resolve())
            .catch(() => reject('An error occured in validation'));
        })),

      body('password')
        .isLength({ min: 6 }).withMessage('Must be atleast 6 characters')
        .matches(/\d/).withMessage('must contain a number'),

      handleValidationErrors()

    ];
  }

  static loginUserValidation() {
    return [

      sanitizeBody(['email', 'password'])
        .trim(),

      body(['email', 'password'])
        .not().isEmpty().withMessage('Field required'),

      body('email')
        .isEmail().withMessage('Not a valid email address'),

      handleValidationErrors(),

    ];
  }

} // end User Model

module.exports = User;
