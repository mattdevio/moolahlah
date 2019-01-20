// Vendor Imports
const appRoot = require('app-root-path');

// Custom Imports
const populate_categories_type_and_categories = require(`${appRoot}/server/db/seeds/populate_categories_type_and_categories`);

// Setup
const tableName = 'category_type';

exports.up = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.string('category_type').notNullable();
    });
    await knex.schema.alterTable('category', (table) => {
      table.integer('category_type_id').unsigned().notNullable();
      table.foreign('category_type_id').references(`${tableName}.id`).onDelete('cascade');
    });
    await populate_categories_type_and_categories.seed(knex, Promise);
    resolve();
  });
};

exports.down = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.alterTable('category', (table) => {
      table.dropForeign('category_type_id');
      table.dropColumn('category_type_id');
    });
    await knex.schema.dropTableIfExists(tableName);
    resolve();
  });
};
