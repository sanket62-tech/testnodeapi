const express = require('express');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/formEntry.routes');

const app = express();
app.use(bodyParser.json());

app.use('/api', formRoutes);

module.exports = app;
