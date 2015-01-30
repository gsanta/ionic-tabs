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

var AccountCtrl = function($scope, $location) {
  $scope.settings = {
    enableFriends: true
  };

    $scope.data = {
        radius: 0,
        startPos: {}
    };


    $scope.marker = null;

    var mapProp = {
	    center:new google.maps.LatLng(51.508742,-0.120850),
	    zoom:5,
	    mapTypeId:google.maps.MapTypeId.ROADMAP
	  };


    $scope.setMission = function() {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                console.log("new"+position.coords.latitude + ',' + position.coords.longitude);
                $scope.data.startPos.latitude = position.coords.latitude;
                $scope.data.startPos.longitude = position.coords.longitude;

                window.startPos = {
                    lat: $scope.data.startPos.latitude,
                    lon: $scope.data.startPos.longitude
                }
                window.destPos = $scope.customPos
                $location.path('/tab/dash');
            },
            function() {
                alert('Error getting location');
            }, {timeout: 15000, enableHighAccuracy: false});
    }

  	$scope.initMap = function() {

	    $scope.map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
		google.maps.event.addListener($scope.map, 'mousedown', function(event) {
		    console.log(event.latLng);
		    if($scope.marker == null) {
		      $scope.marker = new google.maps.Marker({
			      position: event.latLng,
			      map: $scope.map,
			      title: 'Hello World!',
			      draggable:true
			  });

			  	google.maps.event.addListener($scope.marker, 'dragend', function() 
				{
				    $scope.customPos = {
				    	lat: $scope.marker.getPosition().lat(),
				    	lon: $scope.marker.getPosition().lng()
				    }
				});

		  	}
		})
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
},{}],"/home/student/dev/ionic-tabs/www/js/controllers/FriendDetailCtrl.js":[function(require,module,exports){

var FriendDetailCtrl = function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
}

module.exports = FriendDetailCtrl
},{}],"/home/student/dev/ionic-tabs/www/js/controllers/FriendsCtrl.js":[function(require,module,exports){

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ3d3cvanMvYXBwLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0FjY291bnRDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0NoYXREZXRhaWxDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0NoYXRzQ3RybC5qcyIsInd3dy9qcy9jb250cm9sbGVycy9EYXNoQ3RybC5qcyIsInd3dy9qcy9jb250cm9sbGVycy9GcmllbmREZXRhaWxDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0ZyaWVuZHNDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL2luZGV4LmpzIiwid3d3L2pzL3NlcnZpY2VzL0NoYXRzLmpzIiwid3d3L2pzL3NlcnZpY2VzL0ZyaWVuZHMuanMiLCJ3d3cvanMvc2VydmljZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi9zZXJ2aWNlcycpO1xucmVxdWlyZSgnLi9jb250cm9sbGVycycpO1xuXG4vLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG4vLyAnc3RhcnRlci5zZXJ2aWNlcycgaXMgZm91bmQgaW4gc2VydmljZXMuanNcbi8vICdzdGFydGVyLmNvbnRyb2xsZXJzJyBpcyBmb3VuZCBpbiBjb250cm9sbGVycy5qc1xuYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXInLCBbJ2lvbmljJywgJ2NvbnRyb2xsZXJzJywgJ3NlcnZpY2VzJ10pXG5cbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgIC8vIG9yZy5hcGFjaGUuY29yZG92YS5zdGF0dXNiYXIgcmVxdWlyZWRcbiAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xufSlcblxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgLy8gSW9uaWMgdXNlcyBBbmd1bGFyVUkgUm91dGVyIHdoaWNoIHVzZXMgdGhlIGNvbmNlcHQgb2Ygc3RhdGVzXG4gIC8vIExlYXJuIG1vcmUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItdWkvdWktcm91dGVyXG4gIC8vIFNldCB1cCB0aGUgdmFyaW91cyBzdGF0ZXMgd2hpY2ggdGhlIGFwcCBjYW4gYmUgaW4uXG4gIC8vIEVhY2ggc3RhdGUncyBjb250cm9sbGVyIGNhbiBiZSBmb3VuZCBpbiBjb250cm9sbGVycy5qc1xuICAkc3RhdGVQcm92aWRlclxuXG4gIC8vIHNldHVwIGFuIGFic3RyYWN0IHN0YXRlIGZvciB0aGUgdGFicyBkaXJlY3RpdmVcbiAgICAuc3RhdGUoJ3RhYicsIHtcbiAgICB1cmw6IFwiL3RhYlwiLFxuICAgIGFic3RyYWN0OiB0cnVlLFxuICAgIHRlbXBsYXRlVXJsOiBcInRlbXBsYXRlcy90YWJzLmh0bWxcIlxuICB9KVxuXG4gIC8vIEVhY2ggdGFiIGhhcyBpdHMgb3duIG5hdiBoaXN0b3J5IHN0YWNrOlxuXG4gIC5zdGF0ZSgndGFiLmRhc2gnLCB7XG4gICAgdXJsOiAnL2Rhc2gnLFxuICAgIHZpZXdzOiB7XG4gICAgICAndGFiLWRhc2gnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1kYXNoLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGFzaEN0cmwnXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIC5zdGF0ZSgndGFiLmNoYXRzJywge1xuICAgICAgdXJsOiAnL2NoYXRzJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICd0YWItY2hhdHMnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFiLWNoYXRzLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdDaGF0c0N0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIC5zdGF0ZSgndGFiLmNoYXQtZGV0YWlsJywge1xuICAgICAgdXJsOiAnL2NoYXRzLzpjaGF0SWQnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ3RhYi1jaGF0cyc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jaGF0LWRldGFpbC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhdERldGFpbEN0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gIC5zdGF0ZSgndGFiLmZyaWVuZHMnLCB7XG4gICAgICB1cmw6ICcvZnJpZW5kcycsXG4gICAgICB2aWV3czoge1xuICAgICAgICAndGFiLWZyaWVuZHMnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFiLWZyaWVuZHMuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0ZyaWVuZHNDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ3RhYi5mcmllbmQtZGV0YWlsJywge1xuICAgICAgdXJsOiAnL2ZyaWVuZC86ZnJpZW5kSWQnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ3RhYi1mcmllbmRzJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2ZyaWVuZC1kZXRhaWwuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0ZyaWVuZERldGFpbEN0cmwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gIC5zdGF0ZSgndGFiLmFjY291bnQnLCB7XG4gICAgdXJsOiAnL2FjY291bnQnLFxuICAgIHZpZXdzOiB7XG4gICAgICAndGFiLWFjY291bnQnOiB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1hY2NvdW50Lmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnQWNjb3VudEN0cmwnXG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBpZiBub25lIG9mIHRoZSBhYm92ZSBzdGF0ZXMgYXJlIG1hdGNoZWQsIHVzZSB0aGlzIGFzIHRoZSBmYWxsYmFja1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvdGFiL2Rhc2gnKTtcblxufSk7XG4iLCJcbnZhciBBY2NvdW50Q3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uKSB7XG4gICRzY29wZS5zZXR0aW5ncyA9IHtcbiAgICBlbmFibGVGcmllbmRzOiB0cnVlXG4gIH07XG5cbiAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgcmFkaXVzOiAwLFxuICAgICAgICBzdGFydFBvczoge31cbiAgICB9O1xuXG5cbiAgICAkc2NvcGUubWFya2VyID0gbnVsbDtcblxuICAgIHZhciBtYXBQcm9wID0ge1xuXHQgICAgY2VudGVyOm5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTEuNTA4NzQyLC0wLjEyMDg1MCksXG5cdCAgICB6b29tOjUsXG5cdCAgICBtYXBUeXBlSWQ6Z29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVBcblx0ICB9O1xuXG5cbiAgICAkc2NvcGUuc2V0TWlzc2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKFxuICAgICAgICAgICAgZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ld1wiK3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnN0YXJ0UG9zLmxhdGl0dWRlID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuICAgICAgICAgICAgICAgICRzY29wZS5kYXRhLnN0YXJ0UG9zLmxvbmdpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGU7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuc3RhcnRQb3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxhdDogJHNjb3BlLmRhdGEuc3RhcnRQb3MubGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgIGxvbjogJHNjb3BlLmRhdGEuc3RhcnRQb3MubG9uZ2l0dWRlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdpbmRvdy5kZXN0UG9zID0gJHNjb3BlLmN1c3RvbVBvc1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvdGFiL2Rhc2gnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3IgZ2V0dGluZyBsb2NhdGlvbicpO1xuICAgICAgICAgICAgfSwge3RpbWVvdXQ6IDE1MDAwLCBlbmFibGVIaWdoQWNjdXJhY3k6IGZhbHNlfSk7XG4gICAgfVxuXG4gIFx0JHNjb3BlLmluaXRNYXAgPSBmdW5jdGlvbigpIHtcblxuXHQgICAgJHNjb3BlLm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnb29nbGVNYXBcIiksbWFwUHJvcCk7XG5cdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoJHNjb3BlLm1hcCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0ICAgIGNvbnNvbGUubG9nKGV2ZW50LmxhdExuZyk7XG5cdFx0ICAgIGlmKCRzY29wZS5tYXJrZXIgPT0gbnVsbCkge1xuXHRcdCAgICAgICRzY29wZS5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdCAgICAgIHBvc2l0aW9uOiBldmVudC5sYXRMbmcsXG5cdFx0XHQgICAgICBtYXA6ICRzY29wZS5tYXAsXG5cdFx0XHQgICAgICB0aXRsZTogJ0hlbGxvIFdvcmxkIScsXG5cdFx0XHQgICAgICBkcmFnZ2FibGU6dHJ1ZVxuXHRcdFx0ICB9KTtcblxuXHRcdFx0ICBcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKCRzY29wZS5tYXJrZXIsICdkcmFnZW5kJywgZnVuY3Rpb24oKSBcblx0XHRcdFx0e1xuXHRcdFx0XHQgICAgJHNjb3BlLmN1c3RvbVBvcyA9IHtcblx0XHRcdFx0ICAgIFx0bGF0OiAkc2NvcGUubWFya2VyLmdldFBvc2l0aW9uKCkubGF0KCksXG5cdFx0XHRcdCAgICBcdGxvbjogJHNjb3BlLm1hcmtlci5nZXRQb3NpdGlvbigpLmxuZygpXG5cdFx0XHRcdCAgICB9XG5cdFx0XHRcdH0pO1xuXG5cdFx0ICBcdH1cblx0XHR9KVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFjY291bnRDdHJsIiwiXG52YXIgQ2hhdERldGFpbEN0cmwgPSBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgQ2hhdHMpIHtcbiAgJHNjb3BlLmNoYXQgPSBDaGF0cy5nZXQoJHN0YXRlUGFyYW1zLmNoYXRJZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhdERldGFpbEN0cmwiLCJcbnZhciBDaGF0c0N0cmwgPSBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24pIHtcbiAgXG4gICRzY29wZS50b2RvID0ge31cblxuICAkc2NvcGUuc2VuZFRvU2VydmVyID0gZnVuY3Rpb24oKSB7XG5cblxuXHQgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXG5cdCAgICAgIGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG5cdCAgICAgICAgICBcdGNvbnNvbGUubG9nKFwibmV3XCIrcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgJywnICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XG5cdCAgICAgICAgICAgICRzY29wZS50b2RvLmxhdGl0dWRlID0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlO1xuXHQgICAgICAgICAgICAkc2NvcGUudG9kby5sb25naXR1ZGUgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuXG5cdCAgICAgICAgICBcdCRodHRwLnBvc3QoJ2h0dHBzOi8vcmVzdWx0LWVzdGltYXRvci5oZXJva3VhcHAuY29tL3RvZG9zL2FkZCcsICRzY29wZS50b2RvKS5cblx0XHRcdFx0ICBzdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0XHRcdCAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuXHRcdFx0XHRcdFx0JHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0IH0pLlxuXHRcdFx0XHQgZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHRcdFx0ICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcblx0XHRcdFx0ICAgIC8vIG9yIHNlcnZlciByZXR1cm5zIHJlc3BvbnNlIHdpdGggYW4gZXJyb3Igc3RhdHVzLlxuXHRcdFx0XHR9KTtcblx0ICAgICAgfSxcblx0ICAgICAgZnVuY3Rpb24oKSB7XG5cdCAgICAgICAgICBhbGVydCgnRXJyb3IgZ2V0dGluZyBsb2NhdGlvbicpO1xuXHQgICAgICB9LCB7dGltZW91dDogMTUwMDAsIGVuYWJsZUhpZ2hBY2N1cmFjeTogZmFsc2V9KTtcbiAgXHRcbiAgfVxuXG4gICAgLypcbiAgICAgICAgc3RhcnQgPSB7XG4gICAgICAgICAgICBsYXRpdHVkZTogeFxuICAgICAgICAgICAgbG9uZ2l0dWRlOiB5XG4gICAgICAgIH1cbiAgICAgZ29hbCA9IHtcbiAgICAgICAgbGF0aXR1ZGU6IHhcbiAgICAgICAgbG9uZ2l0dWRlOiB5XG4gICAgIH1cbiAgICAgKi9cbiAgICB3aW5kb3cuZ2V0RGlmZiA9IGZ1bmN0aW9uKHN0YXJ0LCBnb2FsKSB7XG5cblxuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKFxuICAgICAgICAgICAgZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ld1wiK3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZTpwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGZ1bGxkaWZmPSBnZXRkaWZjb29yZChzdGFydCwgZ29hbCkqKDMvMik7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRkaWYgPSBnZXRkaWZjb29yZChjdXJyZW50LCBnb2FsKTtcbiAgICAgICAgICAgICAgICB2YXIga296ID0gZnVsbGRpZmYtY3VycmVudGRpZjtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGtvei9mdWxsZGlmZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtvei9mdWxsZGlmZjtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJvciBnZXR0aW5nIGxvY2F0aW9uJyk7XG4gICAgICAgICAgICB9LCB7dGltZW91dDogMTUwMDAsIGVuYWJsZUhpZ2hBY2N1cmFjeTogZmFsc2V9KTtcblxuICAgIH1cblxuICAgIHZhciBnZXRkaWZjb29yZCA9IGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgICBpZiAodHlwZW9mKE51bWJlci5wcm90b3R5cGUudG9SYWQpID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBOdW1iZXIucHJvdG90eXBlLnRvUmFkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBsYXQxID0gYS5sYXRpdHVkZTtcbiAgICAgICAgdmFyIGxvbjEgPWEubG9uZ2l0dWRlO1xuICAgICAgICB2YXIgbGF0MiA9IGIubGF0aXR1ZGU7XG4gICAgICAgIHZhciBsb24yID1iLmxvbmdpdHVkZTtcbiAgICAgICAgdmFyIFIgPSA2MzcxOyAvLyBrbVxuICAgICAgICB2YXIgz4YxID0gbGF0MS50b1JhZCgpO1xuICAgICAgICB2YXIgz4YyID0gbGF0Mi50b1JhZCgpO1xuICAgICAgICB2YXIgzpTPhiA9IChsYXQyLWxhdDEpLnRvUmFkKCk7XG4gICAgICAgIHZhciDOlM67ID0gKGxvbjItbG9uMSkudG9SYWQoKTtcblxuICAgICAgICB2YXIgYSA9IE1hdGguc2luKM6Uz4YvMikgKiBNYXRoLnNpbijOlM+GLzIpICtcbiAgICAgICAgICAgIE1hdGguY29zKM+GMSkgKiBNYXRoLmNvcyjPhjIpICpcbiAgICAgICAgICAgIE1hdGguc2luKM6UzrsvMikgKiBNYXRoLnNpbijOlM67LzIpO1xuICAgICAgICB2YXIgYyA9IDIgKiBNYXRoLmF0YW4yKE1hdGguc3FydChhKSwgTWF0aC5zcXJ0KDEtYSkpO1xuXG4gICAgICAgcmV0dXJuIFIgKiBjO1xuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXRzQ3RybCIsInZhciBEYXNoQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRsb2NhdGlvbiwgJHdpbmRvdywgJHRpbWVvdXQpIHtcblx0dmFyIG9wdHMgPSB7XG4gIGxpbmVzOiAxLCAvLyBUaGUgbnVtYmVyIG9mIGxpbmVzIHRvIGRyYXdcbiAgYW5nbGU6IDAuMCwgLy8gVGhlIGxlbmd0aCBvZiBlYWNoIGxpbmVcbiAgbGluZVdpZHRoOiAwLjQ0LCAvLyBUaGUgbGluZSB0aGlja25lc3NcbiAgcG9pbnRlcjoge1xuICAgIGxlbmd0aDogMC43LCAvLyBUaGUgcmFkaXVzIG9mIHRoZSBpbm5lciBjaXJjbGVcbiAgICBzdHJva2VXaWR0aDogMC4wMjAsIC8vIFRoZSByb3RhdGlvbiBvZmZzZXRcbiAgICBjb2xvcjogJyMwMDAwMDAnIC8vIEZpbGwgY29sb3JcbiAgfSxcbiAgbGltaXRNYXg6ICd0cnVlJywgICAvLyBJZiB0cnVlLCB0aGUgcG9pbnRlciB3aWxsIG5vdCBnbyBwYXN0IHRoZSBlbmQgb2YgdGhlIGdhdWdlXG4gIGNvbG9yU3RhcnQ6ICcjNkZBRENGJywgICAvLyBDb2xvcnNcbiAgY29sb3JTdG9wOiAnIzhGQzBEQScsICAgIC8vIGp1c3QgZXhwZXJpbWVudCB3aXRoIHRoZW1cbiAgc3Ryb2tlQ29sb3I6ICcjRTBFMEUwJywgICAvLyB0byBzZWUgd2hpY2ggb25lcyB3b3JrIGJlc3QgZm9yIHlvdVxuICBnZW5lcmF0ZUdyYWRpZW50OiB0cnVlXG59O1xudmFyIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKTsgLy8geW91ciBjYW52YXMgZWxlbWVudFxuXG52YXIgZ2F1Z2UgPSBuZXcgR2F1Z2UodGFyZ2V0KS5zZXRPcHRpb25zKG9wdHMpOyAvLyBjcmVhdGUgc2V4eSBnYXVnZSFcbmdhdWdlLm1heFZhbHVlID0gMTAwOyAvLyBzZXQgbWF4IGdhdWdlIHZhbHVlXG5nYXVnZS5zZXRUZXh0RmllbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXZpZXctdGV4dGZpZWxkJykpO1xuZ2F1Z2UuYW5pbWF0aW9uU3BlZWQgPSAzMjsgLy8gc2V0IGFuaW1hdGlvbiBzcGVlZCAoMzIgaXMgZGVmYXVsdCB2YWx1ZSlcbmdhdWdlLnNldCgwKTsgLy8gc2V0IGFjdHVhbCB2YWx1ZVxuXG5mdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XG4gICAgdmFyIGhleCA9IGMudG9TdHJpbmcoMTYpO1xuICAgIHJldHVybiBoZXgubGVuZ3RoID09IDEgPyBcIjBcIiArIGhleCA6IGhleDtcbn1cblxuZnVuY3Rpb24gcmdiVG9IZXgoY29sb3JzKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgoY29sb3JzWzBdKSArIGNvbXBvbmVudFRvSGV4KGNvbG9yc1sxXSkgKyBjb21wb25lbnRUb0hleChjb2xvcnNbMl0pO1xufVxuXG52YXIgcGVyY2VudENvbG9ycyA9IFtcbiAgICB7IHBjdDogMC4wLCBjb2xvcjogeyByOiAweGZmLCBnOiAweDAwLCBiOiAwIH0gfSxcbiAgICB7IHBjdDogMC41LCBjb2xvcjogeyByOiAweGZmLCBnOiAweGZmLCBiOiAwIH0gfSxcbiAgICB7IHBjdDogMS4wLCBjb2xvcjogeyByOiAweDAwLCBnOiAweGZmLCBiOiAwIH0gfSBdO1xuXG52YXIgZ2V0Q29sb3JGb3JQZXJjZW50YWdlID0gZnVuY3Rpb24ocGN0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwZXJjZW50Q29sb3JzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBpZiAocGN0IDwgcGVyY2VudENvbG9yc1tpXS5wY3QpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBsb3dlciA9IHBlcmNlbnRDb2xvcnNbaSAtIDFdO1xuICAgIHZhciB1cHBlciA9IHBlcmNlbnRDb2xvcnNbaV07XG4gICAgdmFyIHJhbmdlID0gdXBwZXIucGN0IC0gbG93ZXIucGN0O1xuICAgIHZhciByYW5nZVBjdCA9IChwY3QgLSBsb3dlci5wY3QpIC8gcmFuZ2U7XG4gICAgdmFyIHBjdExvd2VyID0gMSAtIHJhbmdlUGN0O1xuICAgIHZhciBwY3RVcHBlciA9IHJhbmdlUGN0O1xuICAgIHZhciBjb2xvciA9IHtcbiAgICAgICAgcjogTWF0aC5mbG9vcihsb3dlci5jb2xvci5yICogcGN0TG93ZXIgKyB1cHBlci5jb2xvci5yICogcGN0VXBwZXIpLFxuICAgICAgICBnOiBNYXRoLmZsb29yKGxvd2VyLmNvbG9yLmcgKiBwY3RMb3dlciArIHVwcGVyLmNvbG9yLmcgKiBwY3RVcHBlciksXG4gICAgICAgIGI6IE1hdGguZmxvb3IobG93ZXIuY29sb3IuYiAqIHBjdExvd2VyICsgdXBwZXIuY29sb3IuYiAqIHBjdFVwcGVyKVxuICAgIH07XG4gICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iXTtcbiAgICAvLyBvciBvdXRwdXQgYXMgaGV4IGlmIHByZWZlcnJlZFxufSAgXG5cbnZhciBpbm4gPSAwLjA7XG5cdFx0Y29uc29sZS5sb2coZ2F1Z2UpO1xuXG52YXIgY291bnRVcCA9IGZ1bmN0aW9uKCkge1xuXHQvL2NvbnNvbGUubG9nKHJnYlRvSGV4KGdldENvbG9yRm9yUGVyY2VudGFnZSgxLWlubikpKTtcblx0aWYgKGlubiA+IDEpIHtcblx0XHRcdGlubiA9IDA7XG5cdFx0fVxuXHRnYXVnZS5vcHRpb25zLmNvbG9yU3RhcnQgPSByZ2JUb0hleChnZXRDb2xvckZvclBlcmNlbnRhZ2UoMS1pbm4pKTtcblx0Z2F1Z2Uub3B0aW9ucy5jb2xvclN0b3AgPSByZ2JUb0hleChnZXRDb2xvckZvclBlcmNlbnRhZ2UoMS1pbm4pKTtcblx0XHRnYXVnZS5zZXQoaW5uKjEwMCk7XG5cdFx0aW5uICs9IDAuMDE7XG5cdFx0XG4gICAgICAgICRzY29wZS50aW1lSW5Ncys9IDUwMDtcbiAgICAgICAgJHRpbWVvdXQoY291bnRVcCwgMTAwKTtcbiAgICB9XG5cbiR0aW1lb3V0KGNvdW50VXAsIDEwMCk7XG5cdC8vIFNpbXBsZSBQT1NUIHJlcXVlc3QgZXhhbXBsZSAocGFzc2luZyBkYXRhKSA6XG5cblx0dmFyIGdldFRvZG9zID0gZnVuY3Rpb24oKSB7XG5cdFx0JGh0dHAuZ2V0KCdodHRwczovL3Jlc3VsdC1lc3RpbWF0b3IuaGVyb2t1YXBwLmNvbS90b2Rvcy9nZXQnKS5cblx0XHQgIHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHQgIFx0Y29uc29sZS5sb2coZGF0YSlcblx0XHQgICAgJHNjb3BlLnRvZG9zID0gZGF0YS5kYXRhXG5cdFx0XHRcdC8vaHR0cDovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2xhdGxuZz00OC4wLDIyLjAzNTUzODM4JnNlbnNvcj10cnVlXG5cdFx0XHRcdGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUudG9kb3MsIGZ1bmN0aW9uKHRvZG8pe1xuXHRcdFx0XHRcdHRvZG8uYWRkcmVzcztcblx0XHRcdFx0XHQkaHR0cC5nZXQoJ2h0dHA6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9sYXRsbmc9Jyt0b2RvLmxhdGl0dWRlKycsJyt0b2RvLmxvbmdpdHVkZSsnJnNlbnNvcj10cnVlJykuXG5cdFx0XHRcdFx0XHRzdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0XHRcdFx0XHRcdHRvZG8uYWRkcmVzcyA9IGRhdGEucmVzdWx0c1swXS5mb3JtYXR0ZWRfYWRkcmVzcztcblx0XHRcdFx0XHRcdH0pLlxuXHRcdFx0XHRcdFx0ZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdCB9KS5cblx0XHQgZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHR9KTtcblxuXHR9XG5cblxuXG5cdCRzY29wZS5kZWxldGVUb2RvID0gZnVuY3Rpb24odG9kb0lkKSB7XG5cdFx0JGh0dHAucG9zdCgnaHR0cHM6Ly9yZXN1bHQtZXN0aW1hdG9yLmhlcm9rdWFwcC5jb20vdG9kb3MvZGVsZXRlJywge3RvZG9zX2lkOiB0b2RvSWR9KS5cblx0XHQgIHN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHQgIFx0Z2V0VG9kb3MoKVxuXHRcdCB9KS5cblx0XHQgZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcblx0XHQgICAgLy8gY2FsbGVkIGFzeW5jaHJvbm91c2x5IGlmIGFuIGVycm9yIG9jY3Vyc1xuXHRcdCAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cblx0XHR9KTtcblx0fVxuXG5cdGdldFRvZG9zKClcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERhc2hDdHJsIiwiXG52YXIgRnJpZW5kRGV0YWlsQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBGcmllbmRzKSB7XG4gICRzY29wZS5mcmllbmQgPSBGcmllbmRzLmdldCgkc3RhdGVQYXJhbXMuZnJpZW5kSWQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZyaWVuZERldGFpbEN0cmwiLCJcbnZhciBGcmllbmRzQ3RybCA9IGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uKSB7XG5cbiAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgcmFkaXVzOiAwLFxuICAgICAgICBzdGFydFBvczoge31cbiAgICB9O1xuXG4gICAgJHNjb3BlLnNldE1pc3Npb24gPSBmdW5jdGlvbihyYWQpIHtcbiAgICAgICAgaWYocmFkPT09dW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJhZD0kc2NvcGUuZGF0YS5yYWRpdXM7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLmRhdGEucmFkaXVzID0gcmFkO1xuICAgICAgICBjb25zb2xlLmxvZyhyYWQpO1xuXG4gICAgICAgIGluaXRNaXNzaW9uKClcbiAgICB9XG5cbiAgICAkc2NvcGUudG9NYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsZWZkYWZzZGRmXCIpXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvdGFiL2FjY291bnQnKTtcbiAgICB9XG5cbiAgICB2YXIgaW5pdE1pc3Npb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcbiAgICAgICAgICAgIGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZXdcIitwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zdGFydFBvcy5sYXRpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zdGFydFBvcy5sb25naXR1ZGUgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuXG4gICAgICAgICAgICAgICAgd2luZG93LnN0YXJ0UG9zID0ge1xuICAgICAgICAgICAgICAgICAgICBsYXQ6ICRzY29wZS5kYXRhLnN0YXJ0UG9zLmxhdGl0dWRlLFxuICAgICAgICAgICAgICAgICAgICBsb246ICRzY29wZS5kYXRhLnN0YXJ0UG9zLmxvbmdpdHVkZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aW5kb3cuZGVzdFBvcyA9IGdlbmVyYXRlUmFuZG9tQ29vcmQoJHNjb3BlLmRhdGEuc3RhcnRQb3MubGF0aXR1ZGUsICRzY29wZS5kYXRhLnN0YXJ0UG9zLmxvbmdpdHVkZSwgJHNjb3BlLmRhdGEucmFkaXVzKTtcblxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvdGFiL2Rhc2gnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3IgZ2V0dGluZyBsb2NhdGlvbicpO1xuICAgICAgICAgICAgfSwge3RpbWVvdXQ6IDE1MDAwLCBlbmFibGVIaWdoQWNjdXJhY3k6IGZhbHNlfSk7XG4gICAgfVxuXG4gICAgdmFyIGdlbmVyYXRlUmFuZG9tQ29vcmQgPSBmdW5jdGlvbihsYXQsIGxvbiwgcmFkaXVzKSB7XG4gICAgICAgIHZhciByID0gcmFkaXVzLzExMTMwMCAvLyA9IDEwMCBtZXRlcnNcbiAgICAgICAgICAgICwgeTAgPSBsYXRcbiAgICAgICAgICAgICwgeDAgPSBsb25cbiAgICAgICAgICAgICwgdSA9IE1hdGgucmFuZG9tKClcbiAgICAgICAgICAgICwgdiA9IE1hdGgucmFuZG9tKClcbiAgICAgICAgICAgICwgdyA9IHIgKiBNYXRoLnNxcnQodSlcbiAgICAgICAgICAgICwgdCA9IDIgKiBNYXRoLlBJICogdlxuICAgICAgICAgICAgLCB4ID0gdyAqIE1hdGguY29zKHQpXG4gICAgICAgICAgICAsIHkxID0gdyAqIE1hdGguc2luKHQpXG4gICAgICAgICAgICAsIHgxID0geCAvIE1hdGguY29zKHkwKVxuXG4gICAgICAgIG5ld1kgPSB5MCArIHkxXG4gICAgICAgIG5ld1ggPSB4MCArIHgxXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsYXQ6IG5ld1ksXG4gICAgICAgICAgICBsb246IG5ld1hcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy5nZW5lcmF0ZUNvb3JkID0gZ2VuZXJhdGVSYW5kb21Db29yZDtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZyaWVuZHNDdHJsIiwiXG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJjb250cm9sbGVyc1wiLCBbXCJzZXJ2aWNlc1wiXSk7XG5cbm1vZHVsZS5jb250cm9sbGVyKCdEYXNoQ3RybCcsIHJlcXVpcmUoJy4vRGFzaEN0cmwnKSk7XG5tb2R1bGUuY29udHJvbGxlcignQ2hhdHNDdHJsJywgcmVxdWlyZSgnLi9DaGF0c0N0cmwnKSk7XG5tb2R1bGUuY29udHJvbGxlcignQ2hhdERldGFpbEN0cmwnLCByZXF1aXJlKCcuL0NoYXREZXRhaWxDdHJsJykpO1xubW9kdWxlLmNvbnRyb2xsZXIoJ0ZyaWVuZHNDdHJsJywgcmVxdWlyZSgnLi9GcmllbmRzQ3RybCcpKTtcbm1vZHVsZS5jb250cm9sbGVyKCdGcmllbmREZXRhaWxDdHJsJywgcmVxdWlyZSgnLi9GcmllbmREZXRhaWxDdHJsJykpO1xubW9kdWxlLmNvbnRyb2xsZXIoJ0FjY291bnRDdHJsJywgcmVxdWlyZSgnLi9BY2NvdW50Q3RybCcpKTsiLCJcbnZhciBDaGF0cyA9IGZ1bmN0aW9uKCkge1xuICAvLyBNaWdodCB1c2UgYSByZXNvdXJjZSBoZXJlIHRoYXQgcmV0dXJucyBhIEpTT04gYXJyYXlcblxuICAvLyBTb21lIGZha2UgdGVzdGluZyBkYXRhXG4gIHZhciBjaGF0cyA9IFt7XG4gICAgaWQ6IDAsXG4gICAgbmFtZTogJ0JlbiBTcGFycm93JyxcbiAgICBsYXN0VGV4dDogJ1lvdSBvbiB5b3VyIHdheT8nLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNTE0NTQ5ODExNzY1MjExMTM2LzlTZ0F1SGVZLnBuZydcbiAgfSwge1xuICAgIGlkOiAxLFxuICAgIG5hbWU6ICdNYXggTHlueCcsXG4gICAgbGFzdFRleHQ6ICdIZXksIGl0XFwncyBtZScsXG4gICAgZmFjZTogJ2h0dHBzOi8vYXZhdGFyczMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTEyMTQ/dj0zJnM9NDYwJ1xuICB9LCB7XG4gICAgaWQ6IDIsXG4gICAgbmFtZTogJ0FuZHJldyBKb3N0bGluJyxcbiAgICBsYXN0VGV4dDogJ0RpZCB5b3UgZ2V0IHRoZSBpY2UgY3JlYW0/JyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzQ5MTI3NDM3ODE4MTQ4ODY0MC9UdGkwZkZWSi5qcGVnJ1xuICB9LCB7XG4gICAgaWQ6IDMsXG4gICAgbmFtZTogJ0FkYW0gQnJhZGxleXNvbicsXG4gICAgbGFzdFRleHQ6ICdJIHNob3VsZCBidXkgYSBib2F0JyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzQ3OTA5MDc5NDA1ODM3OTI2NC84NFRLal9xYS5qcGVnJ1xuICB9LCB7XG4gICAgaWQ6IDQsXG4gICAgbmFtZTogJ1BlcnJ5IEdvdmVybm9yJyxcbiAgICBsYXN0VGV4dDogJ0xvb2sgYXQgbXkgbXVrbHVrcyEnLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDkxOTk1Mzk4MTM1NzY3MDQwL2llMlpfVjZlLmpwZWcnXG4gIH1dO1xuXG4gIHJldHVybiB7XG4gICAgYWxsOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjaGF0cztcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oY2hhdCkge1xuICAgICAgY2hhdHMuc3BsaWNlKGNoYXRzLmluZGV4T2YoY2hhdCksIDEpO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihjaGF0SWQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNoYXRzW2ldLmlkID09PSBwYXJzZUludChjaGF0SWQpKSB7XG4gICAgICAgICAgcmV0dXJuIGNoYXRzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDaGF0cyIsIlxudmFyIEZyaWVuZHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gTWlnaHQgdXNlIGEgcmVzb3VyY2UgaGVyZSB0aGF0IHJldHVybnMgYSBKU09OIGFycmF5XG5cbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxuICAvLyBTb21lIGZha2UgdGVzdGluZyBkYXRhXG4gIHZhciBmcmllbmRzID0gW3tcbiAgICBpZDogMCxcbiAgICBuYW1lOiAnQmVuIFNwYXJyb3cnLFxuICAgIG5vdGVzOiAnRW5qb3lzIGRyYXdpbmcgdGhpbmdzJyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzUxNDU0OTgxMTc2NTIxMTEzNi85U2dBdUhlWS5wbmcnXG4gIH0sIHtcbiAgICBpZDogMSxcbiAgICBuYW1lOiAnTWF4IEx5bngnLFxuICAgIG5vdGVzOiAnT2RkIG9ic2Vzc2lvbiB3aXRoIGV2ZXJ5dGhpbmcnLFxuICAgIGZhY2U6ICdodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzExMjE0P3Y9MyZzPTQ2MCdcbiAgfSwge1xuICAgIGlkOiAyLFxuICAgIG5hbWU6ICdBbmRyZXcgSm9zdGxlbicsXG4gICAgbm90ZXM6ICdXZWFycyBhIHN3ZWV0IGxlYXRoZXIgSmFja2V0LiBJXFwnbSBhIGJpdCBqZWFsb3VzJyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzQ5MTI3NDM3ODE4MTQ4ODY0MC9UdGkwZkZWSi5qcGVnJ1xuICB9LCB7XG4gICAgaWQ6IDMsXG4gICAgbmFtZTogJ0FkYW0gQnJhZGxleXNvbicsXG4gICAgbm90ZXM6ICdJIHRoaW5rIGhlIG5lZWRzIHRvIGJ1eSBhIGJvYXQnLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDc5MDkwNzk0MDU4Mzc5MjY0Lzg0VEtqX3FhLmpwZWcnXG4gIH0sIHtcbiAgICBpZDogNCxcbiAgICBuYW1lOiAnUGVycnkgR292ZXJub3InLFxuICAgIG5vdGVzOiAnSnVzdCB0aGUgbmljZXN0IGd1eScsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTE5OTUzOTgxMzU3NjcwNDAvaWUyWl9WNmUuanBlZydcbiAgfV07XG5cblxuICByZXR1cm4ge1xuICAgIGFsbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZnJpZW5kcztcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24oZnJpZW5kSWQpIHtcbiAgICAgIC8vIFNpbXBsZSBpbmRleCBsb29rdXBcbiAgICAgIHJldHVybiBmcmllbmRzW2ZyaWVuZElkXTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmRzIiwiXG52YXIgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJzZXJ2aWNlc1wiLCBbXSk7XG5cbm1vZHVsZS5mYWN0b3J5KCdDaGF0cycsIHJlcXVpcmUoJy4vQ2hhdHMnKSk7XG5tb2R1bGUuZmFjdG9yeSgnRnJpZW5kcycsIHJlcXVpcmUoJy4vRnJpZW5kcycpKTtcbiJdfQ==
