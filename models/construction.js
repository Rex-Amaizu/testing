const Joi = require('joi');
const mongoose = require('mongoose');

const constructionSchema = new mongoose.Schema({
  building_type: {
    type: String,
    required: true
  },
  foundation_type: {
    type: String,
    required: true
  },
  roofing_type: {
    type: String,
    required: true
  }
});

const Construction = mongoose.model('Construction', constructionSchema);

function validateConstruction(Construction) {
    const schema = Joi.object({
      building_type: Joi.string().min(5).max(25).required(),
      foundation_type: Joi.string().min(5).max(25).required(),
      roofing_type: Joi.string().min(5).max(25).required()
    });
  
    return schema.validate(Construction);
  }

exports.Construction = Construction; 
exports.validate = validateConstruction;