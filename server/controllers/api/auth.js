/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');

/*----------  Custom Imports  ----------*/
const apiResponse = require(`${appRoot}/server/bin/apiResponse`);


function get(req, res) {

  res.json(apiResponse({
    message: 'This is the auth route'
  }));

}

// Export Functions
module.exports = {
  get,
};