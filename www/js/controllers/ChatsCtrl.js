
var ChatsCtrl = function($scope, $http, $location) {
  
  $scope.todo = {}

  $scope.sendToServer = function() {


	  navigator.geolocation.getCurrentPosition(
	      function(position) {
	          	console.log("new"+position.coords.latitude + ',' + position.coords.longitude);
	            $scope.todo.latitude = position.coords.latitude;
	            $scope.todo.longitude = position.coords.longitude;

	          	$http.post('https://result-estimator.herokuapp.com/todos/add', $scope.todo).
				  success(function(data, status, headers, config) {
				    $location.path('/');
						$window.location.reload();
				 }).
				 error(function(data, status, headers, config) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
	      },
	      function() {
	          alert('Error getting location');
	      }, {timeout: 15000, enableHighAccuracy: false});
  	
  }

    /*
        start = {
            latitude: x
            longitude: y
        }
     goal = {
        latitude: x
        longitude: y
     }
     */
    window.getDiff = function(start, goal) {


        navigator.geolocation.getCurrentPosition(
            function(position) {
                console.log("new"+position.coords.latitude + ',' + position.coords.longitude);

                var current = {
                    latitude: position.coords.latitude,
                    longitude:position.coords.longitude
                }

                var fulldiff= getdifcoord(start, goal)*(3/2);
                var currentdif = getdifcoord(current, goal);
                var koz = fulldiff-currentdif;

                console.log(koz/fulldiff);
                return koz/fulldiff;

            },
            function() {
                alert('Error getting location');
            }, {timeout: 15000, enableHighAccuracy: false});

    }

    var getdifcoord = function(a, b){
        if (typeof(Number.prototype.toRad) === "undefined") {
            Number.prototype.toRad = function() {
                return this * Math.PI / 180;
            }
        }
        var lat1 = a.latitude;
        var lon1 =a.longitude;
        var lat2 = b.latitude;
        var lon2 =b.longitude;
        var R = 6371; // km
        var φ1 = lat1.toRad();
        var φ2 = lat2.toRad();
        var Δφ = (lat2-lat1).toRad();
        var Δλ = (lon2-lon1).toRad();

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

       return R * c;
    }

}

module.exports = ChatsCtrl