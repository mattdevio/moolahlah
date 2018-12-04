const tableName = 'budget_record';

exports.up = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.integer('budget_id').unsigned().notNullable();
      table.integer('category_id').unsigned().notNullable();
      table.string('label').notNullable();
      table.date('estimate_date').notNullable();
      table.decimal('estimate', 2).notNullable();
    });
    resolve();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tableName);
};
