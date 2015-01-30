(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./www/js/app.js":[function(require,module,exports){
require('./services');
require('./controllers');

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'controllers', 'services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

},{"./controllers":"/home/student/dev/ionic-tabs/www/js/controllers/index.js","./services":"/home/student/dev/ionic-tabs/www/js/services/index.js"}],"/home/student/dev/ionic-tabs/www/js/controllers/AccountCtrl.js":[function(require,module,exports){

var AccountCtrl = function($scope) {
  $scope.settings = {
    enableFriends: true
  };
}

module.exports = AccountCtrl
},{}],"/home/student/dev/ionic-tabs/www/js/controllers/ChatDetailCtrl.js":[function(require,module,exports){

var ChatDetailCtrl = function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}

module.exports = ChatDetailCtrl
},{}],"/home/student/dev/ionic-tabs/www/js/controllers/ChatsCtrl.js":[function(require,module,exports){

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
},{}],"/home/student/dev/ionic-tabs/www/js/controllers/DashCtrl.js":[function(require,module,exports){
var DashCtrl = function($scope, $http, $location, $window) {

	// Simple POST request example (passing data) :

	var getTodos = function() {
		$http.get('https://result-estimator.herokuapp.com/todos/get').
		  success(function(data, status, headers, config) {
		  	console.log(data)
		    $scope.todos = data.data
				//http://maps.googleapis.com/maps/api/geocode/json?latlng=48.0,22.03553838&sensor=true
				angular.forEach($scope.todos, function(todo){
					todo.address;
					$http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+todo.latitude+','+todo.longitude+'&sensor=true').
						success(function(data, status, headers, config) {
							todo.address = data.results[0].formatted_address;
						}).
						error(function(data, status, headers, config) {
							console.log(data)
						});
				});

		 }).
		 error(function(data, status, headers, config) {
		});

	}



	$scope.deleteTodo = function(todoId) {
		$http.post('https://result-estimator.herokuapp.com/todos/delete', {todos_id: todoId}).
		  success(function(data, status, headers, config) {
		  	getTodos()
		 }).
		 error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
	}

	getTodos()

}

module.exports = DashCtrl
},{}],"/home/student/dev/ionic-tabs/www/js/controllers/FriendDetailCtrl.js":[function(require,module,exports){

var FriendDetailCtrl = function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
}

module.exports = FriendDetailCtrl
},{}],"/home/student/dev/ionic-tabs/www/js/controllers/FriendsCtrl.js":[function(require,module,exports){

var FriendsCtrl = function($scope) {

    $scope.data = {};

    $scope.setMission = function(rad) {
        if(rad===undefined){
            rad=$scope.data.radius;
        }
        console.log(rad);
    }

}

module.exports = FriendsCtrl
},{}],"/home/student/dev/ionic-tabs/www/js/controllers/index.js":[function(require,module,exports){

var module = angular.module("controllers", ["services"]);

module.controller('DashCtrl', require('./DashCtrl'));
module.controller('ChatsCtrl', require('./ChatsCtrl'));
module.controller('ChatDetailCtrl', require('./ChatDetailCtrl'));
module.controller('FriendsCtrl', require('./FriendsCtrl'));
module.controller('FriendDetailCtrl', require('./FriendDetailCtrl'));
module.controller('AccountCtrl', require('./AccountCtrl'));
},{"./AccountCtrl":"/home/student/dev/ionic-tabs/www/js/controllers/AccountCtrl.js","./ChatDetailCtrl":"/home/student/dev/ionic-tabs/www/js/controllers/ChatDetailCtrl.js","./ChatsCtrl":"/home/student/dev/ionic-tabs/www/js/controllers/ChatsCtrl.js","./DashCtrl":"/home/student/dev/ionic-tabs/www/js/controllers/DashCtrl.js","./FriendDetailCtrl":"/home/student/dev/ionic-tabs/www/js/controllers/FriendDetailCtrl.js","./FriendsCtrl":"/home/student/dev/ionic-tabs/www/js/controllers/FriendsCtrl.js"}],"/home/student/dev/ionic-tabs/www/js/services/Chats.js":[function(require,module,exports){

var Chats = function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
}

module.exports = Chats
},{}],"/home/student/dev/ionic-tabs/www/js/services/Friends.js":[function(require,module,exports){

var Friends = function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
}

module.exports = Friends
},{}],"/home/student/dev/ionic-tabs/www/js/services/index.js":[function(require,module,exports){

var module = angular.module("services", []);

module.factory('Chats', require('./Chats'));
module.factory('Friends', require('./Friends'));

},{"./Chats":"/home/student/dev/ionic-tabs/www/js/services/Chats.js","./Friends":"/home/student/dev/ionic-tabs/www/js/services/Friends.js"}]},{},["./www/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ3d3cvanMvYXBwLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0FjY291bnRDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0NoYXREZXRhaWxDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0NoYXRzQ3RybC5qcyIsInd3dy9qcy9jb250cm9sbGVycy9EYXNoQ3RybC5qcyIsInd3dy9qcy9jb250cm9sbGVycy9GcmllbmREZXRhaWxDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0ZyaWVuZHNDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL2luZGV4LmpzIiwid3d3L2pzL3NlcnZpY2VzL0NoYXRzLmpzIiwid3d3L2pzL3NlcnZpY2VzL0ZyaWVuZHMuanMiLCJ3d3cvanMvc2VydmljZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL3NlcnZpY2VzJyk7XG5yZXF1aXJlKCcuL2NvbnRyb2xsZXJzJyk7XG5cbi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbi8vICdzdGFydGVyLnNlcnZpY2VzJyBpcyBmb3VuZCBpbiBzZXJ2aWNlcy5qc1xuLy8gJ3N0YXJ0ZXIuY29udHJvbGxlcnMnIGlzIGZvdW5kIGluIGNvbnRyb2xsZXJzLmpzXG5hbmd1bGFyLm1vZHVsZSgnc3RhcnRlcicsIFsnaW9uaWMnLCAnY29udHJvbGxlcnMnLCAnc2VydmljZXMnXSlcblxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuICAgIH1cbiAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgLy8gb3JnLmFwYWNoZS5jb3Jkb3ZhLnN0YXR1c2JhciByZXF1aXJlZFxuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59KVxuXG4uY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAvLyBJb25pYyB1c2VzIEFuZ3VsYXJVSSBSb3V0ZXIgd2hpY2ggdXNlcyB0aGUgY29uY2VwdCBvZiBzdGF0ZXNcbiAgLy8gTGVhcm4gbW9yZSBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci11aS91aS1yb3V0ZXJcbiAgLy8gU2V0IHVwIHRoZSB2YXJpb3VzIHN0YXRlcyB3aGljaCB0aGUgYXBwIGNhbiBiZSBpbi5cbiAgLy8gRWFjaCBzdGF0ZSdzIGNvbnRyb2xsZXIgY2FuIGJlIGZvdW5kIGluIGNvbnRyb2xsZXJzLmpzXG4gICRzdGF0ZVByb3ZpZGVyXG5cbiAgLy8gc2V0dXAgYW4gYWJzdHJhY3Qgc3RhdGUgZm9yIHRoZSB0YWJzIGRpcmVjdGl2ZVxuICAgIC5zdGF0ZSgndGFiJywge1xuICAgIHVybDogXCIvdGFiXCIsXG4gICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgdGVtcGxhdGVVcmw6IFwidGVtcGxhdGVzL3RhYnMuaHRtbFwiXG4gIH0pXG5cbiAgLy8gRWFjaCB0YWIgaGFzIGl0cyBvd24gbmF2IGhpc3Rvcnkgc3RhY2s6XG5cbiAgLnN0YXRlKCd0YWIuZGFzaCcsIHtcbiAgICB1cmw6ICcvZGFzaCcsXG4gICAgdmlld3M6IHtcbiAgICAgICd0YWItZGFzaCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFiLWRhc2guaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdEYXNoQ3RybCdcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgLnN0YXRlKCd0YWIuY2hhdHMnLCB7XG4gICAgICB1cmw6ICcvY2hhdHMnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ3RhYi1jaGF0cyc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItY2hhdHMuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0NoYXRzQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCd0YWIuY2hhdC1kZXRhaWwnLCB7XG4gICAgICB1cmw6ICcvY2hhdHMvOmNoYXRJZCcsXG4gICAgICB2aWV3czoge1xuICAgICAgICAndGFiLWNoYXRzJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2NoYXQtZGV0YWlsLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdDaGF0RGV0YWlsQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgLnN0YXRlKCd0YWIuZnJpZW5kcycsIHtcbiAgICAgIHVybDogJy9mcmllbmRzJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICd0YWItZnJpZW5kcyc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItZnJpZW5kcy5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnRnJpZW5kc0N0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIC5zdGF0ZSgndGFiLmZyaWVuZC1kZXRhaWwnLCB7XG4gICAgICB1cmw6ICcvZnJpZW5kLzpmcmllbmRJZCcsXG4gICAgICB2aWV3czoge1xuICAgICAgICAndGFiLWZyaWVuZHMnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvZnJpZW5kLWRldGFpbC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnRnJpZW5kRGV0YWlsQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgLnN0YXRlKCd0YWIuYWNjb3VudCcsIHtcbiAgICB1cmw6ICcvYWNjb3VudCcsXG4gICAgdmlld3M6IHtcbiAgICAgICd0YWItYWNjb3VudCc6IHtcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFiLWFjY291bnQuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdBY2NvdW50Q3RybCdcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vIGlmIG5vbmUgb2YgdGhlIGFib3ZlIHN0YXRlcyBhcmUgbWF0Y2hlZCwgdXNlIHRoaXMgYXMgdGhlIGZhbGxiYWNrXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy90YWIvZGFzaCcpO1xuXG59KTtcbiIsIlxudmFyIEFjY291bnRDdHJsID0gZnVuY3Rpb24oJHNjb3BlKSB7XG4gICRzY29wZS5zZXR0aW5ncyA9IHtcbiAgICBlbmFibGVGcmllbmRzOiB0cnVlXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQWNjb3VudEN0cmwiLCJcbnZhciBDaGF0RGV0YWlsQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBDaGF0cykge1xuICAkc2NvcGUuY2hhdCA9IENoYXRzLmdldCgkc3RhdGVQYXJhbXMuY2hhdElkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDaGF0RGV0YWlsQ3RybCIsIlxudmFyIENoYXRzQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbikge1xuICBcbiAgJHNjb3BlLnRvZG8gPSB7fVxuXG4gICRzY29wZS5zZW5kVG9TZXJ2ZXIgPSBmdW5jdGlvbigpIHtcblxuXG5cdCAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcblx0ICAgICAgZnVuY3Rpb24ocG9zaXRpb24pIHtcblx0ICAgICAgICAgIFx0Y29uc29sZS5sb2coXCJuZXdcIitwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcblx0ICAgICAgICAgICAgJHNjb3BlLnRvZG8ubGF0aXR1ZGUgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XG5cdCAgICAgICAgICAgICRzY29wZS50b2RvLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG5cblx0ICAgICAgICAgIFx0JGh0dHAucG9zdCgnaHR0cHM6Ly9yZXN1bHQtZXN0aW1hdG9yLmhlcm9rdWFwcC5jb20vdG9kb3MvYWRkJywgJHNjb3BlLnRvZG8pLlxuXHRcdFx0XHQgIHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHRcdFx0ICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG5cdFx0XHRcdFx0XHQkd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0XHQgfSkuXG5cdFx0XHRcdCBlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuXHRcdFx0XHQgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuXHRcdFx0XHQgICAgLy8gb3Igc2VydmVyIHJldHVybnMgcmVzcG9uc2Ugd2l0aCBhbiBlcnJvciBzdGF0dXMuXG5cdFx0XHRcdH0pO1xuXHQgICAgICB9LFxuXHQgICAgICBmdW5jdGlvbigpIHtcblx0ICAgICAgICAgIGFsZXJ0KCdFcnJvciBnZXR0aW5nIGxvY2F0aW9uJyk7XG5cdCAgICAgIH0sIHt0aW1lb3V0OiAxNTAwMCwgZW5hYmxlSGlnaEFjY3VyYWN5OiBmYWxzZX0pO1xuICBcdFxuICB9XG5cbiAgICAvKlxuICAgICAgICBzdGFydCA9IHtcbiAgICAgICAgICAgIGxhdGl0dWRlOiB4XG4gICAgICAgICAgICBsb25naXR1ZGU6IHlcbiAgICAgICAgfVxuICAgICBnb2FsID0ge1xuICAgICAgICBsYXRpdHVkZTogeFxuICAgICAgICBsb25naXR1ZGU6IHlcbiAgICAgfVxuICAgICAqL1xuICAgIHdpbmRvdy5nZXREaWZmID0gZnVuY3Rpb24oc3RhcnQsIGdvYWwpIHtcblxuXG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXG4gICAgICAgICAgICBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3XCIrcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgJywnICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcbiAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOnBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZnVsbGRpZmY9IGdldGRpZmNvb3JkKHN0YXJ0LCBnb2FsKSooMy8yKTtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudGRpZiA9IGdldGRpZmNvb3JkKGN1cnJlbnQsIGdvYWwpO1xuICAgICAgICAgICAgICAgIHZhciBrb3ogPSBmdWxsZGlmZi1jdXJyZW50ZGlmO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coa296L2Z1bGxkaWZmKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ga296L2Z1bGxkaWZmO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yIGdldHRpbmcgbG9jYXRpb24nKTtcbiAgICAgICAgICAgIH0sIHt0aW1lb3V0OiAxNTAwMCwgZW5hYmxlSGlnaEFjY3VyYWN5OiBmYWxzZX0pO1xuXG4gICAgfVxuXG4gICAgdmFyIGdldGRpZmNvb3JkID0gZnVuY3Rpb24oYSwgYil7XG4gICAgICAgIGlmICh0eXBlb2YoTnVtYmVyLnByb3RvdHlwZS50b1JhZCkgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIE51bWJlci5wcm90b3R5cGUudG9SYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcyAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxhdDEgPSBhLmxhdGl0dWRlO1xuICAgICAgICB2YXIgbG9uMSA9YS5sb25naXR1ZGU7XG4gICAgICAgIHZhciBsYXQyID0gYi5sYXRpdHVkZTtcbiAgICAgICAgdmFyIGxvbjIgPWIubG9uZ2l0dWRlO1xuICAgICAgICB2YXIgUiA9IDYzNzE7IC8vIGttXG4gICAgICAgIHZhciDPhjEgPSBsYXQxLnRvUmFkKCk7XG4gICAgICAgIHZhciDPhjIgPSBsYXQyLnRvUmFkKCk7XG4gICAgICAgIHZhciDOlM+GID0gKGxhdDItbGF0MSkudG9SYWQoKTtcbiAgICAgICAgdmFyIM6UzrsgPSAobG9uMi1sb24xKS50b1JhZCgpO1xuXG4gICAgICAgIHZhciBhID0gTWF0aC5zaW4ozpTPhi8yKSAqIE1hdGguc2luKM6Uz4YvMikgK1xuICAgICAgICAgICAgTWF0aC5jb3Moz4YxKSAqIE1hdGguY29zKM+GMikgKlxuICAgICAgICAgICAgTWF0aC5zaW4ozpTOuy8yKSAqIE1hdGguc2luKM6UzrsvMik7XG4gICAgICAgIHZhciBjID0gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGEpLCBNYXRoLnNxcnQoMS1hKSk7XG5cbiAgICAgICByZXR1cm4gUiAqIGM7XG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhdHNDdHJsIiwidmFyIERhc2hDdHJsID0gZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uLCAkd2luZG93KSB7XG5cblx0Ly8gU2ltcGxlIFBPU1QgcmVxdWVzdCBleGFtcGxlIChwYXNzaW5nIGRhdGEpIDpcblxuXHR2YXIgZ2V0VG9kb3MgPSBmdW5jdGlvbigpIHtcblx0XHQkaHR0cC5nZXQoJ2h0dHBzOi8vcmVzdWx0LWVzdGltYXRvci5oZXJva3VhcHAuY29tL3RvZG9zL2dldCcpLlxuXHRcdCAgc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuXHRcdCAgXHRjb25zb2xlLmxvZyhkYXRhKVxuXHRcdCAgICAkc2NvcGUudG9kb3MgPSBkYXRhLmRhdGFcblx0XHRcdFx0Ly9odHRwOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/bGF0bG5nPTQ4LjAsMjIuMDM1NTM4Mzgmc2Vuc29yPXRydWVcblx0XHRcdFx0YW5ndWxhci5mb3JFYWNoKCRzY29wZS50b2RvcywgZnVuY3Rpb24odG9kbyl7XG5cdFx0XHRcdFx0dG9kby5hZGRyZXNzO1xuXHRcdFx0XHRcdCRodHRwLmdldCgnaHR0cDovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2xhdGxuZz0nK3RvZG8ubGF0aXR1ZGUrJywnK3RvZG8ubG9uZ2l0dWRlKycmc2Vuc29yPXRydWUnKS5cblx0XHRcdFx0XHRcdHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHRcdFx0XHRcdFx0dG9kby5hZGRyZXNzID0gZGF0YS5yZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzO1xuXHRcdFx0XHRcdFx0fSkuXG5cdFx0XHRcdFx0XHRlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0IH0pLlxuXHRcdCBlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuXHRcdH0pO1xuXG5cdH1cblxuXG5cblx0JHNjb3BlLmRlbGV0ZVRvZG8gPSBmdW5jdGlvbih0b2RvSWQpIHtcblx0XHQkaHR0cC5wb3N0KCdodHRwczovL3Jlc3VsdC1lc3RpbWF0b3IuaGVyb2t1YXBwLmNvbS90b2Rvcy9kZWxldGUnLCB7dG9kb3NfaWQ6IHRvZG9JZH0pLlxuXHRcdCAgc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuXHRcdCAgXHRnZXRUb2RvcygpXG5cdFx0IH0pLlxuXHRcdCBlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuXHRcdCAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXG5cdFx0ICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0VG9kb3MoKVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGFzaEN0cmwiLCJcbnZhciBGcmllbmREZXRhaWxDdHJsID0gZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIEZyaWVuZHMpIHtcbiAgJHNjb3BlLmZyaWVuZCA9IEZyaWVuZHMuZ2V0KCRzdGF0ZVBhcmFtcy5mcmllbmRJZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRnJpZW5kRGV0YWlsQ3RybCIsIlxudmFyIEZyaWVuZHNDdHJsID0gZnVuY3Rpb24oJHNjb3BlKSB7XG5cbiAgICAkc2NvcGUuZGF0YSA9IHt9O1xuXG4gICAgJHNjb3BlLnNldE1pc3Npb24gPSBmdW5jdGlvbihyYWQpIHtcbiAgICAgICAgaWYocmFkPT09dW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJhZD0kc2NvcGUuZGF0YS5yYWRpdXM7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocmFkKTtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmRzQ3RybCIsIlxudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKFwiY29udHJvbGxlcnNcIiwgW1wic2VydmljZXNcIl0pO1xuXG5tb2R1bGUuY29udHJvbGxlcignRGFzaEN0cmwnLCByZXF1aXJlKCcuL0Rhc2hDdHJsJykpO1xubW9kdWxlLmNvbnRyb2xsZXIoJ0NoYXRzQ3RybCcsIHJlcXVpcmUoJy4vQ2hhdHNDdHJsJykpO1xubW9kdWxlLmNvbnRyb2xsZXIoJ0NoYXREZXRhaWxDdHJsJywgcmVxdWlyZSgnLi9DaGF0RGV0YWlsQ3RybCcpKTtcbm1vZHVsZS5jb250cm9sbGVyKCdGcmllbmRzQ3RybCcsIHJlcXVpcmUoJy4vRnJpZW5kc0N0cmwnKSk7XG5tb2R1bGUuY29udHJvbGxlcignRnJpZW5kRGV0YWlsQ3RybCcsIHJlcXVpcmUoJy4vRnJpZW5kRGV0YWlsQ3RybCcpKTtcbm1vZHVsZS5jb250cm9sbGVyKCdBY2NvdW50Q3RybCcsIHJlcXVpcmUoJy4vQWNjb3VudEN0cmwnKSk7IiwiXG52YXIgQ2hhdHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gTWlnaHQgdXNlIGEgcmVzb3VyY2UgaGVyZSB0aGF0IHJldHVybnMgYSBKU09OIGFycmF5XG5cbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxuICB2YXIgY2hhdHMgPSBbe1xuICAgIGlkOiAwLFxuICAgIG5hbWU6ICdCZW4gU3BhcnJvdycsXG4gICAgbGFzdFRleHQ6ICdZb3Ugb24geW91ciB3YXk/JyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzUxNDU0OTgxMTc2NTIxMTEzNi85U2dBdUhlWS5wbmcnXG4gIH0sIHtcbiAgICBpZDogMSxcbiAgICBuYW1lOiAnTWF4IEx5bngnLFxuICAgIGxhc3RUZXh0OiAnSGV5LCBpdFxcJ3MgbWUnLFxuICAgIGZhY2U6ICdodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzExMjE0P3Y9MyZzPTQ2MCdcbiAgfSwge1xuICAgIGlkOiAyLFxuICAgIG5hbWU6ICdBbmRyZXcgSm9zdGxpbicsXG4gICAgbGFzdFRleHQ6ICdEaWQgeW91IGdldCB0aGUgaWNlIGNyZWFtPycsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTEyNzQzNzgxODE0ODg2NDAvVHRpMGZGVkouanBlZydcbiAgfSwge1xuICAgIGlkOiAzLFxuICAgIG5hbWU6ICdBZGFtIEJyYWRsZXlzb24nLFxuICAgIGxhc3RUZXh0OiAnSSBzaG91bGQgYnV5IGEgYm9hdCcsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80NzkwOTA3OTQwNTgzNzkyNjQvODRUS2pfcWEuanBlZydcbiAgfSwge1xuICAgIGlkOiA0LFxuICAgIG5hbWU6ICdQZXJyeSBHb3Zlcm5vcicsXG4gICAgbGFzdFRleHQ6ICdMb29rIGF0IG15IG11a2x1a3MhJyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzQ5MTk5NTM5ODEzNTc2NzA0MC9pZTJaX1Y2ZS5qcGVnJ1xuICB9XTtcblxuICByZXR1cm4ge1xuICAgIGFsbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY2hhdHM7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKGNoYXQpIHtcbiAgICAgIGNoYXRzLnNwbGljZShjaGF0cy5pbmRleE9mKGNoYXQpLCAxKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24oY2hhdElkKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjaGF0c1tpXS5pZCA9PT0gcGFyc2VJbnQoY2hhdElkKSkge1xuICAgICAgICAgIHJldHVybiBjaGF0c1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhdHMiLCJcbnZhciBGcmllbmRzID0gZnVuY3Rpb24oKSB7XG4gIC8vIE1pZ2h0IHVzZSBhIHJlc291cmNlIGhlcmUgdGhhdCByZXR1cm5zIGEgSlNPTiBhcnJheVxuXG4gIC8vIFNvbWUgZmFrZSB0ZXN0aW5nIGRhdGFcbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxuICB2YXIgZnJpZW5kcyA9IFt7XG4gICAgaWQ6IDAsXG4gICAgbmFtZTogJ0JlbiBTcGFycm93JyxcbiAgICBub3RlczogJ0Vuam95cyBkcmF3aW5nIHRoaW5ncycsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy81MTQ1NDk4MTE3NjUyMTExMzYvOVNnQXVIZVkucG5nJ1xuICB9LCB7XG4gICAgaWQ6IDEsXG4gICAgbmFtZTogJ01heCBMeW54JyxcbiAgICBub3RlczogJ09kZCBvYnNlc3Npb24gd2l0aCBldmVyeXRoaW5nJyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9hdmF0YXJzMy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xMTIxND92PTMmcz00NjAnXG4gIH0sIHtcbiAgICBpZDogMixcbiAgICBuYW1lOiAnQW5kcmV3IEpvc3RsZW4nLFxuICAgIG5vdGVzOiAnV2VhcnMgYSBzd2VldCBsZWF0aGVyIEphY2tldC4gSVxcJ20gYSBiaXQgamVhbG91cycsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTEyNzQzNzgxODE0ODg2NDAvVHRpMGZGVkouanBlZydcbiAgfSwge1xuICAgIGlkOiAzLFxuICAgIG5hbWU6ICdBZGFtIEJyYWRsZXlzb24nLFxuICAgIG5vdGVzOiAnSSB0aGluayBoZSBuZWVkcyB0byBidXkgYSBib2F0JyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzQ3OTA5MDc5NDA1ODM3OTI2NC84NFRLal9xYS5qcGVnJ1xuICB9LCB7XG4gICAgaWQ6IDQsXG4gICAgbmFtZTogJ1BlcnJ5IEdvdmVybm9yJyxcbiAgICBub3RlczogJ0p1c3QgdGhlIG5pY2VzdCBndXknLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDkxOTk1Mzk4MTM1NzY3MDQwL2llMlpfVjZlLmpwZWcnXG4gIH1dO1xuXG5cbiAgcmV0dXJuIHtcbiAgICBhbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZyaWVuZHM7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKGZyaWVuZElkKSB7XG4gICAgICAvLyBTaW1wbGUgaW5kZXggbG9va3VwXG4gICAgICByZXR1cm4gZnJpZW5kc1tmcmllbmRJZF07XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRnJpZW5kcyIsIlxudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKFwic2VydmljZXNcIiwgW10pO1xuXG5tb2R1bGUuZmFjdG9yeSgnQ2hhdHMnLCByZXF1aXJlKCcuL0NoYXRzJykpO1xubW9kdWxlLmZhY3RvcnkoJ0ZyaWVuZHMnLCByZXF1aXJlKCcuL0ZyaWVuZHMnKSk7XG4iXX0=
