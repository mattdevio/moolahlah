const tableName = 'calendar';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, function(table) {
    table.integer('id').primary();                        // year*10000 + month*100 + day = yyyymmdd
    table.date('db_date').notNullable();                  // date string
    table.integer('year').notNullable();                  // yyyy
    table.integer('month').notNullable();                 // 1 to 12
    table.integer('day').notNullable();                   // 1 to 31
    table.integer('quarter').notNullable();               // 1 to 4
    table.integer('week').notNullable();                  // 1 to <52 | 53>
    table.string('day_name', 9).notNullable();            // ['Monday', 'Tuesday', ect...]
    table.string('month_name', 9).notNullable();          // ['January', 'February', ect...]
    table.boolean('holiday_flag').defaultTo(false);       // true or false
    table.boolean('weekend_flag').defaultTo(false);       // true or false
    table.unique(['year', 'month', 'day']);
    table.unique('db_date');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
