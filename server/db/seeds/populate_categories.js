
exports.seed = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex('category').del();
    await knex('category').insert([
      { category_label: 'Income' },
      { category_label: 'Housing' },
      { category_label: 'Food' },
      { category_label: 'Transportation' },
      { category_label: 'Taxes' },
      { category_label: 'Lifestyle' },
      { category_label: 'Giving' },
      { category_label: 'Saving & Investments' },
      { category_label: 'Debt' },
    ]);
    resolve();
  });
};
