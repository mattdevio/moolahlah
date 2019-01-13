const tableName = 'budget_record';

exports.up = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.binary('access_id', 16).notNullable();
      table.integer('budget_id').unsigned().notNullable();
      table.integer('category_id').unsigned().notNullable();
      table.string('label').notNullable().defaultsTo('');
      table.date('estimate_date').notNullable();
      table.decimal('estimate', 13, 4).notNullable().defaultsTo(0.00);
      table.foreign('budget_id').references('budget.id').onDelete('cascade');
      table.foreign('category_id').references('category.id').onDelete('cascade');
      table.foreign('estimate_date').references('calendar.db_date').onDelete('cascade');
      table.unique('access_id');
    });
    resolve();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
