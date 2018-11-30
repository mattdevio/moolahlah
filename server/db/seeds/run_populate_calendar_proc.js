exports.seed = function(knex) {
  return knex('calendar').truncate()
    .then(CALL_POPULATE_CALENDAR(knex)('2012-01-01', '2026-01-01'));
};

const CALL_POPULATE_CALENDAR = exports.CALL_POPULATE_CALENDAR = knex => (start, end) =>
  knex('calendar').truncate()
    .then(() => knex.raw(`CALL populate_calendar('${start}', '${end}')`));
