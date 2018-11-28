const tableName = 'users';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.binary('uuid', 16).primary();
    table.string('name', 150).notNullable();
    table.string('email', 100).notNullable();
    table.string('password', 100).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('last_login').defaultTo(knex.fn.now());
    table.unique(['email']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
