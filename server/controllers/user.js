/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const { Router } = require('express');

/*----------  Custom Imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/bin/apiResponse`);
const userModel = require(`${appRoot}/server/models/user`);

/*----------  Setup  ----------*/
const userRouter = Router();

/**
 * Get the users
 */
userRouter.get('/', function(req, res) {
  res.json(apiResponse());
});

// export router
module.exports = userRouter;
