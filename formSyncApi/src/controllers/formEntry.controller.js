const service = require('../services/formEntry.service');

exports.createFormEntry = async (req, res) => {
  try {
    let data = req.body;
    
    // Check if data is an object looking like an array (numeric keys)
    if (!Array.isArray(data) && typeof data === 'object' && data !== null) {
      const keys = Object.keys(data);
      if (keys.length > 0 && keys.every(k => !isNaN(parseInt(k)))) {
         data = Object.values(data);
      }
    }

    const saved = await service.saveFormEntry(data);
    
    if (Array.isArray(saved)) {
      return res.status(201).json({
        success: true,
        message: 'Form entries saved successfully',
        count: saved.length,
        ids: saved.map(s => s._id),
        record_unique_ids: saved.map(s => s.record_unique_id)
      });
    }

    res.status(201).json({
        success: true,
        message: 'Form entry saved successfully',
        mongoId: saved._id,
        record_unique_id: saved.record_unique_id
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.filterFormEntries = async (req, res) => {
  try {
    const data = await service.getEntriesByUser(req.body);

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No entries founds',
        count: 0
      });
    }

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
