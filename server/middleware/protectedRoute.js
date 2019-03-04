// Vendor Imports
const appRoot = require('app-root-path');

// Custom Imports
const apiResponse = require(`${appRoot}/server/middleware/apiResponse`);
const { logger } = require(`${appRoot}/server/bin/utility`);

/**
 * protectedRoute
 * Returns a middleware that checks the session data
 * Closes request if session is invalid
 */
function protectedRoute() {
  return (req, res, next) => {

    const authenticated = (req.session && req.session.data && req.session.data.email);
    if (!authenticated) {
      logger.debug(`Missing session data for protected route: ${req.path}`);
      res.status(401).json(apiResponse({
        message: 'Authentication failed',
        status: 0,
      }));
    } else {
      next();
    }

  };
}

module.exports = protectedRoute;
