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

},{"./controllers":"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\index.js","./services":"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\services\\index.js"}],"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\AccountCtrl.js":[function(require,module,exports){

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
},{}],"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\ChatDetailCtrl.js":[function(require,module,exports){

var ChatDetailCtrl = function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}

module.exports = ChatDetailCtrl
},{}],"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\ChatsCtrl.js":[function(require,module,exports){

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
},{}],"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\DashCtrl.js":[function(require,module,exports){
var DashCtrl = function($scope, $http, $location, $window, $timeout) {
	var opts = {
  lines: 1, // The number of lines to draw
  angle: 0.0, // The length of each line
  lineWidth: 0.44, // The line thickness
  pointer: {
    length: 0.7, // The radius of the inner circle
    strokeWidth: 0.020, // The rotation offset
    color: '#000000' // Fill color
  },
  limitMax: 'true',   // If true, the pointer will not go past the end of the gauge
  colorStart: '#6FADCF',   // Colors
  colorStop: '#8FC0DA',    // just experiment with them
  strokeColor: '#E0E0E0',   // to see which ones work best for you
  generateGradient: true
};
var target = document.getElementById('foo'); // your canvas element

var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 100; // set max gauge value
gauge.setTextField(document.getElementById('preview-textfield'));
gauge.animationSpeed = 32; // set animation speed (32 is default value)
gauge.set(0); // set actual value

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(colors) {
    return "#" + componentToHex(colors[0]) + componentToHex(colors[1]) + componentToHex(colors[2]);
}

var percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

var getColorForPercentage = function(pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return [color.r, color.g, color.b];
    // or output as hex if preferred
}  

var inn = 0.0;
		console.log(gauge);

var countUp = function() {
	//console.log(rgbToHex(getColorForPercentage(1-inn)));
	if (inn > 1) {
			inn = 0;
		}
	gauge.options.colorStart = rgbToHex(getColorForPercentage(1-inn));
	gauge.options.colorStop = rgbToHex(getColorForPercentage(1-inn));
		gauge.set(inn*100);
		inn += 0.01;
		
        $scope.timeInMs+= 500;
        $timeout(countUp, 100);
    }

$timeout(countUp, 100);
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
},{}],"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\FriendDetailCtrl.js":[function(require,module,exports){

var FriendDetailCtrl = function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
}

module.exports = FriendDetailCtrl
},{}],"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\FriendsCtrl.js":[function(require,module,exports){

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
},{}],"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\index.js":[function(require,module,exports){

var module = angular.module("controllers", ["services"]);

module.controller('DashCtrl', require('./DashCtrl'));
module.controller('ChatsCtrl', require('./ChatsCtrl'));
module.controller('ChatDetailCtrl', require('./ChatDetailCtrl'));
module.controller('FriendsCtrl', require('./FriendsCtrl'));
module.controller('FriendDetailCtrl', require('./FriendDetailCtrl'));
module.controller('AccountCtrl', require('./AccountCtrl'));
},{"./AccountCtrl":"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\AccountCtrl.js","./ChatDetailCtrl":"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\ChatDetailCtrl.js","./ChatsCtrl":"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\ChatsCtrl.js","./DashCtrl":"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\DashCtrl.js","./FriendDetailCtrl":"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\FriendDetailCtrl.js","./FriendsCtrl":"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\controllers\\FriendsCtrl.js"}],"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\services\\Chats.js":[function(require,module,exports){

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
},{}],"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\services\\Friends.js":[function(require,module,exports){

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
},{}],"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\services\\index.js":[function(require,module,exports){

var module = angular.module("services", []);

module.factory('Chats', require('./Chats'));
module.factory('Friends', require('./Friends'));

},{"./Chats":"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\services\\Chats.js","./Friends":"c:\\Users\\horvathlg\\Desktop\\dev\\ionic-tabs\\www\\js\\services\\Friends.js"}]},{},["./www/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwid3d3XFxqc1xcYXBwLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXEFjY291bnRDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXENoYXREZXRhaWxDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXENoYXRzQ3RybC5qcyIsInd3d1xcanNcXGNvbnRyb2xsZXJzXFxEYXNoQ3RybC5qcyIsInd3d1xcanNcXGNvbnRyb2xsZXJzXFxGcmllbmREZXRhaWxDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXEZyaWVuZHNDdHJsLmpzIiwid3d3XFxqc1xcY29udHJvbGxlcnNcXGluZGV4LmpzIiwid3d3XFxqc1xcc2VydmljZXNcXENoYXRzLmpzIiwid3d3XFxqc1xcc2VydmljZXNcXEZyaWVuZHMuanMiLCJ3d3dcXGpzXFxzZXJ2aWNlc1xcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJyZXF1aXJlKCcuL3NlcnZpY2VzJyk7XHJcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMnKTtcclxuXHJcbi8vIElvbmljIFN0YXJ0ZXIgQXBwXHJcblxyXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xyXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcclxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xyXG4vLyAnc3RhcnRlci5zZXJ2aWNlcycgaXMgZm91bmQgaW4gc2VydmljZXMuanNcclxuLy8gJ3N0YXJ0ZXIuY29udHJvbGxlcnMnIGlzIGZvdW5kIGluIGNvbnRyb2xsZXJzLmpzXHJcbmFuZ3VsYXIubW9kdWxlKCdzdGFydGVyJywgWydpb25pYycsICdjb250cm9sbGVycycsICdzZXJ2aWNlcyddKVxyXG5cclxuLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xyXG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxyXG4gICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxyXG4gICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcclxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcclxuICAgIH1cclxuICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XHJcbiAgICAgIC8vIG9yZy5hcGFjaGUuY29yZG92YS5zdGF0dXNiYXIgcmVxdWlyZWRcclxuICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KVxyXG5cclxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcblxyXG4gIC8vIElvbmljIHVzZXMgQW5ndWxhclVJIFJvdXRlciB3aGljaCB1c2VzIHRoZSBjb25jZXB0IG9mIHN0YXRlc1xyXG4gIC8vIExlYXJuIG1vcmUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItdWkvdWktcm91dGVyXHJcbiAgLy8gU2V0IHVwIHRoZSB2YXJpb3VzIHN0YXRlcyB3aGljaCB0aGUgYXBwIGNhbiBiZSBpbi5cclxuICAvLyBFYWNoIHN0YXRlJ3MgY29udHJvbGxlciBjYW4gYmUgZm91bmQgaW4gY29udHJvbGxlcnMuanNcclxuICAkc3RhdGVQcm92aWRlclxyXG5cclxuICAvLyBzZXR1cCBhbiBhYnN0cmFjdCBzdGF0ZSBmb3IgdGhlIHRhYnMgZGlyZWN0aXZlXHJcbiAgICAuc3RhdGUoJ3RhYicsIHtcclxuICAgIHVybDogXCIvdGFiXCIsXHJcbiAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy90YWJzLmh0bWxcIlxyXG4gIH0pXHJcblxyXG4gIC8vIEVhY2ggdGFiIGhhcyBpdHMgb3duIG5hdiBoaXN0b3J5IHN0YWNrOlxyXG5cclxuICAuc3RhdGUoJ3RhYi5kYXNoJywge1xyXG4gICAgdXJsOiAnL2Rhc2gnLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgJ3RhYi1kYXNoJzoge1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1kYXNoLmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdEYXNoQ3RybCdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIC5zdGF0ZSgndGFiLmNoYXRzJywge1xyXG4gICAgICB1cmw6ICcvY2hhdHMnLFxyXG4gICAgICB2aWV3czoge1xyXG4gICAgICAgICd0YWItY2hhdHMnOiB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItY2hhdHMuaHRtbCcsXHJcbiAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhdHNDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5zdGF0ZSgndGFiLmNoYXQtZGV0YWlsJywge1xyXG4gICAgICB1cmw6ICcvY2hhdHMvOmNoYXRJZCcsXHJcbiAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ3RhYi1jaGF0cyc6IHtcclxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2NoYXQtZGV0YWlsLmh0bWwnLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogJ0NoYXREZXRhaWxDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgLnN0YXRlKCd0YWIuZnJpZW5kcycsIHtcclxuICAgICAgdXJsOiAnL2ZyaWVuZHMnLFxyXG4gICAgICB2aWV3czoge1xyXG4gICAgICAgICd0YWItZnJpZW5kcyc6IHtcclxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1mcmllbmRzLmh0bWwnLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogJ0ZyaWVuZHNDdHJsJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIC5zdGF0ZSgndGFiLmZyaWVuZC1kZXRhaWwnLCB7XHJcbiAgICAgIHVybDogJy9mcmllbmQvOmZyaWVuZElkJyxcclxuICAgICAgdmlld3M6IHtcclxuICAgICAgICAndGFiLWZyaWVuZHMnOiB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9mcmllbmQtZGV0YWlsLmh0bWwnLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogJ0ZyaWVuZERldGFpbEN0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAuc3RhdGUoJ3RhYi5hY2NvdW50Jywge1xyXG4gICAgdXJsOiAnL2FjY291bnQnLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgJ3RhYi1hY2NvdW50Jzoge1xyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1hY2NvdW50Lmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdBY2NvdW50Q3RybCdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBpZiBub25lIG9mIHRoZSBhYm92ZSBzdGF0ZXMgYXJlIG1hdGNoZWQsIHVzZSB0aGlzIGFzIHRoZSBmYWxsYmFja1xyXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy90YWIvZGFzaCcpO1xyXG5cclxufSk7XHJcbiIsIlxyXG52YXIgQWNjb3VudEN0cmwgPSBmdW5jdGlvbigkc2NvcGUpIHtcclxuICAkc2NvcGUuc2V0dGluZ3MgPSB7XHJcbiAgICBlbmFibGVGcmllbmRzOiB0cnVlXHJcbiAgfTtcclxuXHJcbiAgJHNjb3BlLm1hcmtlciA9IG51bGw7XHJcblxyXG4gICAgdmFyIG1hcFByb3AgPSB7XHJcblx0ICAgIGNlbnRlcjpuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDUxLjUwODc0MiwtMC4xMjA4NTApLFxyXG5cdCAgICB6b29tOjUsXHJcblx0ICAgIG1hcFR5cGVJZDpnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxyXG5cdCAgfTtcclxuXHJcbiAgXHQkc2NvcGUuaW5pdE1hcCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHQgICAgJHNjb3BlLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnb29nbGVNYXBcIiksbWFwUHJvcCk7XHJcblx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcigkc2NvcGUubWFwLCAnbW91c2Vkb3duJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdCAgICBjb25zb2xlLmxvZyhldmVudC5sYXRMbmcpO1xyXG5cdFx0ICAgIGlmKCRzY29wZS5tYXJrZXIgPT0gbnVsbCkge1xyXG5cdFx0ICAgICAgJHNjb3BlLm1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG5cdFx0XHQgICAgICBwb3NpdGlvbjogZXZlbnQubGF0TG5nLFxyXG5cdFx0XHQgICAgICBtYXA6ICRzY29wZS5tYXAsXHJcblx0XHRcdCAgICAgIHRpdGxlOiAnSGVsbG8gV29ybGQhJyxcclxuXHRcdFx0ICAgICAgZHJhZ2dhYmxlOnRydWUsXHJcblx0XHRcdCAgfSk7XHJcblxyXG5cdFx0XHQgIFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoJHNjb3BlLm1hcmtlciwgJ2RyYWdlbmQnLCBmdW5jdGlvbigpIFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHQgICAgY29uc29sZS5sb2coe1xyXG5cdFx0XHRcdCAgICBcdGxhdDogJHNjb3BlLm1hcmtlci5nZXRQb3NpdGlvbigpLmxhdCgpLFxyXG5cdFx0XHRcdCAgICBcdGxvbjogJHNjb3BlLm1hcmtlci5nZXRQb3NpdGlvbigpLmxuZygpXHJcblx0XHRcdFx0ICAgIH0pXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0ICBcdH1cclxuXHRcdH0pXHJcbiAgfTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBY2NvdW50Q3RybCIsIlxyXG52YXIgQ2hhdERldGFpbEN0cmwgPSBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgQ2hhdHMpIHtcclxuICAkc2NvcGUuY2hhdCA9IENoYXRzLmdldCgkc3RhdGVQYXJhbXMuY2hhdElkKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDaGF0RGV0YWlsQ3RybCIsIlxyXG52YXIgQ2hhdHNDdHJsID0gZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XHJcbiAgXHJcbiAgJHNjb3BlLnRvZG8gPSB7fVxyXG5cclxuICAkc2NvcGUuc2VuZFRvU2VydmVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuXHQgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXHJcblx0ICAgICAgZnVuY3Rpb24ocG9zaXRpb24pIHtcclxuXHQgICAgICAgICAgXHRjb25zb2xlLmxvZyhcIm5ld1wiK3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xyXG5cdCAgICAgICAgICAgICRzY29wZS50b2RvLmxhdGl0dWRlID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xyXG5cdCAgICAgICAgICAgICRzY29wZS50b2RvLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XHJcblxyXG5cdCAgICAgICAgICBcdCRodHRwLnBvc3QoJ2h0dHBzOi8vcmVzdWx0LWVzdGltYXRvci5oZXJva3VhcHAuY29tL3RvZG9zL2FkZCcsICRzY29wZS50b2RvKS5cclxuXHRcdFx0XHQgIHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcclxuXHRcdFx0XHQgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcclxuXHRcdFx0XHRcdFx0JHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0XHQgfSkuXHJcblx0XHRcdFx0IGVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XHJcblx0XHRcdFx0ICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcclxuXHRcdFx0XHQgICAgLy8gb3Igc2VydmVyIHJldHVybnMgcmVzcG9uc2Ugd2l0aCBhbiBlcnJvciBzdGF0dXMuXHJcblx0XHRcdFx0fSk7XHJcblx0ICAgICAgfSxcclxuXHQgICAgICBmdW5jdGlvbigpIHtcclxuXHQgICAgICAgICAgYWxlcnQoJ0Vycm9yIGdldHRpbmcgbG9jYXRpb24nKTtcclxuXHQgICAgICB9LCB7dGltZW91dDogMTUwMDAsIGVuYWJsZUhpZ2hBY2N1cmFjeTogZmFsc2V9KTtcclxuICBcdFxyXG4gIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICAgIHN0YXJ0ID0ge1xyXG4gICAgICAgICAgICBsYXRpdHVkZTogeFxyXG4gICAgICAgICAgICBsb25naXR1ZGU6IHlcclxuICAgICAgICB9XHJcbiAgICAgZ29hbCA9IHtcclxuICAgICAgICBsYXRpdHVkZTogeFxyXG4gICAgICAgIGxvbmdpdHVkZTogeVxyXG4gICAgIH1cclxuICAgICAqL1xyXG4gICAgd2luZG93LmdldERpZmYgPSBmdW5jdGlvbihzdGFydCwgZ29hbCkge1xyXG5cclxuXHJcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcclxuICAgICAgICAgICAgZnVuY3Rpb24ocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3XCIrcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgJywnICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGU6cG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBmdWxsZGlmZj0gZ2V0ZGlmY29vcmQoc3RhcnQsIGdvYWwpKigzLzIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRkaWYgPSBnZXRkaWZjb29yZChjdXJyZW50LCBnb2FsKTtcclxuICAgICAgICAgICAgICAgIHZhciBrb3ogPSBmdWxsZGlmZi1jdXJyZW50ZGlmO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtvei9mdWxsZGlmZik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ga296L2Z1bGxkaWZmO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3IgZ2V0dGluZyBsb2NhdGlvbicpO1xyXG4gICAgICAgICAgICB9LCB7dGltZW91dDogMTUwMDAsIGVuYWJsZUhpZ2hBY2N1cmFjeTogZmFsc2V9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGdldGRpZmNvb3JkID0gZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgaWYgKHR5cGVvZihOdW1iZXIucHJvdG90eXBlLnRvUmFkKSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBOdW1iZXIucHJvdG90eXBlLnRvUmFkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcyAqIE1hdGguUEkgLyAxODA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxhdDEgPSBhLmxhdGl0dWRlO1xyXG4gICAgICAgIHZhciBsb24xID1hLmxvbmdpdHVkZTtcclxuICAgICAgICB2YXIgbGF0MiA9IGIubGF0aXR1ZGU7XHJcbiAgICAgICAgdmFyIGxvbjIgPWIubG9uZ2l0dWRlO1xyXG4gICAgICAgIHZhciBSID0gNjM3MTsgLy8ga21cclxuICAgICAgICB2YXIgz4YxID0gbGF0MS50b1JhZCgpO1xyXG4gICAgICAgIHZhciDPhjIgPSBsYXQyLnRvUmFkKCk7XHJcbiAgICAgICAgdmFyIM6Uz4YgPSAobGF0Mi1sYXQxKS50b1JhZCgpO1xyXG4gICAgICAgIHZhciDOlM67ID0gKGxvbjItbG9uMSkudG9SYWQoKTtcclxuXHJcbiAgICAgICAgdmFyIGEgPSBNYXRoLnNpbijOlM+GLzIpICogTWF0aC5zaW4ozpTPhi8yKSArXHJcbiAgICAgICAgICAgIE1hdGguY29zKM+GMSkgKiBNYXRoLmNvcyjPhjIpICpcclxuICAgICAgICAgICAgTWF0aC5zaW4ozpTOuy8yKSAqIE1hdGguc2luKM6UzrsvMik7XHJcbiAgICAgICAgdmFyIGMgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxLWEpKTtcclxuXHJcbiAgICAgICByZXR1cm4gUiAqIGM7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENoYXRzQ3RybCIsInZhciBEYXNoQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbiwgJHdpbmRvdywgJHRpbWVvdXQpIHtcclxuXHR2YXIgb3B0cyA9IHtcclxuICBsaW5lczogMSwgLy8gVGhlIG51bWJlciBvZiBsaW5lcyB0byBkcmF3XHJcbiAgYW5nbGU6IDAuMCwgLy8gVGhlIGxlbmd0aCBvZiBlYWNoIGxpbmVcclxuICBsaW5lV2lkdGg6IDAuNDQsIC8vIFRoZSBsaW5lIHRoaWNrbmVzc1xyXG4gIHBvaW50ZXI6IHtcclxuICAgIGxlbmd0aDogMC43LCAvLyBUaGUgcmFkaXVzIG9mIHRoZSBpbm5lciBjaXJjbGVcclxuICAgIHN0cm9rZVdpZHRoOiAwLjAyMCwgLy8gVGhlIHJvdGF0aW9uIG9mZnNldFxyXG4gICAgY29sb3I6ICcjMDAwMDAwJyAvLyBGaWxsIGNvbG9yXHJcbiAgfSxcclxuICBsaW1pdE1heDogJ3RydWUnLCAgIC8vIElmIHRydWUsIHRoZSBwb2ludGVyIHdpbGwgbm90IGdvIHBhc3QgdGhlIGVuZCBvZiB0aGUgZ2F1Z2VcclxuICBjb2xvclN0YXJ0OiAnIzZGQURDRicsICAgLy8gQ29sb3JzXHJcbiAgY29sb3JTdG9wOiAnIzhGQzBEQScsICAgIC8vIGp1c3QgZXhwZXJpbWVudCB3aXRoIHRoZW1cclxuICBzdHJva2VDb2xvcjogJyNFMEUwRTAnLCAgIC8vIHRvIHNlZSB3aGljaCBvbmVzIHdvcmsgYmVzdCBmb3IgeW91XHJcbiAgZ2VuZXJhdGVHcmFkaWVudDogdHJ1ZVxyXG59O1xyXG52YXIgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbycpOyAvLyB5b3VyIGNhbnZhcyBlbGVtZW50XHJcblxyXG52YXIgZ2F1Z2UgPSBuZXcgR2F1Z2UodGFyZ2V0KS5zZXRPcHRpb25zKG9wdHMpOyAvLyBjcmVhdGUgc2V4eSBnYXVnZSFcclxuZ2F1Z2UubWF4VmFsdWUgPSAxMDA7IC8vIHNldCBtYXggZ2F1Z2UgdmFsdWVcclxuZ2F1Z2Uuc2V0VGV4dEZpZWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2aWV3LXRleHRmaWVsZCcpKTtcclxuZ2F1Z2UuYW5pbWF0aW9uU3BlZWQgPSAzMjsgLy8gc2V0IGFuaW1hdGlvbiBzcGVlZCAoMzIgaXMgZGVmYXVsdCB2YWx1ZSlcclxuZ2F1Z2Uuc2V0KDApOyAvLyBzZXQgYWN0dWFsIHZhbHVlXHJcblxyXG5mdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XHJcbiAgICB2YXIgaGV4ID0gYy50b1N0cmluZygxNik7XHJcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJnYlRvSGV4KGNvbG9ycykge1xyXG4gICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgoY29sb3JzWzBdKSArIGNvbXBvbmVudFRvSGV4KGNvbG9yc1sxXSkgKyBjb21wb25lbnRUb0hleChjb2xvcnNbMl0pO1xyXG59XHJcblxyXG52YXIgcGVyY2VudENvbG9ycyA9IFtcclxuICAgIHsgcGN0OiAwLjAsIGNvbG9yOiB7IHI6IDB4ZmYsIGc6IDB4MDAsIGI6IDAgfSB9LFxyXG4gICAgeyBwY3Q6IDAuNSwgY29sb3I6IHsgcjogMHhmZiwgZzogMHhmZiwgYjogMCB9IH0sXHJcbiAgICB7IHBjdDogMS4wLCBjb2xvcjogeyByOiAweDAwLCBnOiAweGZmLCBiOiAwIH0gfSBdO1xyXG5cclxudmFyIGdldENvbG9yRm9yUGVyY2VudGFnZSA9IGZ1bmN0aW9uKHBjdCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwZXJjZW50Q29sb3JzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIGlmIChwY3QgPCBwZXJjZW50Q29sb3JzW2ldLnBjdCkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgbG93ZXIgPSBwZXJjZW50Q29sb3JzW2kgLSAxXTtcclxuICAgIHZhciB1cHBlciA9IHBlcmNlbnRDb2xvcnNbaV07XHJcbiAgICB2YXIgcmFuZ2UgPSB1cHBlci5wY3QgLSBsb3dlci5wY3Q7XHJcbiAgICB2YXIgcmFuZ2VQY3QgPSAocGN0IC0gbG93ZXIucGN0KSAvIHJhbmdlO1xyXG4gICAgdmFyIHBjdExvd2VyID0gMSAtIHJhbmdlUGN0O1xyXG4gICAgdmFyIHBjdFVwcGVyID0gcmFuZ2VQY3Q7XHJcbiAgICB2YXIgY29sb3IgPSB7XHJcbiAgICAgICAgcjogTWF0aC5mbG9vcihsb3dlci5jb2xvci5yICogcGN0TG93ZXIgKyB1cHBlci5jb2xvci5yICogcGN0VXBwZXIpLFxyXG4gICAgICAgIGc6IE1hdGguZmxvb3IobG93ZXIuY29sb3IuZyAqIHBjdExvd2VyICsgdXBwZXIuY29sb3IuZyAqIHBjdFVwcGVyKSxcclxuICAgICAgICBiOiBNYXRoLmZsb29yKGxvd2VyLmNvbG9yLmIgKiBwY3RMb3dlciArIHVwcGVyLmNvbG9yLmIgKiBwY3RVcHBlcilcclxuICAgIH07XHJcbiAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmJdO1xyXG4gICAgLy8gb3Igb3V0cHV0IGFzIGhleCBpZiBwcmVmZXJyZWRcclxufSAgXHJcblxyXG52YXIgaW5uID0gMC4wO1xyXG5cdFx0Y29uc29sZS5sb2coZ2F1Z2UpO1xyXG5cclxudmFyIGNvdW50VXAgPSBmdW5jdGlvbigpIHtcclxuXHQvL2NvbnNvbGUubG9nKHJnYlRvSGV4KGdldENvbG9yRm9yUGVyY2VudGFnZSgxLWlubikpKTtcclxuXHRpZiAoaW5uID4gMSkge1xyXG5cdFx0XHRpbm4gPSAwO1xyXG5cdFx0fVxyXG5cdGdhdWdlLm9wdGlvbnMuY29sb3JTdGFydCA9IHJnYlRvSGV4KGdldENvbG9yRm9yUGVyY2VudGFnZSgxLWlubikpO1xyXG5cdGdhdWdlLm9wdGlvbnMuY29sb3JTdG9wID0gcmdiVG9IZXgoZ2V0Q29sb3JGb3JQZXJjZW50YWdlKDEtaW5uKSk7XHJcblx0XHRnYXVnZS5zZXQoaW5uKjEwMCk7XHJcblx0XHRpbm4gKz0gMC4wMTtcclxuXHRcdFxyXG4gICAgICAgICRzY29wZS50aW1lSW5Ncys9IDUwMDtcclxuICAgICAgICAkdGltZW91dChjb3VudFVwLCAxMDApO1xyXG4gICAgfVxyXG5cclxuJHRpbWVvdXQoY291bnRVcCwgMTAwKTtcclxuXHQvLyBTaW1wbGUgUE9TVCByZXF1ZXN0IGV4YW1wbGUgKHBhc3NpbmcgZGF0YSkgOlxyXG5cclxuXHR2YXIgZ2V0VG9kb3MgPSBmdW5jdGlvbigpIHtcclxuXHRcdCRodHRwLmdldCgnaHR0cHM6Ly9yZXN1bHQtZXN0aW1hdG9yLmhlcm9rdWFwcC5jb20vdG9kb3MvZ2V0JykuXHJcblx0XHQgIHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcclxuXHRcdCAgXHRjb25zb2xlLmxvZyhkYXRhKVxyXG5cdFx0ICAgICRzY29wZS50b2RvcyA9IGRhdGEuZGF0YVxyXG5cdFx0XHRcdC8vaHR0cDovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2xhdGxuZz00OC4wLDIyLjAzNTUzODM4JnNlbnNvcj10cnVlXHJcblx0XHRcdFx0YW5ndWxhci5mb3JFYWNoKCRzY29wZS50b2RvcywgZnVuY3Rpb24odG9kbyl7XHJcblx0XHRcdFx0XHR0b2RvLmFkZHJlc3M7XHJcblx0XHRcdFx0XHQkaHR0cC5nZXQoJ2h0dHA6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9sYXRsbmc9Jyt0b2RvLmxhdGl0dWRlKycsJyt0b2RvLmxvbmdpdHVkZSsnJnNlbnNvcj10cnVlJykuXHJcblx0XHRcdFx0XHRcdHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcclxuXHRcdFx0XHRcdFx0XHR0b2RvLmFkZHJlc3MgPSBkYXRhLnJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3M7XHJcblx0XHRcdFx0XHRcdH0pLlxyXG5cdFx0XHRcdFx0XHRlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdCB9KS5cclxuXHRcdCBlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcblxyXG5cclxuXHQkc2NvcGUuZGVsZXRlVG9kbyA9IGZ1bmN0aW9uKHRvZG9JZCkge1xyXG5cdFx0JGh0dHAucG9zdCgnaHR0cHM6Ly9yZXN1bHQtZXN0aW1hdG9yLmhlcm9rdWFwcC5jb20vdG9kb3MvZGVsZXRlJywge3RvZG9zX2lkOiB0b2RvSWR9KS5cclxuXHRcdCAgc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xyXG5cdFx0ICBcdGdldFRvZG9zKClcclxuXHRcdCB9KS5cclxuXHRcdCBlcnJvcihmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xyXG5cdFx0ICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcclxuXHRcdCAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0VG9kb3MoKVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXNoQ3RybCIsIlxyXG52YXIgRnJpZW5kRGV0YWlsQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBGcmllbmRzKSB7XHJcbiAgJHNjb3BlLmZyaWVuZCA9IEZyaWVuZHMuZ2V0KCRzdGF0ZVBhcmFtcy5mcmllbmRJZCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRnJpZW5kRGV0YWlsQ3RybCIsIlxyXG52YXIgRnJpZW5kc0N0cmwgPSBmdW5jdGlvbigkc2NvcGUpIHtcclxuXHJcbiAgICAkc2NvcGUuZGF0YSA9IHtcclxuICAgICAgICByYWRpdXM6IDBcclxuICAgIH07XHJcblxyXG4gICAgJHNjb3BlLnNldE1pc3Npb24gPSBmdW5jdGlvbihyYWQpIHtcclxuICAgICAgICBpZihyYWQ9PT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByYWQ9JHNjb3BlLmRhdGEucmFkaXVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhyYWQpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmRzQ3RybCIsIlxyXG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJjb250cm9sbGVyc1wiLCBbXCJzZXJ2aWNlc1wiXSk7XHJcblxyXG5tb2R1bGUuY29udHJvbGxlcignRGFzaEN0cmwnLCByZXF1aXJlKCcuL0Rhc2hDdHJsJykpO1xyXG5tb2R1bGUuY29udHJvbGxlcignQ2hhdHNDdHJsJywgcmVxdWlyZSgnLi9DaGF0c0N0cmwnKSk7XHJcbm1vZHVsZS5jb250cm9sbGVyKCdDaGF0RGV0YWlsQ3RybCcsIHJlcXVpcmUoJy4vQ2hhdERldGFpbEN0cmwnKSk7XHJcbm1vZHVsZS5jb250cm9sbGVyKCdGcmllbmRzQ3RybCcsIHJlcXVpcmUoJy4vRnJpZW5kc0N0cmwnKSk7XHJcbm1vZHVsZS5jb250cm9sbGVyKCdGcmllbmREZXRhaWxDdHJsJywgcmVxdWlyZSgnLi9GcmllbmREZXRhaWxDdHJsJykpO1xyXG5tb2R1bGUuY29udHJvbGxlcignQWNjb3VudEN0cmwnLCByZXF1aXJlKCcuL0FjY291bnRDdHJsJykpOyIsIlxyXG52YXIgQ2hhdHMgPSBmdW5jdGlvbigpIHtcclxuICAvLyBNaWdodCB1c2UgYSByZXNvdXJjZSBoZXJlIHRoYXQgcmV0dXJucyBhIEpTT04gYXJyYXlcclxuXHJcbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxyXG4gIHZhciBjaGF0cyA9IFt7XHJcbiAgICBpZDogMCxcclxuICAgIG5hbWU6ICdCZW4gU3BhcnJvdycsXHJcbiAgICBsYXN0VGV4dDogJ1lvdSBvbiB5b3VyIHdheT8nLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy81MTQ1NDk4MTE3NjUyMTExMzYvOVNnQXVIZVkucG5nJ1xyXG4gIH0sIHtcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ01heCBMeW54JyxcclxuICAgIGxhc3RUZXh0OiAnSGV5LCBpdFxcJ3MgbWUnLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vYXZhdGFyczMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTEyMTQ/dj0zJnM9NDYwJ1xyXG4gIH0sIHtcclxuICAgIGlkOiAyLFxyXG4gICAgbmFtZTogJ0FuZHJldyBKb3N0bGluJyxcclxuICAgIGxhc3RUZXh0OiAnRGlkIHlvdSBnZXQgdGhlIGljZSBjcmVhbT8nLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTEyNzQzNzgxODE0ODg2NDAvVHRpMGZGVkouanBlZydcclxuICB9LCB7XHJcbiAgICBpZDogMyxcclxuICAgIG5hbWU6ICdBZGFtIEJyYWRsZXlzb24nLFxyXG4gICAgbGFzdFRleHQ6ICdJIHNob3VsZCBidXkgYSBib2F0JyxcclxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDc5MDkwNzk0MDU4Mzc5MjY0Lzg0VEtqX3FhLmpwZWcnXHJcbiAgfSwge1xyXG4gICAgaWQ6IDQsXHJcbiAgICBuYW1lOiAnUGVycnkgR292ZXJub3InLFxyXG4gICAgbGFzdFRleHQ6ICdMb29rIGF0IG15IG11a2x1a3MhJyxcclxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDkxOTk1Mzk4MTM1NzY3MDQwL2llMlpfVjZlLmpwZWcnXHJcbiAgfV07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gY2hhdHM7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbihjaGF0KSB7XHJcbiAgICAgIGNoYXRzLnNwbGljZShjaGF0cy5pbmRleE9mKGNoYXQpLCAxKTtcclxuICAgIH0sXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKGNoYXRJZCkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNoYXRzW2ldLmlkID09PSBwYXJzZUludChjaGF0SWQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gY2hhdHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDaGF0cyIsIlxyXG52YXIgRnJpZW5kcyA9IGZ1bmN0aW9uKCkge1xyXG4gIC8vIE1pZ2h0IHVzZSBhIHJlc291cmNlIGhlcmUgdGhhdCByZXR1cm5zIGEgSlNPTiBhcnJheVxyXG5cclxuICAvLyBTb21lIGZha2UgdGVzdGluZyBkYXRhXHJcbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxyXG4gIHZhciBmcmllbmRzID0gW3tcclxuICAgIGlkOiAwLFxyXG4gICAgbmFtZTogJ0JlbiBTcGFycm93JyxcclxuICAgIG5vdGVzOiAnRW5qb3lzIGRyYXdpbmcgdGhpbmdzJyxcclxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNTE0NTQ5ODExNzY1MjExMTM2LzlTZ0F1SGVZLnBuZydcclxuICB9LCB7XHJcbiAgICBpZDogMSxcclxuICAgIG5hbWU6ICdNYXggTHlueCcsXHJcbiAgICBub3RlczogJ09kZCBvYnNlc3Npb24gd2l0aCBldmVyeXRoaW5nJyxcclxuICAgIGZhY2U6ICdodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzExMjE0P3Y9MyZzPTQ2MCdcclxuICB9LCB7XHJcbiAgICBpZDogMixcclxuICAgIG5hbWU6ICdBbmRyZXcgSm9zdGxlbicsXHJcbiAgICBub3RlczogJ1dlYXJzIGEgc3dlZXQgbGVhdGhlciBKYWNrZXQuIElcXCdtIGEgYml0IGplYWxvdXMnLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTEyNzQzNzgxODE0ODg2NDAvVHRpMGZGVkouanBlZydcclxuICB9LCB7XHJcbiAgICBpZDogMyxcclxuICAgIG5hbWU6ICdBZGFtIEJyYWRsZXlzb24nLFxyXG4gICAgbm90ZXM6ICdJIHRoaW5rIGhlIG5lZWRzIHRvIGJ1eSBhIGJvYXQnLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80NzkwOTA3OTQwNTgzNzkyNjQvODRUS2pfcWEuanBlZydcclxuICB9LCB7XHJcbiAgICBpZDogNCxcclxuICAgIG5hbWU6ICdQZXJyeSBHb3Zlcm5vcicsXHJcbiAgICBub3RlczogJ0p1c3QgdGhlIG5pY2VzdCBndXknLFxyXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTE5OTUzOTgxMzU3NjcwNDAvaWUyWl9WNmUuanBlZydcclxuICB9XTtcclxuXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gZnJpZW5kcztcclxuICAgIH0sXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKGZyaWVuZElkKSB7XHJcbiAgICAgIC8vIFNpbXBsZSBpbmRleCBsb29rdXBcclxuICAgICAgcmV0dXJuIGZyaWVuZHNbZnJpZW5kSWRdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmRzIiwiXHJcbnZhciBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShcInNlcnZpY2VzXCIsIFtdKTtcclxuXHJcbm1vZHVsZS5mYWN0b3J5KCdDaGF0cycsIHJlcXVpcmUoJy4vQ2hhdHMnKSk7XHJcbm1vZHVsZS5mYWN0b3J5KCdGcmllbmRzJywgcmVxdWlyZSgnLi9GcmllbmRzJykpO1xyXG4iXX0=
