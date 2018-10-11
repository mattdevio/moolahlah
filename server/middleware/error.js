/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');

/*----------  Custom Imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);


/*===========================================
=            handlerequestErrors            =
===========================================*/

function handleRequestErrors() {
  return (err, req, res, next) => {

    if (res.headersSent) {
      return next(err);
    }

    logger.error(`Express middleware caught an error: ${JSON.stringify(err)}`);

    res.status(500);
    if (process.env.NODE_ENV === 'development') {
      res.json(err);
    } else {
      res.end();
    }

  };
}

module.exports = handleRequestErrors;

/*=====  End of handlerequestErrors  ======*/
