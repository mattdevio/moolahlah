// Vendor imports
const appRoot = require('app-root-path');
const { Model } = require('objection');
const { body } = require('express-validator/check');
const uuid = require('uuid/v4');
const moment = require('moment');

// Custom Imports
const BaseModel = require(`${appRoot}/server/db/models/BaseModel`);
const handleValidationErrors = require(`${appRoot}/server/middleware/handleValidationErrors`);

/**
 * BudgetRecord Model
 * Represents the budget_record table in the database
 */
class BudgetRecord extends BaseModel {

  static get tableName() {
    return 'budget_record';
  }

  static get idColumn() {
    return 'id';
  }
  
  static get relationMappings() {

    // Import here to avoid require loops
    const User = require(`${appRoot}/server/db/models/User`);
    const Category = require(`${appRoot}/server/db/models/Category`);

    return {

      users: {
        relation: Model.HasOneThroughRelation,
        modelClass: User,
        join: {
          from: 'budget_record.budget_id',
          through: {
            from: 'budget.id',
            to: 'budget.user_uuid',
          },
          to: 'users.uuid',
        },
      },

      category: {
        relation: Model.HasOneRelation,
        modelClass: Category,
        join: {
          from: 'budget_record.category_id',
          to: 'category.id',
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

  static updateRecordValidation() {
    return [

      body('accessId')
        .not().isEmpty().withMessage('Field required'),

      body('')
        .custom(({ accessId, label, estimateDate, estimate }, { req }) => new Promise(async function(resolve, reject) {
          if (typeof estimateDate !== 'undefined' && !moment(estimateDate, 'YYYY-MM-DD', true).isValid()) {
            return reject('Date format must be YYYY-MM-DD');
          }
          const { email } = req.session.data;
          let recordOwnership__;
          try {
            recordOwnership__ = await BudgetRecord.query().leftJoinRelation('users')
              .where('users.email', email)
              .andWhere('budget_record.access_id', accessId);
          } catch (e) {
            return reject('Budget record lookup failed');
          }
          if (recordOwnership__.length !== 1) return reject('No record matching that accessId');
          if (typeof label === 'undefined' && typeof estimateDate === 'undefined' && typeof estimate === 'undefined') {
            return reject('Atleast one field required: label, estimateDate, estimate');
          }
          resolve();
        })),
      
      body('estimate')
        .isDecimal().withMessage('Must be a decimal').optional(),
      
      handleValidationErrors(),

    ];
  }

  static deleteRecordValidation() {
    return [

      body('accessId')
        .not().isEmpty().withMessage('Field required'),
      
      body('')
        .custom(({ accessId }, { req }) => new Promise(async function(resolve, reject) {
          const { email } = req.session.data;
          let recordOwnership__;
          try {
            recordOwnership__ = await BudgetRecord.query().leftJoinRelation('users')
              .where('users.email', email)
              .andWhere('budget_record.access_id', accessId);
          } catch (e) {
            return reject('Budget record lookup failed');
          }
          if (recordOwnership__.length !== 1) return reject('No record matching that accessId');
          resolve();
        })),

      handleValidationErrors(),

    ];
  }

}

module.exports = BudgetRecord;