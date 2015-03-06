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
    .when('/products',{
    templateUrl: 'partials/products.html'
    })
    .when('/', {
        templateUrl: 'partials/dashboard.html'
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
    var products = [];
    
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
        $http.get('/get_products').success(function(products){
            callback(products);
            console.log(products);    
        })
        
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
            console.log(data);
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
// products factory
store_app.factory('product_factory', function($http) 
{
    var factory = {};
    var new_product = [];


    factory.get_products = function(callback)
    {
        // console.log('hi');
        $http.get('/get_products').success(function(output){
            callback(output);
            // console.log('in factory', output);
        })
    }

    factory.add_product = function(new_product)
    {
        $http.post('/add_product', new_product).success(function()
        {

        })
    }

  return factory;
});

//products controller
store_app.controller('productsController', function ($scope, product_factory) 
{   
    $scope.hi_message = 'hello world';

    function get_products(){
    product_factory.get_products(function (data)
        {
            $scope.products = data;

            // console.log(data);         
        })
    } 
    get_products(); 
   

    $scope.add_product = function(new_product)
    {
        product_factory.add_product(new_product);
        get_products();
        // $scope.new_product = null;

    }
});

//dashboard factory 
store_app.factory('dashboard_factory', function($http) 
{
    var factory = {};
    var products = [];
    var orders = [];
    var customers = [{name: 'hi'}];
    

    factory.get_products_dash = function (callback)
    {
        callback(products);
         // console.log(products);
        $http.get('/get_products').success(function(products){
            callback(products);
            // console.log('factory', products);    
        })
        
    }

    factory.get_orders = function (callback)
    {
        $http.get('/get_orders').success(function(orders){
            callback(orders);    
        })  
    }

    factory.get_customers = function (callback)
    {
        $http.get('/get_customers').success(function(customers){
            callback(customers);    
        })
        
    }


  return factory;
});


// dashboard controller
store_app.controller('dashboard', function ($scope, dashboard_factory){
    $scope.hi = 'hello world';
    
    dashboard_factory.get_products_dash(function (callback)
    {
        $scope.products = callback;
        // console.log(callback);         
    })
    
    dashboard_factory.get_orders(function (callback){
        $scope.orders = callback;
        // console.log(callback);
    })

    dashboard_factory.get_customers(function (callback){
        $scope.customers = callback;
        console.log(callback);
    })

});
