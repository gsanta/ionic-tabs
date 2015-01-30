
var FriendsCtrl = function($scope, $location) {

    $scope.data = {
        radius: 0,
        startPos: {}
    };

    $scope.setMission = function(rad) {
        if(rad===undefined){
            rad=$scope.data.radius;
        }
        $scope.data.radius = rad;
        console.log(rad);

        initMission()
    }

    $scope.toMap = function() {
        console.log("lefdafsddf")
        $location.path('/tab/account');
    }

    var initMission = function() {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                console.log("new"+position.coords.latitude + ',' + position.coords.longitude);
                $scope.data.startPos.latitude = position.coords.latitude;
                $scope.data.startPos.longitude = position.coords.longitude;

                window.startPos = {
                    lat: $scope.data.startPos.latitude,
                    lon: $scope.data.startPos.longitude
                }
                window.destPos = generateRandomCoord($scope.data.startPos.latitude, $scope.data.startPos.longitude, $scope.data.radius);

                $location.path('/tab/dash');
            },
            function() {
                alert('Error getting location');
            }, {timeout: 15000, enableHighAccuracy: false});
    }

    var generateRandomCoord = function(lat, lon, radius) {
        var r = radius/111300 // = 100 meters
            , y0 = lat
            , x0 = lon
            , u = Math.random()
            , v = Math.random()
            , w = r * Math.sqrt(u)
            , t = 2 * Math.PI * v
            , x = w * Math.cos(t)
            , y1 = w * Math.sin(t)
            , x1 = x / Math.cos(y0)

        newY = y0 + y1
        newX = x0 + x1
        return {
            lat: newY,
            lon: newX
        }
    }

    window.generateCoord = generateRandomCoord;

}

module.exports = FriendsCtrl