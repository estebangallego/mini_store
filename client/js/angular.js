// inject the ngRoute dependency in the module.
var store_app = angular.module('store_app', ['ngRoute']);

//  use the config method to set up routing:
store_app.config(function ($routeProvider) {
  $routeProvider
    .when('/customers',{
        templateUrl: 'partials/customers.html'
    })
    .when('/orders',{
        templateUrl: 'partials/orders.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

// Customer factory
store_app.factory('customerFactory', function($http) 
{
	var factory = {};
    var customers = [];
    

    factory.addCustomer = function (data, callback)
    {

        data.created_at = new Date();

   	 	$http.post('/addcustomer', data).success(function(output)
   	 	{
   	 		// console.log('factory', output);
   	 		callback(output);

    	})
    }

    factory.getCustomers = function (callback){
    	$http.get('/get_customers').success(function(output)
    	{
			callback(output);
    	})
    	
    	// console.log('factory', customers);
    }

    factory.removeCustomer = function (data){
    	// console.log('made it to factory', data);
    	$http.post('/delete_customer', data).success(function(){
    		

    	})
    }

  return factory;
});

// Customers controller
store_app.controller('customersController', function ($scope, customerFactory) {
	
	
	$scope.customers = [];

	function getcustomers(){
		customerFactory.getCustomers(function (data){
        	$scope.customers = data;
    	})

    }
    getcustomers();

    
   
   	// console.log($scope.newCustomer.name);

    $scope.addCustomer = function (data, callback){
    	

    	customerFactory.addCustomer($scope.newCustomer, function (data){
    		// console.log('Add Customer Controller:', data.err);
    		$scope.err = data.err;
    		$scope.newCustomer = null;
			getcustomers();
    	});	
		
	}

	$scope.removeCustomer = function(customer){
		// console.log('controller', customer);
        $scope.customers.splice($scope.customers.indexOf(customer), 1);
        customerFactory.removeCustomer(customer);

    }


});

// Orders factory
store_app.factory('orders_factory', function($http) 
{
    var factory = {};
    var customers = [];
    var products = [{ name: 'Dojo t-shirt'}, { name: 'Dojo jeans'}, { name: 'Dojo hat'}];
    
    factory.get_orders = function(callback)
    {

        $http.get('/get_orders').success(function(output)
        {
            callback(output);
            // console.log(output);
        })
    }


    factory.getCustomers = function (callback)
    {
        $http.get('/get_customers').success(function(output)
        {
            callback(output);
        })
        
        // console.log('factory', customers);
    }

    factory.get_products = function (callback)
    {
        callback(products);
    }

    factory.add_order = function(new_order)
    {
        new_order.created_at = new Date();
        $http.post('/add_order', new_order).success(function()
        {
           
        });
        // console.log('in factory', new_order);
    }

    factory.remove_order = function (callback){
        console.log('made it to factory', callback);
        $http.post('/remove_order', callback).success(function(){
            
        })
    }



  return factory;
});


//Orders controller
store_app.controller('ordersController', function ($scope, orders_factory) 
{
    $scope.new_order = {};


    function get_orders(){
    orders_factory.get_orders(function (data)
        {
            $scope.orders = data;
            // console.log(data);
        })
    }
    get_orders();

    orders_factory.getCustomers(function (data)
    {
        $scope.customers = data;
        // console.log(data);
    })

    orders_factory.get_products(function (callback)
    {
        $scope.products = callback;
        // console.log(callback);
    })



    $scope.add_order = function (new_order)
    {
        orders_factory.add_order(new_order);
        get_orders();
        // orders_factory.add_order($scope.add_product);
        // console.log('made it to controller', new_order);     
    }

    $scope.remove_order = function(callback){
        console.log('controller', callback);
        // $scope.customers.splice($scope.customers.indexOf(customer), 1);
        orders_factory.remove_order(callback);
        get_orders();

    }


});
