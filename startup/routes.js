const express = require('express');
const manufacturings = require('../routes/manufacturings');
const constructions = require('../routes/constructions');
const agricultures = require('../routes/agricultures');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/manufacturings', manufacturings);
    app.use('/api/constructions', constructions);
    app.use('/api/agricultures', agricultures);

    app.use(error);
}