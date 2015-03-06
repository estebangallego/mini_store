var customers = require('./../server/controllers/customers.js');
var orders = require('./../server/controllers/orders.js');
var products = require('./../server/controllers/products.js');


module.exports = function(app) {

	app.post('/addcustomer', function (req, res)
	{
		// console.log('made it to routes:', req.body);
		customers.addcustomer(req, res);
	});

	app.get('/get_customers', function (req, res)
	{
		customers.get_customers(req, res);
	})

	app.post('/delete_customer', function (req, res)
	{
		// console.log('wowooo! in routes: ', req.body);
		customers.delete_customer(req, res);
	})

	app.post('/add_order', function (req, res)
	{
		// console.log('in routes', req.body);
		orders.add_order(req, res);

	})

	app.get('/get_orders', function (req, res)
	{
		orders.get_orders(req, res);

	})

	app.post('/remove_order', function (req, res)
	{
		orders.remove_order(req, res);
		// console.log('in routes', req.body);
	})

	app.post('/add_product', function (req, res)
	{
		products.add_product(req, res);
		// console.log('in routes', req.body);
	})

	app.get('/get_products', function (req, res)
	{
		products.get_products(req, res);
		// res.body = "hi";
		// console.log('blah');
	})

}