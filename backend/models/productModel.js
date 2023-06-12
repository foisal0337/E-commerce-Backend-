const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 2000,
  },
  price: {
    type: Number,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required : true
  },
  quantity: {
    type: Number,
  },
  photo: {
    type: String,
  },
});

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255),
    description: Joi.string().min(10).max(2000),
    price: Joi.number().min(0),
    category: Joi.string(),
    quantity: Joi.number(),
    photo: Joi.string(),
  });

  return schema.validate(product);
};

const Product = mongoose.model('Product', productSchema);

module.exports = {
  Product,
  validateProduct,
};