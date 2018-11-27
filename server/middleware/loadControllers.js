// Vendor Imports
const appRoot = require('app-root-path')

// Node Imports
const { readdirSync } = require('fs');
const { basename } = require('path');

// Custom Imports
const { logger } = require(`${appRoot}/server/bin/utility`);

module.exports = function loadControllers(expressAppInstance) {
  const controllers = readdirSync(`${appRoot}/server/controllers`)
    .map(file => basename(file, '.js'));
  logger.info(`Loading controllers ${JSON.stringify(controllers)}`);
  controllers.forEach(file => {
    expressAppInstance.use(`/${file}`, require(`${appRoot}/server/controllers/${file}`));
    logger.info(`Mounted controller [${file}] @ url base '/${file}'`);
  });
};
