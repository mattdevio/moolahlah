const tableName = 'transaction_record';

exports.up = function(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.binary('access_id', 16).notNullable();
    table.integer('budget_id').unsigned().notNullable();
    table.integer('category_id').unsigned().notNullable();
    table.string('name').notNullable().defaultsTo('');
    table.date('transaction_date').notNullable();
    table.decimal('cost', 13, 4).notNullable().defaultsTo(0.00);
    table.text('notes').notNullable().defaultsTo('');
    table.unique('access_id');
    table.foreign('budget_id').references('budget.id').onDelete('cascade');
    table.foreign('category_id').references('category.id').onDelete('cascade');
    table.foreign('transaction_date').references('calendar.db_date').onDelete('cascade');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
