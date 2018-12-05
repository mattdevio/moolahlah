const tableName = 'transaction_record';

exports.up = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.integer('budget_id').unsigned().notNullable();
      table.integer('budget_record_id').unsigned().notNullable();
      table.string('label').notNullable();
      table.date('date').notNullable();
      table.decimal('amount', 2).notNullable();
      table.foreign('budget_id').references('budget.id').onDelete('cascade');
      table.foreign('budget_record_id').references('budget_record.id').onDelete('cascade');
    });
    resolve();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
