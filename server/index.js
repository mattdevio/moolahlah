// Vendor Imports
const result = require('dotenv').config();
const appRoot = require('app-root-path');

// Custom Imports
const initServer = require(`${appRoot}/server/bin/initServer`);
const { logger } = require(`${appRoot}/server/bin/utility`);
const Models = require(`${appRoot}/server/db/models`);

// Begin Server
logger.info('Starting the moolahlah server!');
logger.info(`Running server in '${process.env.NODE_ENV}' mode`);

// Make sure the .env file loaded correctly
if (result.error) {
  logger.error('Unable to load enviornment variables! Try "npm run config" to load defaults.', result);
  process.exit(1); // exit with error
}

// Log .env variables for debugging
Object.keys(result.parsed).forEach(key => {
  logger.debug(`${key} => ${result.parsed[key]}`);
});

console.dir(Object.keys(Models));

// Start the express server
initServer()
  .then(server => server.listen(process.env.PORT, () => {
    logger.info(`Server listening on ${process.env.BASE_URL}:${process.env.PORT}`);
  }))
  .catch(e => logger.error(e));
