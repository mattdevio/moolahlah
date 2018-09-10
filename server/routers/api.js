/*----------  Vendor Imports  ----------*/
const { Router } = require('express');

/*=================================
=            apiRouter            =
=================================*/

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.send('This is the api!');
});

module.exports = apiRouter;

/*=====  End of apiRouter  ======*/
