/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');

/*----------  Custom Imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);

/*======================================
=            serveReactHTML            =
======================================*/

function serveReactHTML() {
  logger.info('Mounting [serveReactHTML] middleware');

  return (req, res, next) => {
    try {
      res.render('index', {
        bundles: ['/polyfill.bundle.js', '/app.bundle.js'],
      });
    } catch (e) {
      next(e);
    }
  };

}

module.exports = serveReactHTML;

/*=====  End of serveReactHTML  ======*/
