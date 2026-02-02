const mongoose = require('mongoose');
const repo = require('../repositories/formEntry.repository');

exports.saveFormEntry = async (data) => {
  return await repo.createEntry(data);
};

exports.getEntriesByUser = async ({ created_by, added_by }) => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('Database not connected');
  }

  let filter = {};

  if (created_by) filter.created_by = created_by;
  if (added_by) filter.added_by = parseInt(added_by);

  if (Object.keys(filter).length === 0) {
    throw new Error('created_by or added_by required');
  }

  return await repo.findByFilter(filter);
};
