var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between 3 and 50 characters'
  })

];

var CustomerSchema = new mongoose.Schema({
  name: {type: String, required: true, validate: nameValidator},
  created_at: Date
});

mongoose.model('Customer', CustomerSchema);
