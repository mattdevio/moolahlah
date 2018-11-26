// Vendor Imports
const appRoot = require('app-root-path');
const { Model } = require('objection');
const Knex = require('knex');

// Node Imports
const { readdirSync } = require('fs');
const thisFile = require('path').basename(__filename);

// Custom Imports
const knexConfig = require(`${appRoot}/knexfile`);

// Initialize Knex sql builder instance
const knex = Knex(knexConfig[process.env.NODE_ENV]);

// Bind all models to the knex instance
Model.knex(knex);

/**
 * Load All Models and export like a barrel file
 */
const exports = { knex };
readdirSync(`${appRoot}/server/db/models`)
  .filter(file => file !== thisFile)
  .forEach(file => {
    console.log(file);
  });

module.exports = exports;
