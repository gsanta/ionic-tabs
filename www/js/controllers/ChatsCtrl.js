
var ChatsCtrl = function($scope, Chats, $http) {
  
  $scope.todo = {}

  $scope.sendToServer = function() {
  	$http.post('https://result-estimator.herokuapp.com/todos/add', $scope.todo).
	  success(function(data, status, headers, config) {
	    console.log(data)
	 }).
	 error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});
  }
}

module.exports = ChatsCtrl