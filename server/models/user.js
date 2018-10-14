/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const mongoose = require('mongoose');
const { body } = require('express-validator/check');

/*----------  Custom Imports  ----------*/
const handleValidationErrors = require(`${appRoot}/server/middleware/handleValidationErrors`);

/*----------  Define Schema  ----------*/
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

/**
 * newUserValidation - Validate the post params for new user signup
 */
userSchema.statics.newUserValidation = function() {
  return [

    body('emailAddress')
      .isEmail()
      .withMessage('Invalid email')
      .custom(emailAddress => this.find({ emailAddress })
        .exec()
        .then(result => {
          if (result.length > 0) return Promise.reject('Aready in use');
        })
        .catch(error => Promise.reject(error))),

    body('password')
      .isLength({ min: 6 })
      .withMessage('Must be atleast 6 characters')
      .matches(/\d/)
      .withMessage('Must contain a number'),

    body('name')
      .not()
      .isEmpty()
      .withMessage('Name can not be empty'),

    handleValidationErrors(),

  ];
};

// export model
module.exports = mongoose.model('User', userSchema);