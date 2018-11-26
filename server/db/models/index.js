// Vendor Imports
const appRoot = require('app-root-path');
const { Model } = require('objection');
const Knex = require('knex');

// Node Imports
const { readdirSync } = require('fs');
const { basename } = require('path');
const thisFile = basename(__filename, '.js');
const { logger } = require(`${appRoot}/server/bin/utility`);

// Custom Imports
const knexConfig = require(`${appRoot}/knexfile`);

// Initialize Knex sql builder instance
const knex = Knex(Object.assign({
  log: {
    warn: msg => logger.info(JSON.stringify(msg, null, 2)),
    error: msg => logger.error(JSON.stringify(msg, null, 2)),
    deprecate: msg => logger.info(JSON.stringify(msg, null, 2)),
    debug: msg => logger.debug(JSON.stringify(msg, null, 2)),
  }
}, knexConfig[process.env.NODE_ENV]));

// Bind all models to the knex instance
Model.knex(knex);

/**
 * Load All Models and export like a barrel file
 */
module.exports = readdirSync(`${appRoot}/server/db/models`)
  .map(file => basename(file, '.js'))
  .filter(file => ((file !== thisFile) && (file !== 'BaseModel')))
  .reduce((acc, val) => {
    logger.info(`Loading Objection Model [${val}]`);
    acc[basename(val, '.js')] = require(`${appRoot}/server/db/models/${val}`);
    return acc;
  }, { knex });
