/*----------  Vendor Imports  ----------*/
const { Router } = require('express');

/*==================================
=            fileRouter            =
==================================*/

const fileRouter = Router();

fileRouter.get('*', (req, res, next) => {

  try {
    res.render('index', {
      bundles: ['/polyfill.bundle.js', '/app.bundle.js'],
    });
  } catch (e) {
    next(e);
  }
});

module.exports = fileRouter;

/*=====  End of fileRouter  ======*/
