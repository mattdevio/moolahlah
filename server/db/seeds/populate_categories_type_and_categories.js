
exports.seed = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex('category').del();
    await knex('category_type').del();

    const incomeId = await knex('category_type').returning('id').insert({ category_type: 'Income' })
      .then(results => results[0]); // returns an array, we just want the id
    const expenseId = await knex('category_type').returning('id').insert({ category_type: 'Expense' })
      .then(results => results[0]); // returns an array, we just want the id

    await knex('category').insert([
      { category_label: 'Income', category_type_id: incomeId },
      { category_label: 'Housing', category_type_id: expenseId },
      { category_label: 'Food', category_type_id: expenseId },
      { category_label: 'Transportation', category_type_id: expenseId },
      { category_label: 'Taxes', category_type_id: expenseId },
      { category_label: 'Lifestyle', category_type_id: expenseId },
      { category_label: 'Giving', category_type_id: expenseId },
      { category_label: 'Saving & Investments', category_type_id: expenseId },
      { category_label: 'Debt', category_type_id: expenseId },
    ]);
    resolve();
  });
};
