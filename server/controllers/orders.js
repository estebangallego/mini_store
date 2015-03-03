var mongoose = require('mongoose');
var Order = mongoose.model('Order');

module.exports = (function() {
  return {

  	remove_order: function (req, res)
  	{
  		// console.log('in S controller', req.body);
  		Order.remove({_id: req.body._id}, function(err, results)
		{
			if(err){
				console.log(err);
			}else{
				console.log('deleted', results);
				res.json(results);
				//INPORTANT
			}
		})
  		// Order.delete({})
  	},

	add_order: function(req, res)
	{
		// console.log('server controller', req.body);
		
		var orders = new Order(req.body);
		// console.log('hi', orders);
		orders.save(function(err, result){
			if (err)
			{
				console.log('err', err);
				res.json({error: "Something went wrong"});	
			}
			else
			{
				console.log('we made it!');
				res.json(result);
				//DON'T FORGET THIS LINE
			}
		})	

	},

	get_orders: function(req, res)
	{
		Order.find({}, function(err, results)
		{
			if(err){
				console.log(err);

			}else{
				// console.log(results);
				res.json(results);
				//INPORTANT
			}
		})
	}

  }
})();