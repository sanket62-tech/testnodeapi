// ================================
// 1️⃣ Import required packages
// ================================
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// ================================
// 2️⃣ Initialize Express app
// ================================
const app = express();
app.use(bodyParser.json());

// ================================
// 3️⃣ Connect to MongoDB
// ================================
mongoose.connect('mongodb://localhost:27017/formSyncDB')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// ================================
// 4️⃣ Mongoose Schema
// ================================
const formEntrySchema = new mongoose.Schema({
  entry_id: Number,
  formId: { type: Number, required: true },
  category_id: Number,
  case_struct_id: Number,
  case_id: Number,
  case_temp_id: String,
  form_json: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  app_version: String,
  form_version: mongoose.Schema.Types.Mixed,
  device_id: String,
  mmu_unit_id: String,
  record_unique_id: String,
  record_case_unique_id: String,
  remote_record: { type: Number, default: 0 },
  added_by: Number,
  added_on: String,
  is_synced: { type: Number, default: 0 },
  synced_at: Date,
  remote_form_id: Number,
  status: { type: Number, default: 1 },
  isactive: { type: Number, default: 1 },
  created_by: String,
  created_dt: { type: Date, default: Date.now }
}, {
  timestamps: true,
  strict: false
});

const FormEntry = mongoose.model('form_entries', formEntrySchema);

// ================================
// 5️⃣ POST API – Save Form Entry
// ================================
app.post('/api/form-entry', async (req, res) => {
  try {
    const entry = new FormEntry(req.body);
    const savedEntry = await entry.save();

    res.status(201).json({
      success: true,
      message: 'Form entry saved successfully',
      mongoId: savedEntry._id,
      entry_id: savedEntry.entry_id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving form entry',
      error: error.message
    });
  }
});

// ================================
// 6️⃣ POST API – Filter by created_by or added_by
// ================================
app.post('/api/form-entries/filter', async (req, res) => {
  try {
    const { created_by, added_by } = req.body;
    
    let filter = {};
    
    if (created_by) {
      filter.created_by = created_by;
    }
    
    if (added_by) {
      filter.added_by = parseInt(added_by);
    }
    
    if (Object.keys(filter).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either created_by or added_by in request body'
      });
    }
    
    const entries = await FormEntry.find(filter).sort({ created_dt: -1 });
    
    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching form entries',
      error: error.message
    });
  }
});

// ================================
// 7️⃣ Start Server
// ================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});