/*----------  Vendor Imports  ----------*/
const mongoose = require('mongoose');

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

// Set Model Reference
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
