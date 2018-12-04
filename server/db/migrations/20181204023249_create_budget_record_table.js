const tableName = 'budget_record';

exports.up = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.createTable(tableName, (table) => {

    });
    resolve();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tableName);
};
