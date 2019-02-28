const tableName = 'category';

exports.up = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.binary('access_id', 16).notNullable();
      table.string('category_label').notNullable();
      table.boolean('can_edit').notNullable().defaultTo(true);
      table.boolean('is_debit').notNullable().defaultTo(true);
      table.boolean('is_visable').notNullable().defaultTo(true);
      table.integer('budget_id').unsigned().notNullable();
      table.foreign('budget_id').references('budget.id').onDelete('cascade');
    });
    resolve();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
