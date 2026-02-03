const service = require('../services/formEntry.service');

exports.createFormEntry = async (req, res) => {
  try {
    const saved = await service.saveFormEntry(req.body);
    res.status(201).json({
      success: true,
      message: 'Form entry saved successfully',
      mongoId: saved._id,
      entry_id: saved.entry_id
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
