// Vendor Imports
const appRoot = require('app-root-path');
const { Model } = require('objection');
const Knex = require('knex');

// Custom Imports
const knexConfig = require(`${appRoot}/knexfile`);

// Setup
const knex = Knex(knexConfig[process.env.NODE_ENV]);
Model.knex(knex);
