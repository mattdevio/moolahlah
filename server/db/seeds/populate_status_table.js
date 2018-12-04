
exports.seed = function(knex, Promise) {
  return new Promise(async function(resolve) {
    await knex('status').insert([
      { status_type: 'active' },
      { status_type: 'deleted' },
    ]);
    resolve();
  });
};
