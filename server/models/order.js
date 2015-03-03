var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
  customer: String,
  qty: Number,
  product: String,
  created_at: Date
});

mongoose.model('Order', OrderSchema);