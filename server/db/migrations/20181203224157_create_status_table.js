const tableName = 'status';

exports.up = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.string('status_type', 100).notNullable();
      table.unique('status_type');
    });
    await knex.schema.table('users', (table) => {
      table.integer('status_id').unsigned().notNullable();
      table.foreign('status_id').references(`${tableName}.id`);
    });
    resolve();
  });
};

exports.down = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.table('users', (table) => {
      table.dropForeign('status_id');
      table.dropColumn('status_id');
    });
    await knex.schema.dropTableIfExists(tableName);
    resolve();
  });
};
