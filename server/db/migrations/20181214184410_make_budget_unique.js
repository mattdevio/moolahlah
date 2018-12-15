const tableName = 'budget';

exports.up = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.alterTable(tableName, (table) => {
      table.unique(['user_uuid', 'start_date']);
    });
    resolve();
  });
};

exports.down = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.alterTable(tableName, (table) => {
      table.dropForeign('user_uuid');
      table.dropForeign('start_date');
      table.dropUnique(['user_uuid', 'start_date']);
      table.foreign('user_uuid').references('users.uuid').onDelete('cascade');
      table.foreign('start_date').references('calendar.db_date').onDelete('cascade');
    });
    resolve();
  });
};
