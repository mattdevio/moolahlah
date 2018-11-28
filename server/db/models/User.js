// Vendor Imports
const appRoot = require('app-root-path');
const uuid = require('uuid/v4');
const { body } = require('express-validator/check');

// Custom Imports
const BaseModel = require('./BaseModel');
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
    if (!this.$id()) return; // Sometimes, your selects don't return the id
    const buf = Buffer.from(this.$id(), 'binary');
    const userUUID = buf.toString('utf8');
    this.$id(userUUID);
  }

  static newUserValidation() {
    return [

      body('emailAddress')
        .not().isEmpty().withMessage('Field required')
        .isEmail().withMessage('Not a valid email address')
        .custom(async emailAddress => new Promise(async (resolve, reject) => {
          User.query()
            .select('email')
            .where('email', emailAddress)
            .then(result => result.length > 0 ? reject('Email address already in use') : resolve())
            .catch(() => reject('An error occured in validation'));
        })),

      body('password')
        .not().isEmpty().withMessage('Field required')
        .isLength({ min: 6 }).withMessage('Must be atleast 6 characters')
        .matches(/\d/).withMessage('must contain a number'),

      body('name')
        .not().isEmpty().withMessage('Field required'),

      handleValidationErrors()

    ];
  }

  static loginUserValidation() {
    return [

      body('emailAddress')
        .not().isEmpty().withMessage('Field required')
        .isEmail().withMessage('Not a valid email address'),
      
      body('password')
        .not().isEmpty().withMessage('Field required'),

      handleValidationErrors(),

    ];
  }

} // end User Model

module.exports = User;
