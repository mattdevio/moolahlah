/**
 * categoryGroupDefaults
 * These are the auto created category groups when a new budget is started
 */
const categoryGroupDefaults = [
  {
    categoryLabel: 'Income',
    canEdit: false,
    isDebit: false,
  },
  {
    categoryLabel: 'Housing',
    canEdit: true,
    isDebit: true,
  },
  {
    categoryLabel: 'Food',
    canEdit: true,
    isDebit: true,
  },
  {
    categoryLabel: 'Transportation',
    canEdit: true,
    isDebit: true,
  },
  {
    categoryLabel: 'Taxes',
    canEdit: true,
    isDebit: true,
  },
  {
    categoryLabel: 'Lifestyle',
    canEdit: true,
    isDebit: true,
  },
  {
    categoryLabel: 'Giving',
    canEdit: true,
    isDebit: true,
  },
  {
    categoryLabel: 'Saving & Investments',
    canEdit: true,
    isDebit: true,
  },
  {
    categoryLabel: 'Debt',
    canEdit: true,
    isDebit: true,
  },
];

module.exports = categoryGroupDefaults;