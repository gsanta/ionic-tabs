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

var ChatsCtrl = function($scope, $http, $location, $window) {
  
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ3d3cvanMvYXBwLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0FjY291bnRDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0NoYXREZXRhaWxDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0NoYXRzQ3RybC5qcyIsInd3dy9qcy9jb250cm9sbGVycy9EYXNoQ3RybC5qcyIsInd3dy9qcy9jb250cm9sbGVycy9GcmllbmREZXRhaWxDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0ZyaWVuZHNDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL2luZGV4LmpzIiwid3d3L2pzL3NlcnZpY2VzL0NoYXRzLmpzIiwid3d3L2pzL3NlcnZpY2VzL0ZyaWVuZHMuanMiLCJ3d3cvanMvc2VydmljZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi9zZXJ2aWNlcycpO1xucmVxdWlyZSgnLi9jb250cm9sbGVycycpO1xuXG4vLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG4vLyAnc3RhcnRlci5zZXJ2aWNlcycgaXMgZm91bmQgaW4gc2VydmljZXMuanNcbi8vICdzdGFydGVyLmNvbnRyb2xsZXJzJyBpcyBmb3VuZCBpbiBjb250cm9sbGVycy5qc1xuYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXInLCBbJ2lvbmljJywgJ2NvbnRyb2xsZXJzJywgJ3NlcnZpY2VzJ10pXG5cbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIC8vIG9yZy5hcGFjaGUuY29yZG92YS5zdGF0dXNiYXIgcmVxdWlyZWRcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgLy8gSW9uaWMgdXNlcyBBbmd1bGFyVUkgUm91dGVyIHdoaWNoIHVzZXMgdGhlIGNvbmNlcHQgb2Ygc3RhdGVzXG4gIC8vIExlYXJuIG1vcmUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItdWkvdWktcm91dGVyXG4gIC8vIFNldCB1cCB0aGUgdmFyaW91cyBzdGF0ZXMgd2hpY2ggdGhlIGFwcCBjYW4gYmUgaW4uXG4gIC8vIEVhY2ggc3RhdGUncyBjb250cm9sbGVyIGNhbiBiZSBmb3VuZCBpbiBjb250cm9sbGVycy5qc1xuICAkc3RhdGVQcm92aWRlclxuXG4gIC8vIHNldHVwIGFuIGFic3RyYWN0IHN0YXRlIGZvciB0aGUgdGFicyBkaXJlY3RpdmVcbiAgICAuc3RhdGUoJ3RhYicsIHtcbiAgICB1cmw6IFwiL3RhYlwiLFxuICAgIGFic3RyYWN0OiB0cnVlLFxuICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy90YWJzLmh0bWxcIlxuICB9KVxuXG4gIC8vIEVhY2ggdGFiIGhhcyBpdHMgb3duIG5hdiBoaXN0b3J5IHN0YWNrOlxuXG4gIC5zdGF0ZSgndGFiLmRhc2gnLCB7XG4gICAgdXJsOiAnL2Rhc2gnLFxuICAgIHZpZXdzOiB7XG4gICAgICAndGFiLWRhc2gnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1kYXNoLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGFzaEN0cmwnXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIC5zdGF0ZSgndGFiLmNoYXRzJywge1xuICAgICAgdXJsOiAnL2NoYXRzJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICd0YWItY2hhdHMnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFiLWNoYXRzLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdDaGF0c0N0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIC5zdGF0ZSgndGFiLmNoYXQtZGV0YWlsJywge1xuICAgICAgdXJsOiAnL2NoYXRzLzpjaGF0SWQnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ3RhYi1jaGF0cyc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jaGF0LWRldGFpbC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhdERldGFpbEN0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gIC5zdGF0ZSgndGFiLmZyaWVuZHMnLCB7XG4gICAgICB1cmw6ICcvZnJpZW5kcycsXG4gICAgICB2aWV3czoge1xuICAgICAgICAndGFiLWZyaWVuZHMnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFiLWZyaWVuZHMuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0ZyaWVuZHNDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ3RhYi5mcmllbmQtZGV0YWlsJywge1xuICAgICAgdXJsOiAnL2ZyaWVuZC86ZnJpZW5kSWQnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ3RhYi1mcmllbmRzJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2ZyaWVuZC1kZXRhaWwuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0ZyaWVuZERldGFpbEN0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gIC5zdGF0ZSgndGFiLmFjY291bnQnLCB7XG4gICAgdXJsOiAnL2FjY291bnQnLFxuICAgIHZpZXdzOiB7XG4gICAgICAndGFiLWFjY291bnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1hY2NvdW50Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnQWNjb3VudEN0cmwnXG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBpZiBub25lIG9mIHRoZSBhYm92ZSBzdGF0ZXMgYXJlIG1hdGNoZWQsIHVzZSB0aGlzIGFzIHRoZSBmYWxsYmFja1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvdGFiL2Rhc2gnKTtcblxufSk7XG4iLCJcbnZhciBBY2NvdW50Q3RybCA9IGZ1bmN0aW9uKCRzY29wZSkge1xuICAkc2NvcGUuc2V0dGluZ3MgPSB7XG4gICAgZW5hYmxlRnJpZW5kczogdHJ1ZVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFjY291bnRDdHJsIiwiXG52YXIgQ2hhdERldGFpbEN0cmwgPSBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgQ2hhdHMpIHtcbiAgJHNjb3BlLmNoYXQgPSBDaGF0cy5nZXQoJHN0YXRlUGFyYW1zLmNoYXRJZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhdERldGFpbEN0cmwiLCJcbnZhciBDaGF0c0N0cmwgPSBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24sICR3aW5kb3cpIHtcbiAgXG4gICRzY29wZS50b2RvID0ge31cblxuICAkc2NvcGUuc2VuZFRvU2VydmVyID0gZnVuY3Rpb24oKSB7XG5cblxuXHQgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXG5cdCAgICAgIGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG5cdCAgICAgICAgICBcdGNvbnNvbGUubG9nKFwibmV3XCIrcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgJywnICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XG5cdCAgICAgICAgICAgICRzY29wZS50b2RvLmxhdGl0dWRlID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuXHQgICAgICAgICAgICAkc2NvcGUudG9kby5sb25naXR1ZGUgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuXG5cdCAgICAgICAgICBcdCRodHRwLnBvc3QoJ2h0dHBzOi8vcmVzdWx0LWVzdGltYXRvci5oZXJva3VhcHAuY29tL3RvZG9zL2FkZCcsICRzY29wZS50b2RvKS5cblx0XHRcdFx0ICBzdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0XHRcdCAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuXHRcdFx0XHRcdFx0JHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0IH0pLlxuXHRcdFx0XHQgZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHRcdFx0ICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcblx0XHRcdFx0ICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuXHRcdFx0XHR9KTtcblx0ICAgICAgfSxcblx0ICAgICAgZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICBhbGVydCgnRXJyb3IgZ2V0dGluZyBsb2NhdGlvbicpO1xuXHQgICAgICB9LCB7dGltZW91dDogMTUwMDAsIGVuYWJsZUhpZ2hBY2N1cmFjeTogZmFsc2V9KTtcbiAgXHRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXRzQ3RybCIsInZhciBEYXNoQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbiwgJHdpbmRvdykge1xuXG5cdC8vIFNpbXBsZSBQT1NUIHJlcXVlc3QgZXhhbXBsZSAocGFzc2luZyBkYXRhKSA6XG5cblx0dmFyIGdldFRvZG9zID0gZnVuY3Rpb24oKSB7XG5cdFx0JGh0dHAuZ2V0KCdodHRwczovL3Jlc3VsdC1lc3RpbWF0b3IuaGVyb2t1YXBwLmNvbS90b2Rvcy9nZXQnKS5cblx0XHQgIHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHQgIFx0Y29uc29sZS5sb2coZGF0YSlcblx0XHQgICAgJHNjb3BlLnRvZG9zID0gZGF0YS5kYXRhXG5cdFx0XHRcdC8vaHR0cDovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2xhdGxuZz00OC4wLDIyLjAzNTUzODM4JnNlbnNvcj10cnVlXG5cdFx0XHRcdGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUudG9kb3MsIGZ1bmN0aW9uKHRvZG8pe1xuXHRcdFx0XHRcdHRvZG8uYWRkcmVzcztcblx0XHRcdFx0XHQkaHR0cC5nZXQoJ2h0dHA6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9sYXRsbmc9Jyt0b2RvLmxhdGl0dWRlKycsJyt0b2RvLmxvbmdpdHVkZSsnJnNlbnNvcj10cnVlJykuXG5cdFx0XHRcdFx0XHRzdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0XHRcdFx0XHRcdHRvZG8uYWRkcmVzcyA9IGRhdGEucmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcztcblx0XHRcdFx0XHRcdH0pLlxuXHRcdFx0XHRcdFx0ZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdCB9KS5cblx0XHQgZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHR9KTtcblxuXHR9XG5cblxuXG5cdCRzY29wZS5kZWxldGVUb2RvID0gZnVuY3Rpb24odG9kb0lkKSB7XG5cdFx0JGh0dHAucG9zdCgnaHR0cHM6Ly9yZXN1bHQtZXN0aW1hdG9yLmhlcm9rdWFwcC5jb20vdG9kb3MvZGVsZXRlJywge3RvZG9zX2lkOiB0b2RvSWR9KS5cblx0XHQgIHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHQgIFx0Z2V0VG9kb3MoKVxuXHRcdCB9KS5cblx0XHQgZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHQgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuXHRcdCAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cblx0XHR9KTtcblx0fVxuXG5cdGdldFRvZG9zKClcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERhc2hDdHJsIiwiXG52YXIgRnJpZW5kRGV0YWlsQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBGcmllbmRzKSB7XG4gICRzY29wZS5mcmllbmQgPSBGcmllbmRzLmdldCgkc3RhdGVQYXJhbXMuZnJpZW5kSWQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZyaWVuZERldGFpbEN0cmwiLCJcbnZhciBGcmllbmRzQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSkge1xuXG4gICAgJHNjb3BlLmRhdGEgPSB7fTtcblxuICAgICRzY29wZS5zZXRNaXNzaW9uID0gZnVuY3Rpb24ocmFkKSB7XG4gICAgICAgIGlmKHJhZD09PXVuZGVmaW5lZCl7XG4gICAgICAgICAgICByYWQ9JHNjb3BlLmRhdGEucmFkaXVzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHJhZCk7XG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRnJpZW5kc0N0cmwiLCJcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShcImNvbnRyb2xsZXJzXCIsIFtcInNlcnZpY2VzXCJdKTtcblxubW9kdWxlLmNvbnRyb2xsZXIoJ0Rhc2hDdHJsJywgcmVxdWlyZSgnLi9EYXNoQ3RybCcpKTtcbm1vZHVsZS5jb250cm9sbGVyKCdDaGF0c0N0cmwnLCByZXF1aXJlKCcuL0NoYXRzQ3RybCcpKTtcbm1vZHVsZS5jb250cm9sbGVyKCdDaGF0RGV0YWlsQ3RybCcsIHJlcXVpcmUoJy4vQ2hhdERldGFpbEN0cmwnKSk7XG5tb2R1bGUuY29udHJvbGxlcignRnJpZW5kc0N0cmwnLCByZXF1aXJlKCcuL0ZyaWVuZHNDdHJsJykpO1xubW9kdWxlLmNvbnRyb2xsZXIoJ0ZyaWVuZERldGFpbEN0cmwnLCByZXF1aXJlKCcuL0ZyaWVuZERldGFpbEN0cmwnKSk7XG5tb2R1bGUuY29udHJvbGxlcignQWNjb3VudEN0cmwnLCByZXF1aXJlKCcuL0FjY291bnRDdHJsJykpOyIsIlxudmFyIENoYXRzID0gZnVuY3Rpb24oKSB7XG4gIC8vIE1pZ2h0IHVzZSBhIHJlc291cmNlIGhlcmUgdGhhdCByZXR1cm5zIGEgSlNPTiBhcnJheVxuXG4gIC8vIFNvbWUgZmFrZSB0ZXN0aW5nIGRhdGFcbiAgdmFyIGNoYXRzID0gW3tcbiAgICBpZDogMCxcbiAgICBuYW1lOiAnQmVuIFNwYXJyb3cnLFxuICAgIGxhc3RUZXh0OiAnWW91IG9uIHlvdXIgd2F5PycsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy81MTQ1NDk4MTE3NjUyMTExMzYvOVNnQXVIZVkucG5nJ1xuICB9LCB7XG4gICAgaWQ6IDEsXG4gICAgbmFtZTogJ01heCBMeW54JyxcbiAgICBsYXN0VGV4dDogJ0hleSwgaXRcXCdzIG1lJyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9hdmF0YXJzMy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xMTIxND92PTMmcz00NjAnXG4gIH0sIHtcbiAgICBpZDogMixcbiAgICBuYW1lOiAnQW5kcmV3IEpvc3RsaW4nLFxuICAgIGxhc3RUZXh0OiAnRGlkIHlvdSBnZXQgdGhlIGljZSBjcmVhbT8nLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDkxMjc0Mzc4MTgxNDg4NjQwL1R0aTBmRlZKLmpwZWcnXG4gIH0sIHtcbiAgICBpZDogMyxcbiAgICBuYW1lOiAnQWRhbSBCcmFkbGV5c29uJyxcbiAgICBsYXN0VGV4dDogJ0kgc2hvdWxkIGJ1eSBhIGJvYXQnLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDc5MDkwNzk0MDU4Mzc5MjY0Lzg0VEtqX3FhLmpwZWcnXG4gIH0sIHtcbiAgICBpZDogNCxcbiAgICBuYW1lOiAnUGVycnkgR292ZXJub3InLFxuICAgIGxhc3RUZXh0OiAnTG9vayBhdCBteSBtdWtsdWtzIScsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTE5OTUzOTgxMzU3NjcwNDAvaWUyWl9WNmUuanBlZydcbiAgfV07XG5cbiAgcmV0dXJuIHtcbiAgICBhbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNoYXRzO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihjaGF0KSB7XG4gICAgICBjaGF0cy5zcGxpY2UoY2hhdHMuaW5kZXhPZihjaGF0KSwgMSk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKGNoYXRJZCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGF0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2hhdHNbaV0uaWQgPT09IHBhcnNlSW50KGNoYXRJZCkpIHtcbiAgICAgICAgICByZXR1cm4gY2hhdHNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXRzIiwiXG52YXIgRnJpZW5kcyA9IGZ1bmN0aW9uKCkge1xuICAvLyBNaWdodCB1c2UgYSByZXNvdXJjZSBoZXJlIHRoYXQgcmV0dXJucyBhIEpTT04gYXJyYXlcblxuICAvLyBTb21lIGZha2UgdGVzdGluZyBkYXRhXG4gIC8vIFNvbWUgZmFrZSB0ZXN0aW5nIGRhdGFcbiAgdmFyIGZyaWVuZHMgPSBbe1xuICAgIGlkOiAwLFxuICAgIG5hbWU6ICdCZW4gU3BhcnJvdycsXG4gICAgbm90ZXM6ICdFbmpveXMgZHJhd2luZyB0aGluZ3MnLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNTE0NTQ5ODExNzY1MjExMTM2LzlTZ0F1SGVZLnBuZydcbiAgfSwge1xuICAgIGlkOiAxLFxuICAgIG5hbWU6ICdNYXggTHlueCcsXG4gICAgbm90ZXM6ICdPZGQgb2JzZXNzaW9uIHdpdGggZXZlcnl0aGluZycsXG4gICAgZmFjZTogJ2h0dHBzOi8vYXZhdGFyczMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTEyMTQ/dj0zJnM9NDYwJ1xuICB9LCB7XG4gICAgaWQ6IDIsXG4gICAgbmFtZTogJ0FuZHJldyBKb3N0bGVuJyxcbiAgICBub3RlczogJ1dlYXJzIGEgc3dlZXQgbGVhdGhlciBKYWNrZXQuIElcXCdtIGEgYml0IGplYWxvdXMnLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDkxMjc0Mzc4MTgxNDg4NjQwL1R0aTBmRlZKLmpwZWcnXG4gIH0sIHtcbiAgICBpZDogMyxcbiAgICBuYW1lOiAnQWRhbSBCcmFkbGV5c29uJyxcbiAgICBub3RlczogJ0kgdGhpbmsgaGUgbmVlZHMgdG8gYnV5IGEgYm9hdCcsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80NzkwOTA3OTQwNTgzNzkyNjQvODRUS2pfcWEuanBlZydcbiAgfSwge1xuICAgIGlkOiA0LFxuICAgIG5hbWU6ICdQZXJyeSBHb3Zlcm5vcicsXG4gICAgbm90ZXM6ICdKdXN0IHRoZSBuaWNlc3QgZ3V5JyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzQ5MTk5NTM5ODEzNTc2NzA0MC9pZTJaX1Y2ZS5qcGVnJ1xuICB9XTtcblxuXG4gIHJldHVybiB7XG4gICAgYWxsOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmcmllbmRzO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihmcmllbmRJZCkge1xuICAgICAgLy8gU2ltcGxlIGluZGV4IGxvb2t1cFxuICAgICAgcmV0dXJuIGZyaWVuZHNbZnJpZW5kSWRdO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZyaWVuZHMiLCJcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShcInNlcnZpY2VzXCIsIFtdKTtcblxubW9kdWxlLmZhY3RvcnkoJ0NoYXRzJywgcmVxdWlyZSgnLi9DaGF0cycpKTtcbm1vZHVsZS5mYWN0b3J5KCdGcmllbmRzJywgcmVxdWlyZSgnLi9GcmllbmRzJykpO1xuIl19
