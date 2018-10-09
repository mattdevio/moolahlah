/*----------  Load .env File First!  ----------*/
const result = require('dotenv').config();

/*----------  Custom Imports  ----------*/
const initServer = require('./bin/initServer');
const { logger } = require('./bin/utility');

/*----------  Run Server  ----------*/
logger.info('Starting the moolahlah server!');

if (result.error) {
  logger.error('Unable to load enviornment variables', result);
  process.exit(1);
}

Object.keys(result.parsed).forEach(key => {
  logger.debug(`${key} => ${result.parsed[key]}`);
});

initServer()
  .then(server => server.listen(process.env.PORT, () => {
    logger.info(`Server listening on ${process.env.BASE_URL}:${process.env.PORT}`);
  }))
  .catch(e => logger.error(e));
