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

},{"./controllers":"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\index.js","./services":"C:\\dev\\projects\\ionic-tabs\\www\\js\\services\\index.js"}],"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\AccountCtrl.js":[function(require,module,exports){

var AccountCtrl = function($scope) {
  $scope.settings = {
    enableFriends: true
  };
}

module.exports = AccountCtrl
},{}],"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\ChatDetailCtrl.js":[function(require,module,exports){

var ChatDetailCtrl = function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}

module.exports = ChatDetailCtrl
},{}],"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\ChatsCtrl.js":[function(require,module,exports){

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
},{}],"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\DashCtrl.js":[function(require,module,exports){
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
},{}],"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\FriendDetailCtrl.js":[function(require,module,exports){

var FriendDetailCtrl = function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
}

module.exports = FriendDetailCtrl
},{}],"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\FriendsCtrl.js":[function(require,module,exports){

var FriendsCtrl = function($scope, Friends) {
  $scope.friends = Friends.all();
}

module.exports = FriendsCtrl
},{}],"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\index.js":[function(require,module,exports){

var module = angular.module("controllers", ["services"]);

module.controller('DashCtrl', require('./DashCtrl'));
module.controller('ChatsCtrl', require('./ChatsCtrl'));
module.controller('ChatDetailCtrl', require('./ChatDetailCtrl'));
module.controller('FriendsCtrl', require('./FriendsCtrl'));
module.controller('FriendDetailCtrl', require('./FriendDetailCtrl'));
module.controller('AccountCtrl', require('./AccountCtrl'));
},{"./AccountCtrl":"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\AccountCtrl.js","./ChatDetailCtrl":"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\ChatDetailCtrl.js","./ChatsCtrl":"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\ChatsCtrl.js","./DashCtrl":"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\DashCtrl.js","./FriendDetailCtrl":"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\FriendDetailCtrl.js","./FriendsCtrl":"C:\\dev\\projects\\ionic-tabs\\www\\js\\controllers\\FriendsCtrl.js"}],"C:\\dev\\projects\\ionic-tabs\\www\\js\\services\\Chats.js":[function(require,module,exports){

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
},{}],"C:\\dev\\projects\\ionic-tabs\\www\\js\\services\\Friends.js":[function(require,module,exports){

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
},{}],"C:\\dev\\projects\\ionic-tabs\\www\\js\\services\\index.js":[function(require,module,exports){

var module = angular.module("services", []);

module.factory('Chats', require('./Chats'));
module.factory('Friends', require('./Friends'));

},{"./Chats":"C:\\dev\\projects\\ionic-tabs\\www\\js\\services\\Chats.js","./Friends":"C:\\dev\\projects\\ionic-tabs\\www\\js\\services\\Friends.js"}]},{},["./www/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwid3d3XFxqc1xcYXBwLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXEFjY291bnRDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXENoYXREZXRhaWxDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXENoYXRzQ3RybC5qcyIsInd3d1xcanNcXGNvbnRyb2xsZXJzXFxEYXNoQ3RybC5qcyIsInd3d1xcanNcXGNvbnRyb2xsZXJzXFxGcmllbmREZXRhaWxDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXEZyaWVuZHNDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXGluZGV4LmpzIiwid3d3XFxqc1xcc2VydmljZXNcXENoYXRzLmpzIiwid3d3XFxqc1xcc2VydmljZXNcXEZyaWVuZHMuanMiLCJ3d3dcXGpzXFxzZXJ2aWNlc1xcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi9zZXJ2aWNlcycpO1xyXG5yZXF1aXJlKCcuL2NvbnRyb2xsZXJzJyk7XHJcblxyXG4vLyBJb25pYyBTdGFydGVyIEFwcFxyXG5cclxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcclxuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXHJcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcclxuLy8gJ3N0YXJ0ZXIuc2VydmljZXMnIGlzIGZvdW5kIGluIHNlcnZpY2VzLmpzXHJcbi8vICdzdGFydGVyLmNvbnRyb2xsZXJzJyBpcyBmb3VuZCBpbiBjb250cm9sbGVycy5qc1xyXG5hbmd1bGFyLm1vZHVsZSgnc3RhcnRlcicsIFsnaW9uaWMnLCAnY29udHJvbGxlcnMnLCAnc2VydmljZXMnXSlcclxuXHJcbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcclxuICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcclxuICAgIC8vIGZvciBmb3JtIGlucHV0cylcclxuICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XHJcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xyXG4gICAgICAvLyBvcmcuYXBhY2hlLmNvcmRvdmEuc3RhdHVzYmFyIHJlcXVpcmVkXHJcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcclxuICAgIH1cclxuICB9KTtcclxufSlcclxuXHJcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG5cclxuICAvLyBJb25pYyB1c2VzIEFuZ3VsYXJVSSBSb3V0ZXIgd2hpY2ggdXNlcyB0aGUgY29uY2VwdCBvZiBzdGF0ZXNcclxuICAvLyBMZWFybiBtb3JlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyLXVpL3VpLXJvdXRlclxyXG4gIC8vIFNldCB1cCB0aGUgdmFyaW91cyBzdGF0ZXMgd2hpY2ggdGhlIGFwcCBjYW4gYmUgaW4uXHJcbiAgLy8gRWFjaCBzdGF0ZSdzIGNvbnRyb2xsZXIgY2FuIGJlIGZvdW5kIGluIGNvbnRyb2xsZXJzLmpzXHJcbiAgJHN0YXRlUHJvdmlkZXJcclxuXHJcbiAgLy8gc2V0dXAgYW4gYWJzdHJhY3Qgc3RhdGUgZm9yIHRoZSB0YWJzIGRpcmVjdGl2ZVxyXG4gICAgLnN0YXRlKCd0YWInLCB7XHJcbiAgICB1cmw6IFwiL3RhYlwiLFxyXG4gICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvdGFicy5odG1sXCJcclxuICB9KVxyXG5cclxuICAvLyBFYWNoIHRhYiBoYXMgaXRzIG93biBuYXYgaGlzdG9yeSBzdGFjazpcclxuXHJcbiAgLnN0YXRlKCd0YWIuZGFzaCcsIHtcclxuICAgIHVybDogJy9kYXNoJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICd0YWItZGFzaCc6IHtcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItZGFzaC5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiAnRGFzaEN0cmwnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG5cclxuICAuc3RhdGUoJ3RhYi5jaGF0cycsIHtcclxuICAgICAgdXJsOiAnL2NoYXRzJyxcclxuICAgICAgdmlld3M6IHtcclxuICAgICAgICAndGFiLWNoYXRzJzoge1xyXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFiLWNoYXRzLmh0bWwnLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogJ0NoYXRzQ3RybCdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAuc3RhdGUoJ3RhYi5jaGF0LWRldGFpbCcsIHtcclxuICAgICAgdXJsOiAnL2NoYXRzLzpjaGF0SWQnLFxyXG4gICAgICB2aWV3czoge1xyXG4gICAgICAgICd0YWItY2hhdHMnOiB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jaGF0LWRldGFpbC5odG1sJyxcclxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdDaGF0RGV0YWlsQ3RybCdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gIC5zdGF0ZSgndGFiLmZyaWVuZHMnLCB7XHJcbiAgICAgIHVybDogJy9mcmllbmRzJyxcclxuICAgICAgdmlld3M6IHtcclxuICAgICAgICAndGFiLWZyaWVuZHMnOiB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItZnJpZW5kcy5odG1sJyxcclxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdGcmllbmRzQ3RybCdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICAuc3RhdGUoJ3RhYi5mcmllbmQtZGV0YWlsJywge1xyXG4gICAgICB1cmw6ICcvZnJpZW5kLzpmcmllbmRJZCcsXHJcbiAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ3RhYi1mcmllbmRzJzoge1xyXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvZnJpZW5kLWRldGFpbC5odG1sJyxcclxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdGcmllbmREZXRhaWxDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgLnN0YXRlKCd0YWIuYWNjb3VudCcsIHtcclxuICAgIHVybDogJy9hY2NvdW50JyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICd0YWItYWNjb3VudCc6IHtcclxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItYWNjb3VudC5odG1sJyxcclxuICAgICAgICBjb250cm9sbGVyOiAnQWNjb3VudEN0cmwnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gaWYgbm9uZSBvZiB0aGUgYWJvdmUgc3RhdGVzIGFyZSBtYXRjaGVkLCB1c2UgdGhpcyBhcyB0aGUgZmFsbGJhY2tcclxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvdGFiL2Rhc2gnKTtcclxuXHJcbn0pO1xyXG4iLCJcclxudmFyIEFjY291bnRDdHJsID0gZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgJHNjb3BlLnNldHRpbmdzID0ge1xyXG4gICAgZW5hYmxlRnJpZW5kczogdHJ1ZVxyXG4gIH07XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQWNjb3VudEN0cmwiLCJcclxudmFyIENoYXREZXRhaWxDdHJsID0gZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIENoYXRzKSB7XHJcbiAgJHNjb3BlLmNoYXQgPSBDaGF0cy5nZXQoJHN0YXRlUGFyYW1zLmNoYXRJZCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2hhdERldGFpbEN0cmwiLCJcclxudmFyIENoYXRzQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbiwgJHdpbmRvdykge1xyXG4gIFxyXG4gICRzY29wZS50b2RvID0ge31cclxuXHJcbiAgJHNjb3BlLnNlbmRUb1NlcnZlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcblx0ICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKFxyXG5cdCAgICAgIGZ1bmN0aW9uKHBvc2l0aW9uKSB7XHJcblx0ICAgICAgICAgIFx0Y29uc29sZS5sb2coXCJuZXdcIitwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuXHQgICAgICAgICAgICAkc2NvcGUudG9kby5sYXRpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcclxuXHQgICAgICAgICAgICAkc2NvcGUudG9kby5sb25naXR1ZGUgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xyXG5cclxuXHQgICAgICAgICAgXHQkaHR0cC5wb3N0KCdodHRwczovL3Jlc3VsdC1lc3RpbWF0b3IuaGVyb2t1YXBwLmNvbS90b2Rvcy9hZGQnLCAkc2NvcGUudG9kbykuXHJcblx0XHRcdFx0ICBzdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcblx0XHRcdFx0ICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XHJcblx0XHRcdFx0XHRcdCR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdFx0IH0pLlxyXG5cdFx0XHRcdCBlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xyXG5cdFx0XHRcdCAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXHJcblx0XHRcdFx0ICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxyXG5cdFx0XHRcdH0pO1xyXG5cdCAgICAgIH0sXHJcblx0ICAgICAgZnVuY3Rpb24oKSB7XHJcblx0ICAgICAgICAgIGFsZXJ0KCdFcnJvciBnZXR0aW5nIGxvY2F0aW9uJyk7XHJcblx0ICAgICAgfSwge3RpbWVvdXQ6IDE1MDAwLCBlbmFibGVIaWdoQWNjdXJhY3k6IGZhbHNlfSk7XHJcbiAgXHRcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2hhdHNDdHJsIiwidmFyIERhc2hDdHJsID0gZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uLCAkd2luZG93KSB7XHJcblxyXG5cdC8vIFNpbXBsZSBQT1NUIHJlcXVlc3QgZXhhbXBsZSAocGFzc2luZyBkYXRhKSA6XHJcblxyXG5cdHZhciBnZXRUb2RvcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0JGh0dHAuZ2V0KCdodHRwczovL3Jlc3VsdC1lc3RpbWF0b3IuaGVyb2t1YXBwLmNvbS90b2Rvcy9nZXQnKS5cclxuXHRcdCAgc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xyXG5cdFx0ICBcdGNvbnNvbGUubG9nKGRhdGEpXHJcblx0XHQgICAgJHNjb3BlLnRvZG9zID0gZGF0YS5kYXRhXHJcblx0XHRcdFx0Ly9odHRwOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/bGF0bG5nPTQ4LjAsMjIuMDM1NTM4Mzgmc2Vuc29yPXRydWVcclxuXHRcdFx0XHRhbmd1bGFyLmZvckVhY2goJHNjb3BlLnRvZG9zLCBmdW5jdGlvbih0b2RvKXtcclxuXHRcdFx0XHRcdHRvZG8uYWRkcmVzcztcclxuXHRcdFx0XHRcdCRodHRwLmdldCgnaHR0cDovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2xhdGxuZz0nK3RvZG8ubGF0aXR1ZGUrJywnK3RvZG8ubG9uZ2l0dWRlKycmc2Vuc29yPXRydWUnKS5cclxuXHRcdFx0XHRcdFx0c3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xyXG5cdFx0XHRcdFx0XHRcdHRvZG8uYWRkcmVzcyA9IGRhdGEucmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcztcclxuXHRcdFx0XHRcdFx0fSkuXHJcblx0XHRcdFx0XHRcdGVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0IH0pLlxyXG5cdFx0IGVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxuXHJcblxyXG5cdCRzY29wZS5kZWxldGVUb2RvID0gZnVuY3Rpb24odG9kb0lkKSB7XHJcblx0XHQkaHR0cC5wb3N0KCdodHRwczovL3Jlc3VsdC1lc3RpbWF0b3IuaGVyb2t1YXBwLmNvbS90b2Rvcy9kZWxldGUnLCB7dG9kb3NfaWQ6IHRvZG9JZH0pLlxyXG5cdFx0ICBzdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcblx0XHQgIFx0Z2V0VG9kb3MoKVxyXG5cdFx0IH0pLlxyXG5cdFx0IGVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcblx0XHQgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xyXG5cdFx0ICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRUb2RvcygpXHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhc2hDdHJsIiwiXHJcbnZhciBGcmllbmREZXRhaWxDdHJsID0gZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIEZyaWVuZHMpIHtcclxuICAkc2NvcGUuZnJpZW5kID0gRnJpZW5kcy5nZXQoJHN0YXRlUGFyYW1zLmZyaWVuZElkKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmREZXRhaWxDdHJsIiwiXHJcbnZhciBGcmllbmRzQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgRnJpZW5kcykge1xyXG4gICRzY29wZS5mcmllbmRzID0gRnJpZW5kcy5hbGwoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmRzQ3RybCIsIlxyXG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJjb250cm9sbGVyc1wiLCBbXCJzZXJ2aWNlc1wiXSk7XHJcblxyXG5tb2R1bGUuY29udHJvbGxlcignRGFzaEN0cmwnLCByZXF1aXJlKCcuL0Rhc2hDdHJsJykpO1xyXG5tb2R1bGUuY29udHJvbGxlcignQ2hhdHNDdHJsJywgcmVxdWlyZSgnLi9DaGF0c0N0cmwnKSk7XHJcbm1vZHVsZS5jb250cm9sbGVyKCdDaGF0RGV0YWlsQ3RybCcsIHJlcXVpcmUoJy4vQ2hhdERldGFpbEN0cmwnKSk7XHJcbm1vZHVsZS5jb250cm9sbGVyKCdGcmllbmRzQ3RybCcsIHJlcXVpcmUoJy4vRnJpZW5kc0N0cmwnKSk7XHJcbm1vZHVsZS5jb250cm9sbGVyKCdGcmllbmREZXRhaWxDdHJsJywgcmVxdWlyZSgnLi9GcmllbmREZXRhaWxDdHJsJykpO1xyXG5tb2R1bGUuY29udHJvbGxlcignQWNjb3VudEN0cmwnLCByZXF1aXJlKCcuL0FjY291bnRDdHJsJykpOyIsIlxyXG52YXIgQ2hhdHMgPSBmdW5jdGlvbigpIHtcclxuICAvLyBNaWdodCB1c2UgYSByZXNvdXJjZSBoZXJlIHRoYXQgcmV0dXJucyBhIEpTT04gYXJyYXlcclxuXHJcbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxyXG4gIHZhciBjaGF0cyA9IFt7XHJcbiAgICBpZDogMCxcclxuICAgIG5hbWU6ICdCZW4gU3BhcnJvdycsXHJcbiAgICBsYXN0VGV4dDogJ1lvdSBvbiB5b3VyIHdheT8nLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy81MTQ1NDk4MTE3NjUyMTExMzYvOVNnQXVIZVkucG5nJ1xyXG4gIH0sIHtcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ01heCBMeW54JyxcclxuICAgIGxhc3RUZXh0OiAnSGV5LCBpdFxcJ3MgbWUnLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vYXZhdGFyczMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTEyMTQ/dj0zJnM9NDYwJ1xyXG4gIH0sIHtcclxuICAgIGlkOiAyLFxyXG4gICAgbmFtZTogJ0FuZHJldyBKb3N0bGluJyxcclxuICAgIGxhc3RUZXh0OiAnRGlkIHlvdSBnZXQgdGhlIGljZSBjcmVhbT8nLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTEyNzQzNzgxODE0ODg2NDAvVHRpMGZGVkouanBlZydcclxuICB9LCB7XHJcbiAgICBpZDogMyxcclxuICAgIG5hbWU6ICdBZGFtIEJyYWRsZXlzb24nLFxyXG4gICAgbGFzdFRleHQ6ICdJIHNob3VsZCBidXkgYSBib2F0JyxcclxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDc5MDkwNzk0MDU4Mzc5MjY0Lzg0VEtqX3FhLmpwZWcnXHJcbiAgfSwge1xyXG4gICAgaWQ6IDQsXHJcbiAgICBuYW1lOiAnUGVycnkgR292ZXJub3InLFxyXG4gICAgbGFzdFRleHQ6ICdMb29rIGF0IG15IG11a2x1a3MhJyxcclxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDkxOTk1Mzk4MTM1NzY3MDQwL2llMlpfVjZlLmpwZWcnXHJcbiAgfV07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gY2hhdHM7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihjaGF0KSB7XHJcbiAgICAgIGNoYXRzLnNwbGljZShjaGF0cy5pbmRleE9mKGNoYXQpLCAxKTtcclxuICAgIH0sXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKGNoYXRJZCkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNoYXRzW2ldLmlkID09PSBwYXJzZUludChjaGF0SWQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gY2hhdHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDaGF0cyIsIlxyXG52YXIgRnJpZW5kcyA9IGZ1bmN0aW9uKCkge1xyXG4gIC8vIE1pZ2h0IHVzZSBhIHJlc291cmNlIGhlcmUgdGhhdCByZXR1cm5zIGEgSlNPTiBhcnJheVxyXG5cclxuICAvLyBTb21lIGZha2UgdGVzdGluZyBkYXRhXHJcbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxyXG4gIHZhciBmcmllbmRzID0gW3tcclxuICAgIGlkOiAwLFxyXG4gICAgbmFtZTogJ0JlbiBTcGFycm93JyxcclxuICAgIG5vdGVzOiAnRW5qb3lzIGRyYXdpbmcgdGhpbmdzJyxcclxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNTE0NTQ5ODExNzY1MjExMTM2LzlTZ0F1SGVZLnBuZydcclxuICB9LCB7XHJcbiAgICBpZDogMSxcclxuICAgIG5hbWU6ICdNYXggTHlueCcsXHJcbiAgICBub3RlczogJ09kZCBvYnNlc3Npb24gd2l0aCBldmVyeXRoaW5nJyxcclxuICAgIGZhY2U6ICdodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzExMjE0P3Y9MyZzPTQ2MCdcclxuICB9LCB7XHJcbiAgICBpZDogMixcclxuICAgIG5hbWU6ICdBbmRyZXcgSm9zdGxlbicsXHJcbiAgICBub3RlczogJ1dlYXJzIGEgc3dlZXQgbGVhdGhlciBKYWNrZXQuIElcXCdtIGEgYml0IGplYWxvdXMnLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTEyNzQzNzgxODE0ODg2NDAvVHRpMGZGVkouanBlZydcclxuICB9LCB7XHJcbiAgICBpZDogMyxcclxuICAgIG5hbWU6ICdBZGFtIEJyYWRsZXlzb24nLFxyXG4gICAgbm90ZXM6ICdJIHRoaW5rIGhlIG5lZWRzIHRvIGJ1eSBhIGJvYXQnLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80NzkwOTA3OTQwNTgzNzkyNjQvODRUS2pfcWEuanBlZydcclxuICB9LCB7XHJcbiAgICBpZDogNCxcclxuICAgIG5hbWU6ICdQZXJyeSBHb3Zlcm5vcicsXHJcbiAgICBub3RlczogJ0p1c3QgdGhlIG5pY2VzdCBndXknLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTE5OTUzOTgxMzU3NjcwNDAvaWUyWl9WNmUuanBlZydcclxuICB9XTtcclxuXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gZnJpZW5kcztcclxuICAgIH0sXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKGZyaWVuZElkKSB7XHJcbiAgICAgIC8vIFNpbXBsZSBpbmRleCBsb29rdXBcclxuICAgICAgcmV0dXJuIGZyaWVuZHNbZnJpZW5kSWRdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmRzIiwiXHJcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShcInNlcnZpY2VzXCIsIFtdKTtcclxuXHJcbm1vZHVsZS5mYWN0b3J5KCdDaGF0cycsIHJlcXVpcmUoJy4vQ2hhdHMnKSk7XHJcbm1vZHVsZS5mYWN0b3J5KCdGcmllbmRzJywgcmVxdWlyZSgnLi9GcmllbmRzJykpO1xyXG4iXX0=
