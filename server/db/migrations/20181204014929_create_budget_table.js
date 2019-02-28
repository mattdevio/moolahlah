const tableName = 'budget';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.binary('user_uuid', 16).notNullable();
    table.date('start_date').notNullable();
    table.foreign('user_uuid').references('users.uuid').onDelete('cascade');
    table.foreign('start_date').references('calendar.db_date').onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
