var DashCtrl = function($scope, $http) {

	// Simple POST request example (passing data) :
	$http.get('https://result-estimator.herokuapp.com/todos/get').
	  success(function(data, status, headers, config) {
	  	console.log(data)
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.todos = data.data
	    //$scope.todos = 
	 }).
	 error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});


}

module.exports = DashCtrl