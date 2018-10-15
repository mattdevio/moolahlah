/*----------  Vendor Imports  ----------*/
const appRoot = require('app-root-path');
const { validationResult } = require('express-validator/check');

/*----------  Custom Imports  ----------*/
const { logger } = require(`${appRoot}/server/bin/utility`);
const apiResponse = require(`${appRoot}/server/bin/apiResponse`);

/**
 * handleValidationErrors
 * returns api response with validation errors if any
 */
function handleValidationErrors() {
  return (req, res, next) => {

    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    const allErrors = errors.array();
    logger.error(`Invalid ${req.method} request to "${req.baseUrl}" ${JSON.stringify(allErrors)}`);

    res.status(400);
    res.json(apiResponse({
      errors: allErrors,
      message: 'Unable to process your request',
      status: 0,
    }));

  };
}

module.exports = handleValidationErrors;
