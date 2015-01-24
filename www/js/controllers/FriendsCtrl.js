
var FriendsCtrl = function($scope, Friends) {
  $scope.friends = Friends.all();
}

module.exports = FriendsCtrl