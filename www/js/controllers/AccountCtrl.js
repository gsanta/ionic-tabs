
var AccountCtrl = function($scope) {
  $scope.settings = {
    enableFriends: true
  };

    var mapProp = {
	    center:new google.maps.LatLng(51.508742,-0.120850),
	    zoom:5,
	    mapTypeId:google.maps.MapTypeId.ROADMAP
	  };

  	$scope.initMap = function() {

	    $scope.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
		google.maps.event.addListener($scope.map, 'click', function(event) {
		    console.log(event.latLng);
		      var marker = new google.maps.Marker({
			      position: event.latLng,
			      map: $scope.map,
			      title: 'Hello World!'
			  });
		});

		$scope.destLat = event.latLng.D 
		$scope.destLon = event.latLng.k 
  };
}

module.exports = AccountCtrl