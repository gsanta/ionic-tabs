
var FriendsCtrl = function($scope) {

    $scope.data = {
        radius: 0
    };

    $scope.setMission = function(rad) {
        if(rad===undefined){
            rad=$scope.data.radius;
        }
        console.log(rad);
    }

}

module.exports = FriendsCtrl