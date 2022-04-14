const Joi = require('joi');
const mongoose = require('mongoose');

const agricultureSchema = new mongoose.Schema({
  crop_name: {
    type: String,
    required: true
  },
  botanical_name: {
    type: String,
    required: true
  },
  germination_period: {
    type: String,
    required: true
  }
});

const Agriculture = mongoose.model('Agriculture', agricultureSchema);

function validateAgriculture(Agriculture) {
    const schema = Joi.object({
      crop_name: Joi.string().min(2).max(25).required(),
      botanical_name: Joi.string().min(2).max(25).required(),
      germination_period: Joi.string().min(2).max(25).required()
    });
  
    return schema.validate(Agriculture);
  }

exports.Agriculture = Agriculture; 
exports.validate = validateAgriculture;