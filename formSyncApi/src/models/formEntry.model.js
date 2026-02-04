const mongoose = require('mongoose');

const formEntrySchema = new mongoose.Schema(
  {
    entry_id: Number,
    form_id: { type: Number, required: true },
    category_id: Number,
    case_struct_id: Number,
    case_id: Number,
    case_temp_id: String,
    form_json: { type: mongoose.Schema.Types.Mixed, default: {} },
    app_version: String,
    form_version: mongoose.Schema.Types.Mixed,
    device_id: String,
    mmu_unit_id: String,
    record_unique_id: String,
    record_case_unique_id: String,
    remote_record: { type: Number, default: 0 },
    added_by: Number,
    added_on: String,
    is_synced: { type: Number, default: 1, immutable: true, set: () => 1 },
    synced_at: Date,
    remote_form_id: Number,
    status: { type: Number, default: 1 },
    isactive: { type: Number, default: 1 },
    created_by: String,
    created_dt: String 
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model('form_entries', formEntrySchema);
