/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');

/*----------  Custom Imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/middleware/apiResponse`);


/*===========================================
=            handlerequestErrors            =
===========================================*/

function handleRequestErrors() {
  logger.info('Mounting [handleRequestErrors] middleware');
  
  return (err, req, res, next) => {

    if (res.headersSent) {
      return next(err);
    }

    logger.error(`Express middleware caught an error: "${err.message}" ${err.stack}`);

    res.status(500);
    if (process.env.NODE_ENV === 'development') {
      res.json(apiResponse({
        status: 0,
        errors: [err],
        message: `Error from ${req.method} request to ${req.path}`
      }));
    } else {
      res.end();
    }

  };
  
}

module.exports = handleRequestErrors;

/*=====  End of handlerequestErrors  ======*/
