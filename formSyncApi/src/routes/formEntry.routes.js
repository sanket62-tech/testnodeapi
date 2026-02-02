const express = require('express');
const router = express.Router();
const controller = require('../controllers/formEntry.controller');

router.post('/form-entry', controller.createFormEntry);
router.post('/form-entries/filter', controller.filterFormEntries);

module.exports = router;
