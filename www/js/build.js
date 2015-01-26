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
				    $location.path('/')
				 }).
				 error(function(data, status, headers, config) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
				});
	      },
	      function() {
	          alert('Error getting location');
	      }, {timeout: 10000, enableHighAccuracy: true});
  	
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
		    // this callback will be called asynchronously
		    // when the response is available
		    $scope.todos = data.data
		    //$scope.todos = 
		 }).
		 error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwid3d3XFxqc1xcYXBwLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXEFjY291bnRDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXENoYXREZXRhaWxDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXENoYXRzQ3RybC5qcyIsInd3d1xcanNcXGNvbnRyb2xsZXJzXFxEYXNoQ3RybC5qcyIsInd3d1xcanNcXGNvbnRyb2xsZXJzXFxGcmllbmREZXRhaWxDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXEZyaWVuZHNDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXGluZGV4LmpzIiwid3d3XFxqc1xcc2VydmljZXNcXENoYXRzLmpzIiwid3d3XFxqc1xcc2VydmljZXNcXEZyaWVuZHMuanMiLCJ3d3dcXGpzXFxzZXJ2aWNlc1xcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL3NlcnZpY2VzJyk7XHJcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMnKTtcclxuXHJcbi8vIElvbmljIFN0YXJ0ZXIgQXBwXHJcblxyXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xyXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcclxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xyXG4vLyAnc3RhcnRlci5zZXJ2aWNlcycgaXMgZm91bmQgaW4gc2VydmljZXMuanNcclxuLy8gJ3N0YXJ0ZXIuY29udHJvbGxlcnMnIGlzIGZvdW5kIGluIGNvbnRyb2xsZXJzLmpzXHJcbmFuZ3VsYXIubW9kdWxlKCdzdGFydGVyJywgWydpb25pYycsICdjb250cm9sbGVycycsICdzZXJ2aWNlcyddKVxyXG5cclxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xyXG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxyXG4gICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxyXG4gICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcclxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcclxuICAgIH1cclxuICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XHJcbiAgICAgIC8vIG9yZy5hcGFjaGUuY29yZG92YS5zdGF0dXNiYXIgcmVxdWlyZWRcclxuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KVxyXG5cclxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcblxyXG4gIC8vIElvbmljIHVzZXMgQW5ndWxhclVJIFJvdXRlciB3aGljaCB1c2VzIHRoZSBjb25jZXB0IG9mIHN0YXRlc1xyXG4gIC8vIExlYXJuIG1vcmUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItdWkvdWktcm91dGVyXHJcbiAgLy8gU2V0IHVwIHRoZSB2YXJpb3VzIHN0YXRlcyB3aGljaCB0aGUgYXBwIGNhbiBiZSBpbi5cclxuICAvLyBFYWNoIHN0YXRlJ3MgY29udHJvbGxlciBjYW4gYmUgZm91bmQgaW4gY29udHJvbGxlcnMuanNcclxuICAkc3RhdGVQcm92aWRlclxyXG5cclxuICAvLyBzZXR1cCBhbiBhYnN0cmFjdCBzdGF0ZSBmb3IgdGhlIHRhYnMgZGlyZWN0aXZlXHJcbiAgICAuc3RhdGUoJ3RhYicsIHtcclxuICAgIHVybDogXCIvdGFiXCIsXHJcbiAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy90YWJzLmh0bWxcIlxyXG4gIH0pXHJcblxyXG4gIC8vIEVhY2ggdGFiIGhhcyBpdHMgb3duIG5hdiBoaXN0b3J5IHN0YWNrOlxyXG5cclxuICAuc3RhdGUoJ3RhYi5kYXNoJywge1xyXG4gICAgdXJsOiAnL2Rhc2gnLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgJ3RhYi1kYXNoJzoge1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1kYXNoLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdEYXNoQ3RybCdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIC5zdGF0ZSgndGFiLmNoYXRzJywge1xyXG4gICAgICB1cmw6ICcvY2hhdHMnLFxyXG4gICAgICB2aWV3czoge1xyXG4gICAgICAgICd0YWItY2hhdHMnOiB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItY2hhdHMuaHRtbCcsXHJcbiAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhdHNDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5zdGF0ZSgndGFiLmNoYXQtZGV0YWlsJywge1xyXG4gICAgICB1cmw6ICcvY2hhdHMvOmNoYXRJZCcsXHJcbiAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ3RhYi1jaGF0cyc6IHtcclxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2NoYXQtZGV0YWlsLmh0bWwnLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogJ0NoYXREZXRhaWxDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgLnN0YXRlKCd0YWIuZnJpZW5kcycsIHtcclxuICAgICAgdXJsOiAnL2ZyaWVuZHMnLFxyXG4gICAgICB2aWV3czoge1xyXG4gICAgICAgICd0YWItZnJpZW5kcyc6IHtcclxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1mcmllbmRzLmh0bWwnLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogJ0ZyaWVuZHNDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5zdGF0ZSgndGFiLmZyaWVuZC1kZXRhaWwnLCB7XHJcbiAgICAgIHVybDogJy9mcmllbmQvOmZyaWVuZElkJyxcclxuICAgICAgdmlld3M6IHtcclxuICAgICAgICAndGFiLWZyaWVuZHMnOiB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9mcmllbmQtZGV0YWlsLmh0bWwnLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogJ0ZyaWVuZERldGFpbEN0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAuc3RhdGUoJ3RhYi5hY2NvdW50Jywge1xyXG4gICAgdXJsOiAnL2FjY291bnQnLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgJ3RhYi1hY2NvdW50Jzoge1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1hY2NvdW50Lmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdBY2NvdW50Q3RybCdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBpZiBub25lIG9mIHRoZSBhYm92ZSBzdGF0ZXMgYXJlIG1hdGNoZWQsIHVzZSB0aGlzIGFzIHRoZSBmYWxsYmFja1xyXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy90YWIvZGFzaCcpO1xyXG5cclxufSk7XHJcbiIsIlxyXG52YXIgQWNjb3VudEN0cmwgPSBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAkc2NvcGUuc2V0dGluZ3MgPSB7XHJcbiAgICBlbmFibGVGcmllbmRzOiB0cnVlXHJcbiAgfTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBY2NvdW50Q3RybCIsIlxyXG52YXIgQ2hhdERldGFpbEN0cmwgPSBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgQ2hhdHMpIHtcclxuICAkc2NvcGUuY2hhdCA9IENoYXRzLmdldCgkc3RhdGVQYXJhbXMuY2hhdElkKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDaGF0RGV0YWlsQ3RybCIsIlxyXG52YXIgQ2hhdHNDdHJsID0gZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XHJcbiAgXHJcbiAgJHNjb3BlLnRvZG8gPSB7fVxyXG5cclxuICAkc2NvcGUuc2VuZFRvU2VydmVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuXHQgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXHJcblx0ICAgICAgZnVuY3Rpb24ocG9zaXRpb24pIHtcclxuXHQgICAgICAgICAgXHRjb25zb2xlLmxvZyhcIm5ld1wiK3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xyXG5cdCAgICAgICAgICAgICRzY29wZS50b2RvLmxhdGl0dWRlID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xyXG5cdCAgICAgICAgICAgICRzY29wZS50b2RvLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XHJcblxyXG5cdCAgICAgICAgICBcdCRodHRwLnBvc3QoJ2h0dHBzOi8vcmVzdWx0LWVzdGltYXRvci5oZXJva3VhcHAuY29tL3RvZG9zL2FkZCcsICRzY29wZS50b2RvKS5cclxuXHRcdFx0XHQgIHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcclxuXHRcdFx0XHQgICAgJGxvY2F0aW9uLnBhdGgoJy8nKVxyXG5cdFx0XHRcdCB9KS5cclxuXHRcdFx0XHQgZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcclxuXHRcdFx0XHQgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xyXG5cdFx0XHRcdCAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cclxuXHRcdFx0XHR9KTtcclxuXHQgICAgICB9LFxyXG5cdCAgICAgIGZ1bmN0aW9uKCkge1xyXG5cdCAgICAgICAgICBhbGVydCgnRXJyb3IgZ2V0dGluZyBsb2NhdGlvbicpO1xyXG5cdCAgICAgIH0sIHt0aW1lb3V0OiAxMDAwMCwgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlfSk7XHJcbiAgXHRcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2hhdHNDdHJsIiwidmFyIERhc2hDdHJsID0gZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uLCAkd2luZG93KSB7XHJcblxyXG5cdC8vIFNpbXBsZSBQT1NUIHJlcXVlc3QgZXhhbXBsZSAocGFzc2luZyBkYXRhKSA6XHJcblxyXG5cdHZhciBnZXRUb2RvcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0JGh0dHAuZ2V0KCdodHRwczovL3Jlc3VsdC1lc3RpbWF0b3IuaGVyb2t1YXBwLmNvbS90b2Rvcy9nZXQnKS5cclxuXHRcdCAgc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xyXG5cdFx0ICBcdGNvbnNvbGUubG9nKGRhdGEpXHJcblx0XHQgICAgLy8gdGhpcyBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBhc3luY2hyb25vdXNseVxyXG5cdFx0ICAgIC8vIHdoZW4gdGhlIHJlc3BvbnNlIGlzIGF2YWlsYWJsZVxyXG5cdFx0ICAgICRzY29wZS50b2RvcyA9IGRhdGEuZGF0YVxyXG5cdFx0ICAgIC8vJHNjb3BlLnRvZG9zID0gXHJcblx0XHQgfSkuXHJcblx0XHQgZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcclxuXHRcdCAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXHJcblx0XHQgICAgLy8gb3Igc2VydmVyIHJldHVybnMgcmVzcG9uc2Ugd2l0aCBhbiBlcnJvciBzdGF0dXMuXHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxuXHJcblxyXG5cdCRzY29wZS5kZWxldGVUb2RvID0gZnVuY3Rpb24odG9kb0lkKSB7XHJcblx0XHQkaHR0cC5wb3N0KCdodHRwczovL3Jlc3VsdC1lc3RpbWF0b3IuaGVyb2t1YXBwLmNvbS90b2Rvcy9kZWxldGUnLCB7dG9kb3NfaWQ6IHRvZG9JZH0pLlxyXG5cdFx0ICBzdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcblx0XHQgIFx0Z2V0VG9kb3MoKVxyXG5cdFx0IH0pLlxyXG5cdFx0IGVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcblx0XHQgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xyXG5cdFx0ICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRUb2RvcygpXHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhc2hDdHJsIiwiXHJcbnZhciBGcmllbmREZXRhaWxDdHJsID0gZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIEZyaWVuZHMpIHtcclxuICAkc2NvcGUuZnJpZW5kID0gRnJpZW5kcy5nZXQoJHN0YXRlUGFyYW1zLmZyaWVuZElkKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmREZXRhaWxDdHJsIiwiXHJcbnZhciBGcmllbmRzQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgRnJpZW5kcykge1xyXG4gICRzY29wZS5mcmllbmRzID0gRnJpZW5kcy5hbGwoKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmRzQ3RybCIsIlxyXG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJjb250cm9sbGVyc1wiLCBbXCJzZXJ2aWNlc1wiXSk7XHJcblxyXG5tb2R1bGUuY29udHJvbGxlcignRGFzaEN0cmwnLCByZXF1aXJlKCcuL0Rhc2hDdHJsJykpO1xyXG5tb2R1bGUuY29udHJvbGxlcignQ2hhdHNDdHJsJywgcmVxdWlyZSgnLi9DaGF0c0N0cmwnKSk7XHJcbm1vZHVsZS5jb250cm9sbGVyKCdDaGF0RGV0YWlsQ3RybCcsIHJlcXVpcmUoJy4vQ2hhdERldGFpbEN0cmwnKSk7XHJcbm1vZHVsZS5jb250cm9sbGVyKCdGcmllbmRzQ3RybCcsIHJlcXVpcmUoJy4vRnJpZW5kc0N0cmwnKSk7XHJcbm1vZHVsZS5jb250cm9sbGVyKCdGcmllbmREZXRhaWxDdHJsJywgcmVxdWlyZSgnLi9GcmllbmREZXRhaWxDdHJsJykpO1xyXG5tb2R1bGUuY29udHJvbGxlcignQWNjb3VudEN0cmwnLCByZXF1aXJlKCcuL0FjY291bnRDdHJsJykpOyIsIlxyXG52YXIgQ2hhdHMgPSBmdW5jdGlvbigpIHtcclxuICAvLyBNaWdodCB1c2UgYSByZXNvdXJjZSBoZXJlIHRoYXQgcmV0dXJucyBhIEpTT04gYXJyYXlcclxuXHJcbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxyXG4gIHZhciBjaGF0cyA9IFt7XHJcbiAgICBpZDogMCxcclxuICAgIG5hbWU6ICdCZW4gU3BhcnJvdycsXHJcbiAgICBsYXN0VGV4dDogJ1lvdSBvbiB5b3VyIHdheT8nLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy81MTQ1NDk4MTE3NjUyMTExMzYvOVNnQXVIZVkucG5nJ1xyXG4gIH0sIHtcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ01heCBMeW54JyxcclxuICAgIGxhc3RUZXh0OiAnSGV5LCBpdFxcJ3MgbWUnLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vYXZhdGFyczMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTEyMTQ/dj0zJnM9NDYwJ1xyXG4gIH0sIHtcclxuICAgIGlkOiAyLFxyXG4gICAgbmFtZTogJ0FuZHJldyBKb3N0bGluJyxcclxuICAgIGxhc3RUZXh0OiAnRGlkIHlvdSBnZXQgdGhlIGljZSBjcmVhbT8nLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTEyNzQzNzgxODE0ODg2NDAvVHRpMGZGVkouanBlZydcclxuICB9LCB7XHJcbiAgICBpZDogMyxcclxuICAgIG5hbWU6ICdBZGFtIEJyYWRsZXlzb24nLFxyXG4gICAgbGFzdFRleHQ6ICdJIHNob3VsZCBidXkgYSBib2F0JyxcclxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDc5MDkwNzk0MDU4Mzc5MjY0Lzg0VEtqX3FhLmpwZWcnXHJcbiAgfSwge1xyXG4gICAgaWQ6IDQsXHJcbiAgICBuYW1lOiAnUGVycnkgR292ZXJub3InLFxyXG4gICAgbGFzdFRleHQ6ICdMb29rIGF0IG15IG11a2x1a3MhJyxcclxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDkxOTk1Mzk4MTM1NzY3MDQwL2llMlpfVjZlLmpwZWcnXHJcbiAgfV07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gY2hhdHM7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihjaGF0KSB7XHJcbiAgICAgIGNoYXRzLnNwbGljZShjaGF0cy5pbmRleE9mKGNoYXQpLCAxKTtcclxuICAgIH0sXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKGNoYXRJZCkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNoYXRzW2ldLmlkID09PSBwYXJzZUludChjaGF0SWQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gY2hhdHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDaGF0cyIsIlxyXG52YXIgRnJpZW5kcyA9IGZ1bmN0aW9uKCkge1xyXG4gIC8vIE1pZ2h0IHVzZSBhIHJlc291cmNlIGhlcmUgdGhhdCByZXR1cm5zIGEgSlNPTiBhcnJheVxyXG5cclxuICAvLyBTb21lIGZha2UgdGVzdGluZyBkYXRhXHJcbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxyXG4gIHZhciBmcmllbmRzID0gW3tcclxuICAgIGlkOiAwLFxyXG4gICAgbmFtZTogJ0JlbiBTcGFycm93JyxcclxuICAgIG5vdGVzOiAnRW5qb3lzIGRyYXdpbmcgdGhpbmdzJyxcclxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNTE0NTQ5ODExNzY1MjExMTM2LzlTZ0F1SGVZLnBuZydcclxuICB9LCB7XHJcbiAgICBpZDogMSxcclxuICAgIG5hbWU6ICdNYXggTHlueCcsXHJcbiAgICBub3RlczogJ09kZCBvYnNlc3Npb24gd2l0aCBldmVyeXRoaW5nJyxcclxuICAgIGZhY2U6ICdodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzExMjE0P3Y9MyZzPTQ2MCdcclxuICB9LCB7XHJcbiAgICBpZDogMixcclxuICAgIG5hbWU6ICdBbmRyZXcgSm9zdGxlbicsXHJcbiAgICBub3RlczogJ1dlYXJzIGEgc3dlZXQgbGVhdGhlciBKYWNrZXQuIElcXCdtIGEgYml0IGplYWxvdXMnLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTEyNzQzNzgxODE0ODg2NDAvVHRpMGZGVkouanBlZydcclxuICB9LCB7XHJcbiAgICBpZDogMyxcclxuICAgIG5hbWU6ICdBZGFtIEJyYWRsZXlzb24nLFxyXG4gICAgbm90ZXM6ICdJIHRoaW5rIGhlIG5lZWRzIHRvIGJ1eSBhIGJvYXQnLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80NzkwOTA3OTQwNTgzNzkyNjQvODRUS2pfcWEuanBlZydcclxuICB9LCB7XHJcbiAgICBpZDogNCxcclxuICAgIG5hbWU6ICdQZXJyeSBHb3Zlcm5vcicsXHJcbiAgICBub3RlczogJ0p1c3QgdGhlIG5pY2VzdCBndXknLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTE5OTUzOTgxMzU3NjcwNDAvaWUyWl9WNmUuanBlZydcclxuICB9XTtcclxuXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gZnJpZW5kcztcclxuICAgIH0sXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKGZyaWVuZElkKSB7XHJcbiAgICAgIC8vIFNpbXBsZSBpbmRleCBsb29rdXBcclxuICAgICAgcmV0dXJuIGZyaWVuZHNbZnJpZW5kSWRdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmRzIiwiXHJcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShcInNlcnZpY2VzXCIsIFtdKTtcclxuXHJcbm1vZHVsZS5mYWN0b3J5KCdDaGF0cycsIHJlcXVpcmUoJy4vQ2hhdHMnKSk7XHJcbm1vZHVsZS5mYWN0b3J5KCdGcmllbmRzJywgcmVxdWlyZSgnLi9GcmllbmRzJykpO1xyXG4iXX0=
