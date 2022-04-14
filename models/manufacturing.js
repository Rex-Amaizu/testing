const Joi = require('joi');
const mongoose = require('mongoose');

const manufacturingSchema = new mongoose.Schema({
  invoice_number: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  delivery_address: {
    type: String,
    required: true
  }
});

const Manufacturing = mongoose.model('Manufacturing', manufacturingSchema);

function validateManufacturing(Manufacturing) {
    const schema = Joi.object({
      invoice_number: Joi.number().min(1).max(1000000).required(),
      quantity: Joi.number().min(1).max(2000).required(),
      delivery_address: Joi.string().min(5).max(255).required()
    });
  
    return schema.validate(Manufacturing);
  }

exports.Manufacturing = Manufacturing; 
exports.validate = validateManufacturing;