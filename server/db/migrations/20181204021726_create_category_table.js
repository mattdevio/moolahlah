const tableName = 'category';

exports.up = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.string('category_label').notNullable();
      table.unique('category_label');
    });
    resolve();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
