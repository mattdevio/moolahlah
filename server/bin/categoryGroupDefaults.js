/**
 * categoryGroupDefaults
 * These are the auto created category groups when a new budget is started
 */
const categoryGroupDefaults = [
  {
    categoryLabel: 'Unassigned',
    canEdit: false,
    isDebit: true,
    isVisable: false,
  },
  {
    categoryLabel: 'Income',
    canEdit: false,
    isDebit: false,
    isVisable: true,
  },
  {
    categoryLabel: 'Housing',
    canEdit: true,
    isDebit: true,
    isVisable: true,
  },
  {
    categoryLabel: 'Food',
    canEdit: true,
    isDebit: true,
    isVisable: true,
  },
  {
    categoryLabel: 'Transportation',
    canEdit: true,
    isDebit: true,
    isVisable: true,
  },
  {
    categoryLabel: 'Taxes',
    canEdit: true,
    isDebit: true,
    isVisable: true,
  },
  {
    categoryLabel: 'Lifestyle',
    canEdit: true,
    isDebit: true,
    isVisable: true,
  },
  {
    categoryLabel: 'Giving',
    canEdit: true,
    isDebit: true,
    isVisable: true,
  },
  {
    categoryLabel: 'Saving & Investments',
    canEdit: true,
    isDebit: true,
    isVisable: true,
  },
  {
    categoryLabel: 'Debt',
    canEdit: true,
    isDebit: true,
    isVisable: true,
  },
];

module.exports = categoryGroupDefaults;