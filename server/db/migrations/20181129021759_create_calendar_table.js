const tableName = 'calendar';
const procedureName = 'populate_calendar';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(tableName, function(table) {
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
    }),
    // When creating a stored proc remotely, you don't use delimiters
    knex.raw(`
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
                              'f',
                              CASE DAYOFWEEK(currentdate) WHEN 1 THEN 't' WHEN 7 then 't' ELSE 'f' END);
              SET currentdate = ADDDATE(currentdate,INTERVAL 1 DAY);
          END WHILE;
      END
    `),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists(tableName),
    knex.schema.raw(`DROP PROCEDURE IF EXISTS ${procedureName}`),
  ]);
};
