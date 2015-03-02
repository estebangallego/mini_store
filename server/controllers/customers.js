var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = (function() {
  return {

	addcustomer: function(req, res)
	{
		// console.log('server controller', req.body);
		
		// console.log(req.body.name);
		Customer.findOne({name: req.body.name}, function(err, results) 
		{
			// console.log(results);

			if (results)
			{
				res.json({err: "Duplicate name!"})
			} 
			else 
			{
				var customer = new Customer(req.body);
				customer.save(function(err, result){
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
				
			}
		})
	},
	get_customers: function(req, res)
	{

		Customer.find({}, function(err, results)
		{
			if(err){
				console.log(err);

			}else{
				// console.log(results);
				res.json(results);
				//INPORTANT
			}
		})
	},
	delete_customer: function(req, res)
	{
		console.log('wowooo! in S controllers: ', req.body._id);
		Customer.remove({_id: req.body._id}, function(err, results)
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