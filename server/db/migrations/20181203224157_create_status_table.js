// Vendor Imports
const appRoot = require('app-root-path');

// Custom Imports
const populate_status_table = require(`${appRoot}/server/db/seeds/populate_status_table`);

// Setup
const tableName = 'status';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('status_type', 100).notNullable();
    table.unique('status_type');
  })
    .then(() => {
      return knex.schema.table('users', (table) => {
        table.integer('status_id').unsigned().notNullable();
        table.foreign('status_id').references(`${tableName}.id`);
      });
    })
    .then(() => { 
      return populate_status_table.seed(knex);
    });
};

exports.down = function(knex) {
  return knex.schema.table('users', (table) => {
    table.dropForeign('status_id');
    table.dropColumn('status_id');
  })
    .then(() => {
      return knex.schema.dropTableIfExists(tableName);
    });
};
