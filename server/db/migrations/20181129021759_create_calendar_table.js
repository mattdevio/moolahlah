const tableName = 'calendar';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, function(table) {
    table.integer('id').primary();
    table.date('db_date').notNullable();
    table.integer('year').notNullable();
    table.integer('month').notNullable();
    table.integer('day').notNullable();
    table.integer('quarter').notNullable();
    table.integer('week').notNullable();
    table.string('day_name', 9).notNullable();
    table.string('month_name', 9).notNullable();
    table.boolean('holiday_flag').defaultTo(false);
    table.boolean('weekend_flag').defaultTo(false);
    table.unique(['year', 'month', 'day']);
    table.unique('db_date');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
