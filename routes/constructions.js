const validateObjectId = require('../middleware/validateObjectId');
const {Construction, validate} = require('../models/construction');
const mongoose = require('mongoose');
const express = require('express');
const { build } = require('joi');
const router = express.Router();

//route fetch all construction transactions from database.
router.get('/', async (req, res) => {
     const constructions = await Construction.find();
     res.send(constructions);
 });

// route to save a construction transaction to database.
router.post('/', async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // defining the request parameters.
    const building_type = req.body.building_type;
    const foundation_type = req.body.foundation_type;
    const roofing_type = req.body.roofing_type;
    
    // initiating and saving the construction details to the construction table.
    const construction = await new Construction({ 
      building_type: building_type,
      foundation_type: foundation_type,
      roofing_type: roofing_type
    });
    await construction.save();
    
    // returning the response with the saved construction details.
    res.json({success : "Construction detail Registered successfully", 
    building_type: construction.building_type, 
    foundation_type: construction.foundation_type, 
    roofing_type: construction.roofing_type
    });
});

module.exports = router;