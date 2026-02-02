const FormEntry = require('./models/formEntry.model');

exports.createEntry = (data) => {
  const entry = new FormEntry(data);
  return entry.save();
};

exports.findByFilter = (filter) => {
  return FormEntry.find(filter).sort({ created_dt: -1 });
};
