exports.seed = function(knex) {
  return knex('status').del()
    .then(() => {
      return knex('status').insert([
        { status_type: 'active' },
        { status_type: 'deleted' },
      ]);
    });
};
