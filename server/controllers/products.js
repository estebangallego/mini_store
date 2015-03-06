var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = (function() {
	return {
		add_product: function (req, res)
		{
			console.log('controller', req.body);
			var products = new Product(req.body);
			products.save(function(err, result){
					if (err)
					{
						console.log('err', err);
						res.json({error: "Something went wrong"});	
					}
					else
					{
						// console.log('we made it!');
						res.json(result);
						//DON'T FORGET THIS LINE
					}
				})		

		},
		get_products: function (req, res)
		{
			Product.find({}, function(err, results)
			{
				if(err){
					// console.log(err);

				}else{
					// console.log(results);
					res.json(results);
					//INPORTANT
				}
			})
		}

	}
})();
