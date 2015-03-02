var customers = require('./../server/controllers/customers.js');

module.exports = function(app) {

	app.post('/addcustomer', function(req, res){
		// console.log('made it to routes:', req.body);
		customers.addcustomer(req, res);
	});

	app.get('/get_customers', function(req, res)
	{
		customers.get_customers(req, res);
	})

	app.post('/delete_customer', function(req, res){
		console.log('wowooo! in routes: ', req.body);
		customers.delete_customer(req, res);
	})
}