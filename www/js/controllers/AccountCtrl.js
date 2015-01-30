
var AccountCtrl = function($scope) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.marker = null;

    var mapProp = {
	    center:new google.maps.LatLng(51.508742,-0.120850),
	    zoom:5,
	    mapTypeId:google.maps.MapTypeId.ROADMAP
	  };

  	$scope.initMap = function() {

	    $scope.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
		google.maps.event.addListener($scope.map, 'mousedown', function(event) {
		    console.log(event.latLng);
		    if($scope.marker == null) {
		      $scope.marker = new google.maps.Marker({
			      position: event.latLng,
			      map: $scope.map,
			      title: 'Hello World!',
			      draggable:true,
			  });

			  	google.maps.event.addListener($scope.marker, 'dragend', function() 
				{
				    console.log({
				    	lat: $scope.marker.getPosition().lat(),
				    	lon: $scope.marker.getPosition().lng()
				    })
				});

		  	}
		})
  };
}

module.exports = AccountCtrl