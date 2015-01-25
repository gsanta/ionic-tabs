var DashCtrl = function($scope, $http) {

	var todoList = [ 
	  	{
	  		title: "first todo",
	  		content: "first todo content",
	  		date: new Date()
	  	},
	  	{
	  		title: "second todo",
	  		content: "second todo content",
	  		date: new Date()
	  	}
	]

	// Simple POST request example (passing data) :
	$http.post('https://result-estimator.herokuapp.com/sedcup/add', {msg:todoList}).
	  success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.todos = data.body.msg;
	    //$scope.todos = 
	 }).
	 error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});


}

module.exports = DashCtrl