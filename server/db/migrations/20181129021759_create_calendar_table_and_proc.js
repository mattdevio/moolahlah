// Vendor Imports
const appRoot = require('app-root-path');

// Custom Imports
const run_populate_calendar_proc = require(`${appRoot}/server/db/seeds/run_populate_calendar_proc`);

// Setup
const tableName = 'calendar';
const procedureName = 'populate_calendar';

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
  })
    .then(() => {
      return knex.raw(`
        CREATE PROCEDURE ${procedureName}(IN startdate DATE,IN stopdate DATE)
        BEGIN
            DECLARE currentdate DATE;
            SET currentdate = startdate;
            WHILE currentdate < stopdate DO
                INSERT INTO ${tableName} VALUES (
                                YEAR(currentdate)*10000+MONTH(currentdate)*100 + DAY(currentdate),
                                currentdate,
                                YEAR(currentdate),
                                MONTH(currentdate),
                                DAY(currentdate),
                                QUARTER(currentdate),
                                WEEKOFYEAR(currentdate),
                                DATE_FORMAT(currentdate,'%W'),
                                DATE_FORMAT(currentdate,'%M'),
                                0,
                                CASE DAYOFWEEK(currentdate) WHEN 1 THEN 1 WHEN 7 then 1 ELSE 0 END);
                SET currentdate = ADDDATE(currentdate,INTERVAL 1 DAY);
            END WHILE;
        END
      `);
    }).then(() => {
      return run_populate_calendar_proc.seed(knex);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName)
    .then(() => {
      return knex.schema.raw(`DROP PROCEDURE IF EXISTS ${procedureName}`);
    });
};
