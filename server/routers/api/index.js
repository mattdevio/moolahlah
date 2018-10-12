/*----------  Vendor Imports  ----------*/
const { Router } = require('express');
const appRoot = require('app-root-path');

/*----------  Custom Imports  ----------*/
const apiResponse = require(`${appRoot}/server/bin/apiResponse`);

/*=================================
=            apiRouter            =
=================================*/

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.json(apiResponse({
    message: 'This is our API!'
  }));
});

module.exports = apiRouter;

/*=====  End of apiRouter  ======*/
