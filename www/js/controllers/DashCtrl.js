var DashCtrl = function($scope, $http, $location, $window) {

	// Simple POST request example (passing data) :

	var getTodos = function() {
		$http.get('https://result-estimator.herokuapp.com/todos/get').
		  success(function(data, status, headers, config) {
		  	console.log(data)
		    $scope.todos = data.data
				//http://maps.googleapis.com/maps/api/geocode/json?latlng=48.0,22.03553838&sensor=true
				angular.forEach($scope.todos, function(todo){
					todo.address;
					$http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+todo.latitude+','+todo.longitude+'&sensor=true').
						success(function(data, status, headers, config) {
							todo.address = data.results[0].formatted_address;
						}).
						error(function(data, status, headers, config) {
							console.log(data)
						});
				});

		 }).
		 error(function(data, status, headers, config) {
		});

	}



	$scope.deleteTodo = function(todoId) {
		$http.post('https://result-estimator.herokuapp.com/todos/delete', {todos_id: todoId}).
		  success(function(data, status, headers, config) {
		  	getTodos()
		 }).
		 error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	getTodos()

}

module.exports = DashCtrl