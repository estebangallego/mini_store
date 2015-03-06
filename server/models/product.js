var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 50],
    message: 'Name should be between 3 and 50 characters'
  })

];

var ProductSchema = new mongoose.Schema({
	product_name: {type: String, required: true, validate: nameValidator},
	product_image: String,
	product_description: {type: String, required: true, validate: nameValidator},
	product_qty: {type: Number, required: true, validate: nameValidator}
});

mongoose.model('Product', ProductSchema);