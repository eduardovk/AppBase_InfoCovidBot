const express = require('express');
var bodyParser = require('body-parser');

const app = express();

const routes = require('./routes');

app.use(bodyParser.json());
app.use('/', routes);

module.exports = app;