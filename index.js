const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/validation')();
//require('./startup/config')();
require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 3001;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;