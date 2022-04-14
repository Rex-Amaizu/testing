const validateObjectId = require('../middleware/validateObjectId');
const {Agriculture, validate} = require('../models/agriculture');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//route fetch all agriculture transactions from database.
router.get('/', async (req, res) => {
     const agricultures = await Agriculture.find();
     res.send(agricultures);
 });

// route to save a agriculture transaction to database.
router.post('/', async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // defining the request parameters.
    const crop_name = req.body.crop_name;
    const botanical_name = req.body.botanical_name;
    const germination_period = req.body.germination_period;

    // checking if crop name already exists.
    let cropN = await Agriculture.findOne({ crop_name: crop_name });
    if (cropN) return res.status(400).send('This Crop Name already Exist!.');
    
    // initiating and saving the crop details to the aggriculture table.
    const agriculture = await new Agriculture({ 
      crop_name: crop_name,
      botanical_name: botanical_name,
      germination_period: germination_period
    });
    await agriculture.save();
    
    // returning the response with the saved crop details.
    res.json({success : "Crop details Registered successfully", 
    crop_name: agriculture.crop_name, 
    botanical_name: agriculture.botanical_name, 
    germination_period: agriculture.germination_period
    });
});

module.exports = router;