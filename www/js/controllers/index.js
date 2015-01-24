
var module = angular.module("controllers", ["services"]);

module.controller('DashCtrl', require('./DashCtrl'));
module.controller('ChatsCtrl', require('./ChatsCtrl'));
module.controller('ChatDetailCtrl', require('./ChatDetailCtrl'));
module.controller('FriendsCtrl', require('./FriendsCtrl'));
module.controller('FriendDetailCtrl', require('./FriendDetailCtrl'));
module.controller('AccountCtrl', require('./AccountCtrl'));