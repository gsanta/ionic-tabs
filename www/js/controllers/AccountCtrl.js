
var AccountCtrl = function($scope, $location) {
  $scope.settings = {
    enableFriends: true
  };

    $scope.data = {
        radius: 0,
        startPos: {}
    };


    $scope.marker = null;

    var mapProp = {
	    center:new google.maps.LatLng(51.508742,-0.120850),
	    zoom:5,
	    mapTypeId:google.maps.MapTypeId.ROADMAP
	  };


    $scope.setMission = function() {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                console.log("new"+position.coords.latitude + ',' + position.coords.longitude);
                $scope.data.startPos.latitude = position.coords.latitude;
                $scope.data.startPos.longitude = position.coords.longitude;

                window.startPos = {
                    lat: $scope.data.startPos.latitude,
                    lon: $scope.data.startPos.longitude
                }
                window.destPos = $scope.customPos
                $location.path('/tab/dash');
            },
            function() {
                alert('Error getting location');
            }, {timeout: 15000, enableHighAccuracy: false});
    }

  	$scope.initMap = function() {

	    $scope.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
		google.maps.event.addListener($scope.map, 'mousedown', function(event) {
		    console.log(event.latLng);
		    if($scope.marker == null) {
		      $scope.marker = new google.maps.Marker({
			      position: event.latLng,
			      map: $scope.map,
			      title: 'Hello World!',
			      draggable:true
			  });

			  	google.maps.event.addListener($scope.marker, 'dragend', function() 
				{
				    $scope.customPos = {
				    	lat: $scope.marker.getPosition().lat(),
				    	lon: $scope.marker.getPosition().lng()
				    }
				});

		  	}
		})
  };
}

module.exports = AccountCtrl