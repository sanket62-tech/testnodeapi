const FormEntry = require('../models/formEntry.model');

const upsertOne = async (doc) => {
  const addedBy = doc.added_by !== undefined && doc.added_by !== null ? parseInt(doc.added_by) : undefined;
  
  if (parseInt(doc.form_id) === 290 && addedBy !== undefined && !Number.isNaN(addedBy)) {
    const filter = { form_id: 290, added_by: addedBy };
    const update = { $set: doc };
    const options = { upsert: true, new: true };
    return FormEntry.findOneAndUpdate(filter, update, options);
  }

  const hasKey = !!doc.record_unique_id && addedBy !== undefined && !Number.isNaN(addedBy);
  if (hasKey) {
    const filter = { record_unique_id: doc.record_unique_id, added_by: addedBy, form_id: doc.form_id };
    const update = { $set: doc };
    const options = { upsert: true, new: true };
    return FormEntry.findOneAndUpdate(filter, update, options);
  }
  const entry = new FormEntry(doc);
  return entry.save();
};

exports.createEntry = async (data) => {
  if (Array.isArray(data)) {
    return Promise.all(data.map((d) => upsertOne(d)));
  }
  return upsertOne(data);
};

exports.findByFilter = (filter) => {
  return FormEntry.find(filter).sort({ created_dt: -1 });
};
