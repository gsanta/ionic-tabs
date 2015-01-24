angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  console.log("haho")
  $http.post('https://result-estimator.herokuapp.com/sedcup/add', {kurva: 'kurvaAdat'}).success(function(data) {
      console.log(data.data)
  })
  .error(function(data){
    console.log(data)   
  });

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
