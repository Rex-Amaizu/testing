const validateObjectId = require('../middleware/validateObjectId');
const {Manufacturing, validate} = require('../models/manufacturing');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//route fetch all manufacturing transactions from database.
router.get('/', async (req, res) => {
     const manufacturings = await Manufacturing.find();
     res.send(manufacturings);
 });

// route to save a manufacturing transaction to database.
router.post('/', async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // defining the request parameters.
    const invoice_number = req.body.invoice_number;
    const quantity = req.body.quantity;
    const delivery_address = req.body.delivery_address;

    // checking if invoice_number already exists.
    let invoiceN = await Manufacturing.findOne({ invoice_number: invoice_number });
    if (invoiceN) return res.status(400).send('This Invoice Number already Exist! Generate Another Invoice Number to save this transaction.');
    
    // initiating and saving the transaction to the manufacturing table.
    const manufacturing = await new Manufacturing({ 
      invoice_number: invoice_number,
      quantity: quantity,
      delivery_address: delivery_address
    });
    await manufacturing.save();
    
    // returning the response with the saved transaction.
    res.json({success : "Transaction Registered successfully", 
    invoice_number: manufacturing.invoice_number, 
    quantity: manufacturing.quantity, 
    delivery_address: manufacturing.delivery_address
    });
});

module.exports = router;