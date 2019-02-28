// Vendor imports
const appRoot = require('app-root-path');
const { Model } = require('objection');
const { body } = require('express-validator/check');
const uuid = require('uuid/v4');

// Custom Imports
const BaseModel = require(`${appRoot}/server/db/models/BaseModel`);
const handleValidationErrors = require(`${appRoot}/server/middleware/handleValidationErrors`);

/**
 * TransactionRecord Model
 * Represents the budget_record table in the database
 */
class TransactionRecord extends BaseModel {

  static get tableName() {
    return 'transaction_record';
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
          from: 'transaction_record.budget_id',
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
          from: 'transaction_record.category_id',
          to: 'category.id',
        },
      }

    };

  }

  async $beforeInsert() {
    const newUUID = uuid().replace(/-/g, '').substr(0, 16);
    const idBuf = Buffer.from(newUUID);
    this.accessId = idBuf;
  }
  
  $afterInsert() {
    this.parseAccessId();
    this.parseBelongsTo();
  }
  
  $afterGet() {
    this.parseAccessId();
    this.parseBelongsTo();
  }

  parseAccessId() {
    if (!this.accessId) return; // Sometimes, your selects don't return the id
    const buf = Buffer.from(this.accessId, 'binary');
    const access_id = buf.toString('utf8');
    this.accessId = access_id;
  }

  parseBelongsTo() {
    if (!this.belongsTo) return; // Sometimes, your selects don't return 'belongsTo'
    const buf = Buffer.from(this.belongsTo, 'binary');
    const belongsTo = buf.toString('utf8');
    this.belongsTo = belongsTo;
  }

  static deleteTransactionValidation() {
    return [

      body('accessId')
        .not().isEmpty().withMessage('Field required'),

      body()
        .custom(({ accessId }, { req }) => new Promise(async function(resolve, reject) {
          const { email } = req.session.data;
          let transactionExists__;
          try {
            transactionExists__ = await TransactionRecord.query()
              .leftJoinRelation('users')
              .where('users.email', email)
              .andWhere('transaction_record.access_id', accessId);
          } catch (e) {
            return reject('Transaction lookup failed');
          }
          if (transactionExists__.length !== 1) return reject('No transaction with that accessId');
          resolve();
        })),

      handleValidationErrors(),

    ];
  }

}

module.exports = TransactionRecord;