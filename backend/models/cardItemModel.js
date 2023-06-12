const mongoose = require('mongoose');

const cardItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  price: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  count: {
    type: Number,
    default: 1,
    min : 1,
    max : 5
  },
});

const CardItem = mongoose.model('CardItem', cardItemSchema);

module.exports = CardItem;