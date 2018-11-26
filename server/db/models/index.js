// Vendor Imports
const appRoot = require('app-root-path');
const { Model } = require('objection');
const Knex = require('knex');

// Node Imports
const { readdirSync } = require('fs');
const { basename } = require('path');
const thisFile = basename(__filename, '.js');

// Custom Imports
const knexConfig = require(`${appRoot}/knexfile`);

// Initialize Knex sql builder instance
const knex = Knex(knexConfig[process.env.NODE_ENV]);

// Bind all models to the knex instance
Model.knex(knex);

/**
 * Load All Models and export like a barrel file
 */
module.exports = readdirSync(`${appRoot}/server/db/models`)
  .map(file => basename(file, '.js'))
  .filter(file => file !== thisFile)
  .reduce((acc, val) => {
    acc[basename(val, '.js')] = require(`${appRoot}/se3rver/db/models/${val}`);
    return acc;
  }, { knex });