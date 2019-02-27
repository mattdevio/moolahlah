const tableName = 'transaction_record';

exports.up = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.binary('access_id', 16).notNullable();
      table.integer('budget_id').unsigned().notNullable();
      table.string('name');
      table.unique('access_id');
      table.integer('belongs_to').unsigned().notNullable();
      table.date('transaction_date').notNullable();
      table.decimal('cost', 13, 4).notNullable().defaultsTo(0.00);
      table.boolean('is_debit').notNullable().defaultTo(true);
      table.text('notes');
      table.foreign('belongs_to').references('category.id').onDelete('cascade');
      table.foreign('transaction_date').references('calendar.db_date').onDelete('cascade');
      table.foreign('budget_id').references('budget.id').onDelete('cascade');
    });
    resolve();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
