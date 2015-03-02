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

// Factory
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

// controller
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


store_app.controller('ordersController', function ($scope) 
{
    $scope.customers = [];
    
    function get_customers()
    {
        orders_factory.get_customers(function (data)
        {

        })
    }

  $scope.message = 'We are using another controller';

});
