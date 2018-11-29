const tableName = 'calendar';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, function(table) {
    table.integer('id').primary();
    table.date('db_date').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
