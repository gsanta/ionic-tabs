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
  $urlRouterProvider.otherwise('/tab/friends');

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


    window.tavolsag = 0;

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

                //console.log(koz/fulldiff);
                window.tavolsag = koz/fulldiff;

            },
            function() {
                //alert('Error getting location');
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

var countUp = function() {
    var start = {
        longitude: window.startPos.lon,
        latitude: window.startPos.lat
    }
    var dest = {
        longitude: window.destPos.lon,
        latitude: window.destPos.lat
    }
    window.getDiff(start, dest);
    var percent = window.tavolsag;

    if (percent < 0) {
        percent = 0;
    } else if (percent > 1) {
        percent = 1;
    }
	gauge.options.colorStart = rgbToHex(getColorForPercentage(1-percent));
	gauge.options.colorStop = rgbToHex(getColorForPercentage(1-percent));
		gauge.set(percent*100);

        $scope.timeInMs+= 500;
        $timeout(countUp, 1000);
    }

$timeout(countUp, 1000);
	// Simple POST request example (passing data) :

	var getTodos = function() {
		$http.get('https://result-estimator.herokuapp.com/todos/get').
		  success(function(data, status, headers, config) {
		  	//console.log(data)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ3d3cvanMvYXBwLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0FjY291bnRDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0NoYXREZXRhaWxDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0NoYXRzQ3RybC5qcyIsInd3dy9qcy9jb250cm9sbGVycy9EYXNoQ3RybC5qcyIsInd3dy9qcy9jb250cm9sbGVycy9GcmllbmREZXRhaWxDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL0ZyaWVuZHNDdHJsLmpzIiwid3d3L2pzL2NvbnRyb2xsZXJzL2luZGV4LmpzIiwid3d3L2pzL3NlcnZpY2VzL0NoYXRzLmpzIiwid3d3L2pzL3NlcnZpY2VzL0ZyaWVuZHMuanMiLCJ3d3cvanMvc2VydmljZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vc2VydmljZXMnKTtcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMnKTtcblxuLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuLy8gJ3N0YXJ0ZXIuc2VydmljZXMnIGlzIGZvdW5kIGluIHNlcnZpY2VzLmpzXG4vLyAnc3RhcnRlci5jb250cm9sbGVycycgaXMgZm91bmQgaW4gY29udHJvbGxlcnMuanNcbmFuZ3VsYXIubW9kdWxlKCdzdGFydGVyJywgWydpb25pYycsICdjb250cm9sbGVycycsICdzZXJ2aWNlcyddKVxuXG4ucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAvLyBvcmcuYXBhY2hlLmNvcmRvdmEuc3RhdHVzYmFyIHJlcXVpcmVkXG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn0pXG5cbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gIC8vIElvbmljIHVzZXMgQW5ndWxhclVJIFJvdXRlciB3aGljaCB1c2VzIHRoZSBjb25jZXB0IG9mIHN0YXRlc1xuICAvLyBMZWFybiBtb3JlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyLXVpL3VpLXJvdXRlclxuICAvLyBTZXQgdXAgdGhlIHZhcmlvdXMgc3RhdGVzIHdoaWNoIHRoZSBhcHAgY2FuIGJlIGluLlxuICAvLyBFYWNoIHN0YXRlJ3MgY29udHJvbGxlciBjYW4gYmUgZm91bmQgaW4gY29udHJvbGxlcnMuanNcbiAgJHN0YXRlUHJvdmlkZXJcblxuICAvLyBzZXR1cCBhbiBhYnN0cmFjdCBzdGF0ZSBmb3IgdGhlIHRhYnMgZGlyZWN0aXZlXG4gICAgLnN0YXRlKCd0YWInLCB7XG4gICAgdXJsOiBcIi90YWJcIixcbiAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvdGFicy5odG1sXCJcbiAgfSlcblxuICAvLyBFYWNoIHRhYiBoYXMgaXRzIG93biBuYXYgaGlzdG9yeSBzdGFjazpcblxuICAuc3RhdGUoJ3RhYi5kYXNoJywge1xuICAgIHVybDogJy9kYXNoJyxcbiAgICB2aWV3czoge1xuICAgICAgJ3RhYi1kYXNoJzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItZGFzaC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0Rhc2hDdHJsJ1xuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICAuc3RhdGUoJ3RhYi5jaGF0cycsIHtcbiAgICAgIHVybDogJy9jaGF0cycsXG4gICAgICB2aWV3czoge1xuICAgICAgICAndGFiLWNoYXRzJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1jaGF0cy5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnQ2hhdHNDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ3RhYi5jaGF0LWRldGFpbCcsIHtcbiAgICAgIHVybDogJy9jaGF0cy86Y2hhdElkJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICd0YWItY2hhdHMnOiB7XG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvY2hhdC1kZXRhaWwuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0NoYXREZXRhaWxDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAuc3RhdGUoJ3RhYi5mcmllbmRzJywge1xuICAgICAgdXJsOiAnL2ZyaWVuZHMnLFxuICAgICAgdmlld3M6IHtcbiAgICAgICAgJ3RhYi1mcmllbmRzJzoge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1mcmllbmRzLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdGcmllbmRzQ3RybCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCd0YWIuZnJpZW5kLWRldGFpbCcsIHtcbiAgICAgIHVybDogJy9mcmllbmQvOmZyaWVuZElkJyxcbiAgICAgIHZpZXdzOiB7XG4gICAgICAgICd0YWItZnJpZW5kcyc6IHtcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9mcmllbmQtZGV0YWlsLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdGcmllbmREZXRhaWxDdHJsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAuc3RhdGUoJ3RhYi5hY2NvdW50Jywge1xuICAgIHVybDogJy9hY2NvdW50JyxcbiAgICB2aWV3czoge1xuICAgICAgJ3RhYi1hY2NvdW50Jzoge1xuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItYWNjb3VudC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0FjY291bnRDdHJsJ1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gaWYgbm9uZSBvZiB0aGUgYWJvdmUgc3RhdGVzIGFyZSBtYXRjaGVkLCB1c2UgdGhpcyBhcyB0aGUgZmFsbGJhY2tcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3RhYi9mcmllbmRzJyk7XG5cbn0pO1xuIiwiXG52YXIgQWNjb3VudEN0cmwgPSBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbikge1xuICAkc2NvcGUuc2V0dGluZ3MgPSB7XG4gICAgZW5hYmxlRnJpZW5kczogdHJ1ZVxuICB9O1xuXG4gICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgIHJhZGl1czogMCxcbiAgICAgICAgc3RhcnRQb3M6IHt9XG4gICAgfTtcblxuXG4gICAgJHNjb3BlLm1hcmtlciA9IG51bGw7XG5cbiAgICB2YXIgbWFwUHJvcCA9IHtcblx0ICAgIGNlbnRlcjpuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDUxLjUwODc0MiwtMC4xMjA4NTApLFxuXHQgICAgem9vbTo1LFxuXHQgICAgbWFwVHlwZUlkOmdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQXG5cdCAgfTtcblxuXG4gICAgJHNjb3BlLnNldE1pc3Npb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcbiAgICAgICAgICAgIGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZXdcIitwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zdGFydFBvcy5sYXRpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZGF0YS5zdGFydFBvcy5sb25naXR1ZGUgPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xuXG4gICAgICAgICAgICAgICAgd2luZG93LnN0YXJ0UG9zID0ge1xuICAgICAgICAgICAgICAgICAgICBsYXQ6ICRzY29wZS5kYXRhLnN0YXJ0UG9zLmxhdGl0dWRlLFxuICAgICAgICAgICAgICAgICAgICBsb246ICRzY29wZS5kYXRhLnN0YXJ0UG9zLmxvbmdpdHVkZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aW5kb3cuZGVzdFBvcyA9ICRzY29wZS5jdXN0b21Qb3NcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3RhYi9kYXNoJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yIGdldHRpbmcgbG9jYXRpb24nKTtcbiAgICAgICAgICAgIH0sIHt0aW1lb3V0OiAxNTAwMCwgZW5hYmxlSGlnaEFjY3VyYWN5OiBmYWxzZX0pO1xuICAgIH1cblxuICBcdCRzY29wZS5pbml0TWFwID0gZnVuY3Rpb24oKSB7XG5cblx0ICAgICRzY29wZS5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ29vZ2xlTWFwXCIpLG1hcFByb3ApO1xuXHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKCRzY29wZS5tYXAsICdtb3VzZWRvd24nLCBmdW5jdGlvbihldmVudCkge1xuXHRcdCAgICBjb25zb2xlLmxvZyhldmVudC5sYXRMbmcpO1xuXHRcdCAgICBpZigkc2NvcGUubWFya2VyID09IG51bGwpIHtcblx0XHQgICAgICAkc2NvcGUubWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHQgICAgICBwb3NpdGlvbjogZXZlbnQubGF0TG5nLFxuXHRcdFx0ICAgICAgbWFwOiAkc2NvcGUubWFwLFxuXHRcdFx0ICAgICAgdGl0bGU6ICdIZWxsbyBXb3JsZCEnLFxuXHRcdFx0ICAgICAgZHJhZ2dhYmxlOnRydWVcblx0XHRcdCAgfSk7XG5cblx0XHRcdCAgXHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcigkc2NvcGUubWFya2VyLCAnZHJhZ2VuZCcsIGZ1bmN0aW9uKCkgXG5cdFx0XHRcdHtcblx0XHRcdFx0ICAgICRzY29wZS5jdXN0b21Qb3MgPSB7XG5cdFx0XHRcdCAgICBcdGxhdDogJHNjb3BlLm1hcmtlci5nZXRQb3NpdGlvbigpLmxhdCgpLFxuXHRcdFx0XHQgICAgXHRsb246ICRzY29wZS5tYXJrZXIuZ2V0UG9zaXRpb24oKS5sbmcoKVxuXHRcdFx0XHQgICAgfVxuXHRcdFx0XHR9KTtcblxuXHRcdCAgXHR9XG5cdFx0fSlcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBY2NvdW50Q3RybCIsIlxudmFyIENoYXREZXRhaWxDdHJsID0gZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIENoYXRzKSB7XG4gICRzY29wZS5jaGF0ID0gQ2hhdHMuZ2V0KCRzdGF0ZVBhcmFtcy5jaGF0SWQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXREZXRhaWxDdHJsIiwiXG52YXIgQ2hhdHNDdHJsID0gZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCwgJGxvY2F0aW9uKSB7XG4gIFxuICAkc2NvcGUudG9kbyA9IHt9XG5cbiAgJHNjb3BlLnNlbmRUb1NlcnZlciA9IGZ1bmN0aW9uKCkge1xuXG5cblx0ICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKFxuXHQgICAgICBmdW5jdGlvbihwb3NpdGlvbikge1xuXHQgICAgICAgICAgXHRjb25zb2xlLmxvZyhcIm5ld1wiK3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArICcsJyArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xuXHQgICAgICAgICAgICAkc2NvcGUudG9kby5sYXRpdHVkZSA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcblx0ICAgICAgICAgICAgJHNjb3BlLnRvZG8ubG9uZ2l0dWRlID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcblxuXHQgICAgICAgICAgXHQkaHR0cC5wb3N0KCdodHRwczovL3Jlc3VsdC1lc3RpbWF0b3IuaGVyb2t1YXBwLmNvbS90b2Rvcy9hZGQnLCAkc2NvcGUudG9kbykuXG5cdFx0XHRcdCAgc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuXHRcdFx0XHQgICAgJGxvY2F0aW9uLnBhdGgoJy8nKTtcblx0XHRcdFx0XHRcdCR3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG5cdFx0XHRcdCB9KS5cblx0XHRcdFx0IGVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0XHRcdCAgICAvLyBjYWxsZWQgYXN5bmNocm9ub3VzbHkgaWYgYW4gZXJyb3Igb2NjdXJzXG5cdFx0XHRcdCAgICAvLyBvciBzZXJ2ZXIgcmV0dXJucyByZXNwb25zZSB3aXRoIGFuIGVycm9yIHN0YXR1cy5cblx0XHRcdFx0fSk7XG5cdCAgICAgIH0sXG5cdCAgICAgIGZ1bmN0aW9uKCkge1xuXHQgICAgICAgICAgYWxlcnQoJ0Vycm9yIGdldHRpbmcgbG9jYXRpb24nKTtcblx0ICAgICAgfSwge3RpbWVvdXQ6IDE1MDAwLCBlbmFibGVIaWdoQWNjdXJhY3k6IGZhbHNlfSk7XG4gIFx0XG4gIH1cblxuICAgIC8qXG4gICAgICAgIHN0YXJ0ID0ge1xuICAgICAgICAgICAgbGF0aXR1ZGU6IHhcbiAgICAgICAgICAgIGxvbmdpdHVkZTogeVxuICAgICAgICB9XG4gICAgIGdvYWwgPSB7XG4gICAgICAgIGxhdGl0dWRlOiB4XG4gICAgICAgIGxvbmdpdHVkZTogeVxuICAgICB9XG4gICAgICovXG4gICAgd2luZG93LmdldERpZmYgPSBmdW5jdGlvbihzdGFydCwgZ29hbCkge1xuXG5cbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcbiAgICAgICAgICAgIGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZXdcIitwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyAnLCcgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcblxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgICAgICBsYXRpdHVkZTogcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLFxuICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGU6cG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBmdWxsZGlmZj0gZ2V0ZGlmY29vcmQoc3RhcnQsIGdvYWwpKigzLzIpO1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ZGlmID0gZ2V0ZGlmY29vcmQoY3VycmVudCwgZ29hbCk7XG4gICAgICAgICAgICAgICAgdmFyIGtveiA9IGZ1bGxkaWZmLWN1cnJlbnRkaWY7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrb3ovZnVsbGRpZmYpO1xuICAgICAgICAgICAgICAgIHJldHVybiBrb3ovZnVsbGRpZmY7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3IgZ2V0dGluZyBsb2NhdGlvbicpO1xuICAgICAgICAgICAgfSwge3RpbWVvdXQ6IDE1MDAwLCBlbmFibGVIaWdoQWNjdXJhY3k6IGZhbHNlfSk7XG5cbiAgICB9XG5cbiAgICB2YXIgZ2V0ZGlmY29vcmQgPSBmdW5jdGlvbihhLCBiKXtcbiAgICAgICAgaWYgKHR5cGVvZihOdW1iZXIucHJvdG90eXBlLnRvUmFkKSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgTnVtYmVyLnByb3RvdHlwZS50b1JhZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbGF0MSA9IGEubGF0aXR1ZGU7XG4gICAgICAgIHZhciBsb24xID1hLmxvbmdpdHVkZTtcbiAgICAgICAgdmFyIGxhdDIgPSBiLmxhdGl0dWRlO1xuICAgICAgICB2YXIgbG9uMiA9Yi5sb25naXR1ZGU7XG4gICAgICAgIHZhciBSID0gNjM3MTsgLy8ga21cbiAgICAgICAgdmFyIM+GMSA9IGxhdDEudG9SYWQoKTtcbiAgICAgICAgdmFyIM+GMiA9IGxhdDIudG9SYWQoKTtcbiAgICAgICAgdmFyIM6Uz4YgPSAobGF0Mi1sYXQxKS50b1JhZCgpO1xuICAgICAgICB2YXIgzpTOuyA9IChsb24yLWxvbjEpLnRvUmFkKCk7XG5cbiAgICAgICAgdmFyIGEgPSBNYXRoLnNpbijOlM+GLzIpICogTWF0aC5zaW4ozpTPhi8yKSArXG4gICAgICAgICAgICBNYXRoLmNvcyjPhjEpICogTWF0aC5jb3Moz4YyKSAqXG4gICAgICAgICAgICBNYXRoLnNpbijOlM67LzIpICogTWF0aC5zaW4ozpTOuy8yKTtcbiAgICAgICAgdmFyIGMgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxLWEpKTtcblxuICAgICAgIHJldHVybiBSICogYztcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDaGF0c0N0cmwiLCJ2YXIgRGFzaEN0cmwgPSBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkbG9jYXRpb24sICR3aW5kb3csICR0aW1lb3V0KSB7XG5cdHZhciBvcHRzID0ge1xuICBsaW5lczogMSwgLy8gVGhlIG51bWJlciBvZiBsaW5lcyB0byBkcmF3XG4gIGFuZ2xlOiAwLjAsIC8vIFRoZSBsZW5ndGggb2YgZWFjaCBsaW5lXG4gIGxpbmVXaWR0aDogMC40NCwgLy8gVGhlIGxpbmUgdGhpY2tuZXNzXG4gIHBvaW50ZXI6IHtcbiAgICBsZW5ndGg6IDAuNywgLy8gVGhlIHJhZGl1cyBvZiB0aGUgaW5uZXIgY2lyY2xlXG4gICAgc3Ryb2tlV2lkdGg6IDAuMDIwLCAvLyBUaGUgcm90YXRpb24gb2Zmc2V0XG4gICAgY29sb3I6ICcjMDAwMDAwJyAvLyBGaWxsIGNvbG9yXG4gIH0sXG4gIGxpbWl0TWF4OiAndHJ1ZScsICAgLy8gSWYgdHJ1ZSwgdGhlIHBvaW50ZXIgd2lsbCBub3QgZ28gcGFzdCB0aGUgZW5kIG9mIHRoZSBnYXVnZVxuICBjb2xvclN0YXJ0OiAnIzZGQURDRicsICAgLy8gQ29sb3JzXG4gIGNvbG9yU3RvcDogJyM4RkMwREEnLCAgICAvLyBqdXN0IGV4cGVyaW1lbnQgd2l0aCB0aGVtXG4gIHN0cm9rZUNvbG9yOiAnI0UwRTBFMCcsICAgLy8gdG8gc2VlIHdoaWNoIG9uZXMgd29yayBiZXN0IGZvciB5b3VcbiAgZ2VuZXJhdGVHcmFkaWVudDogdHJ1ZVxufTtcbnZhciB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJyk7IC8vIHlvdXIgY2FudmFzIGVsZW1lbnRcblxudmFyIGdhdWdlID0gbmV3IEdhdWdlKHRhcmdldCkuc2V0T3B0aW9ucyhvcHRzKTsgLy8gY3JlYXRlIHNleHkgZ2F1Z2UhXG5nYXVnZS5tYXhWYWx1ZSA9IDEwMDsgLy8gc2V0IG1heCBnYXVnZSB2YWx1ZVxuZ2F1Z2Uuc2V0VGV4dEZpZWxkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2aWV3LXRleHRmaWVsZCcpKTtcbmdhdWdlLmFuaW1hdGlvblNwZWVkID0gMzI7IC8vIHNldCBhbmltYXRpb24gc3BlZWQgKDMyIGlzIGRlZmF1bHQgdmFsdWUpXG5nYXVnZS5zZXQoMCk7IC8vIHNldCBhY3R1YWwgdmFsdWVcblxuZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xuICAgIHZhciBoZXggPSBjLnRvU3RyaW5nKDE2KTtcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XG59XG5cbmZ1bmN0aW9uIHJnYlRvSGV4KGNvbG9ycykge1xuICAgIHJldHVybiBcIiNcIiArIGNvbXBvbmVudFRvSGV4KGNvbG9yc1swXSkgKyBjb21wb25lbnRUb0hleChjb2xvcnNbMV0pICsgY29tcG9uZW50VG9IZXgoY29sb3JzWzJdKTtcbn1cblxudmFyIHBlcmNlbnRDb2xvcnMgPSBbXG4gICAgeyBwY3Q6IDAuMCwgY29sb3I6IHsgcjogMHhmZiwgZzogMHgwMCwgYjogMCB9IH0sXG4gICAgeyBwY3Q6IDAuNSwgY29sb3I6IHsgcjogMHhmZiwgZzogMHhmZiwgYjogMCB9IH0sXG4gICAgeyBwY3Q6IDEuMCwgY29sb3I6IHsgcjogMHgwMCwgZzogMHhmZiwgYjogMCB9IH0gXTtcblxudmFyIGdldENvbG9yRm9yUGVyY2VudGFnZSA9IGZ1bmN0aW9uKHBjdCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcGVyY2VudENvbG9ycy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgaWYgKHBjdCA8IHBlcmNlbnRDb2xvcnNbaV0ucGN0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgbG93ZXIgPSBwZXJjZW50Q29sb3JzW2kgLSAxXTtcbiAgICB2YXIgdXBwZXIgPSBwZXJjZW50Q29sb3JzW2ldO1xuICAgIHZhciByYW5nZSA9IHVwcGVyLnBjdCAtIGxvd2VyLnBjdDtcbiAgICB2YXIgcmFuZ2VQY3QgPSAocGN0IC0gbG93ZXIucGN0KSAvIHJhbmdlO1xuICAgIHZhciBwY3RMb3dlciA9IDEgLSByYW5nZVBjdDtcbiAgICB2YXIgcGN0VXBwZXIgPSByYW5nZVBjdDtcbiAgICB2YXIgY29sb3IgPSB7XG4gICAgICAgIHI6IE1hdGguZmxvb3IobG93ZXIuY29sb3IuciAqIHBjdExvd2VyICsgdXBwZXIuY29sb3IuciAqIHBjdFVwcGVyKSxcbiAgICAgICAgZzogTWF0aC5mbG9vcihsb3dlci5jb2xvci5nICogcGN0TG93ZXIgKyB1cHBlci5jb2xvci5nICogcGN0VXBwZXIpLFxuICAgICAgICBiOiBNYXRoLmZsb29yKGxvd2VyLmNvbG9yLmIgKiBwY3RMb3dlciArIHVwcGVyLmNvbG9yLmIgKiBwY3RVcHBlcilcbiAgICB9O1xuICAgIHJldHVybiBbY29sb3IuciwgY29sb3IuZywgY29sb3IuYl07XG4gICAgLy8gb3Igb3V0cHV0IGFzIGhleCBpZiBwcmVmZXJyZWRcbn1cblxuXG4gICAgd2luZG93LnRhdm9sc2FnID0gMDtcblxuICAgIC8qXG4gICAgIHN0YXJ0ID0ge1xuICAgICBsYXRpdHVkZTogeFxuICAgICBsb25naXR1ZGU6IHlcbiAgICAgfVxuICAgICBnb2FsID0ge1xuICAgICBsYXRpdHVkZTogeFxuICAgICBsb25naXR1ZGU6IHlcbiAgICAgfVxuICAgICAqL1xuICAgIHdpbmRvdy5nZXREaWZmID0gZnVuY3Rpb24oc3RhcnQsIGdvYWwpIHtcblxuXG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXG4gICAgICAgICAgICBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3XCIrcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgJywnICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcbiAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOnBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZnVsbGRpZmY9IGdldGRpZmNvb3JkKHN0YXJ0LCBnb2FsKSooMy8yKTtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudGRpZiA9IGdldGRpZmNvb3JkKGN1cnJlbnQsIGdvYWwpO1xuICAgICAgICAgICAgICAgIHZhciBrb3ogPSBmdWxsZGlmZi1jdXJyZW50ZGlmO1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhrb3ovZnVsbGRpZmYpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy50YXZvbHNhZyA9IGtvei9mdWxsZGlmZjtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vYWxlcnQoJ0Vycm9yIGdldHRpbmcgbG9jYXRpb24nKTtcbiAgICAgICAgICAgIH0sIHt0aW1lb3V0OiAxNTAwMCwgZW5hYmxlSGlnaEFjY3VyYWN5OiBmYWxzZX0pO1xuXG4gICAgfVxuXG4gICAgdmFyIGdldGRpZmNvb3JkID0gZnVuY3Rpb24oYSwgYil7XG4gICAgICAgIGlmICh0eXBlb2YoTnVtYmVyLnByb3RvdHlwZS50b1JhZCkgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIE51bWJlci5wcm90b3R5cGUudG9SYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcyAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxhdDEgPSBhLmxhdGl0dWRlO1xuICAgICAgICB2YXIgbG9uMSA9YS5sb25naXR1ZGU7XG4gICAgICAgIHZhciBsYXQyID0gYi5sYXRpdHVkZTtcbiAgICAgICAgdmFyIGxvbjIgPWIubG9uZ2l0dWRlO1xuICAgICAgICB2YXIgUiA9IDYzNzE7IC8vIGttXG4gICAgICAgIHZhciDPhjEgPSBsYXQxLnRvUmFkKCk7XG4gICAgICAgIHZhciDPhjIgPSBsYXQyLnRvUmFkKCk7XG4gICAgICAgIHZhciDOlM+GID0gKGxhdDItbGF0MSkudG9SYWQoKTtcbiAgICAgICAgdmFyIM6UzrsgPSAobG9uMi1sb24xKS50b1JhZCgpO1xuXG4gICAgICAgIHZhciBhID0gTWF0aC5zaW4ozpTPhi8yKSAqIE1hdGguc2luKM6Uz4YvMikgK1xuICAgICAgICAgICAgTWF0aC5jb3Moz4YxKSAqIE1hdGguY29zKM+GMikgKlxuICAgICAgICAgICAgTWF0aC5zaW4ozpTOuy8yKSAqIE1hdGguc2luKM6UzrsvMik7XG4gICAgICAgIHZhciBjID0gMiAqIE1hdGguYXRhbjIoTWF0aC5zcXJ0KGEpLCBNYXRoLnNxcnQoMS1hKSk7XG5cbiAgICAgICAgcmV0dXJuIFIgKiBjO1xuICAgIH1cblxudmFyIGNvdW50VXAgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhcnQgPSB7XG4gICAgICAgIGxvbmdpdHVkZTogd2luZG93LnN0YXJ0UG9zLmxvbixcbiAgICAgICAgbGF0aXR1ZGU6IHdpbmRvdy5zdGFydFBvcy5sYXRcbiAgICB9XG4gICAgdmFyIGRlc3QgPSB7XG4gICAgICAgIGxvbmdpdHVkZTogd2luZG93LmRlc3RQb3MubG9uLFxuICAgICAgICBsYXRpdHVkZTogd2luZG93LmRlc3RQb3MubGF0XG4gICAgfVxuICAgIHdpbmRvdy5nZXREaWZmKHN0YXJ0LCBkZXN0KTtcbiAgICB2YXIgcGVyY2VudCA9IHdpbmRvdy50YXZvbHNhZztcblxuICAgIGlmIChwZXJjZW50IDwgMCkge1xuICAgICAgICBwZXJjZW50ID0gMDtcbiAgICB9IGVsc2UgaWYgKHBlcmNlbnQgPiAxKSB7XG4gICAgICAgIHBlcmNlbnQgPSAxO1xuICAgIH1cblx0Z2F1Z2Uub3B0aW9ucy5jb2xvclN0YXJ0ID0gcmdiVG9IZXgoZ2V0Q29sb3JGb3JQZXJjZW50YWdlKDEtcGVyY2VudCkpO1xuXHRnYXVnZS5vcHRpb25zLmNvbG9yU3RvcCA9IHJnYlRvSGV4KGdldENvbG9yRm9yUGVyY2VudGFnZSgxLXBlcmNlbnQpKTtcblx0XHRnYXVnZS5zZXQocGVyY2VudCoxMDApO1xuXG4gICAgICAgICRzY29wZS50aW1lSW5Ncys9IDUwMDtcbiAgICAgICAgJHRpbWVvdXQoY291bnRVcCwgMTAwMCk7XG4gICAgfVxuXG4kdGltZW91dChjb3VudFVwLCAxMDAwKTtcblx0Ly8gU2ltcGxlIFBPU1QgcmVxdWVzdCBleGFtcGxlIChwYXNzaW5nIGRhdGEpIDpcblxuXHR2YXIgZ2V0VG9kb3MgPSBmdW5jdGlvbigpIHtcblx0XHQkaHR0cC5nZXQoJ2h0dHBzOi8vcmVzdWx0LWVzdGltYXRvci5oZXJva3VhcHAuY29tL3RvZG9zL2dldCcpLlxuXHRcdCAgc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuXHRcdCAgXHQvL2NvbnNvbGUubG9nKGRhdGEpXG5cdFx0ICAgICRzY29wZS50b2RvcyA9IGRhdGEuZGF0YVxuXHRcdFx0XHQvL2h0dHA6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9sYXRsbmc9NDguMCwyMi4wMzU1MzgzOCZzZW5zb3I9dHJ1ZVxuXHRcdFx0XHRhbmd1bGFyLmZvckVhY2goJHNjb3BlLnRvZG9zLCBmdW5jdGlvbih0b2RvKXtcblx0XHRcdFx0XHR0b2RvLmFkZHJlc3M7XG5cdFx0XHRcdFx0JGh0dHAuZ2V0KCdodHRwOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/bGF0bG5nPScrdG9kby5sYXRpdHVkZSsnLCcrdG9kby5sb25naXR1ZGUrJyZzZW5zb3I9dHJ1ZScpLlxuXHRcdFx0XHRcdFx0c3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMsIGhlYWRlcnMsIGNvbmZpZykge1xuXHRcdFx0XHRcdFx0XHR0b2RvLmFkZHJlc3MgPSBkYXRhLnJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3M7XG5cdFx0XHRcdFx0XHR9KS5cblx0XHRcdFx0XHRcdGVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblx0XHQgfSkuXG5cdFx0IGVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0fSk7XG5cblx0fVxuXG5cblxuXHQkc2NvcGUuZGVsZXRlVG9kbyA9IGZ1bmN0aW9uKHRvZG9JZCkge1xuXHRcdCRodHRwLnBvc3QoJ2h0dHBzOi8vcmVzdWx0LWVzdGltYXRvci5oZXJva3VhcHAuY29tL3RvZG9zL2RlbGV0ZScsIHt0b2Rvc19pZDogdG9kb0lkfSkuXG5cdFx0ICBzdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0ICBcdGdldFRvZG9zKClcblx0XHQgfSkuXG5cdFx0IGVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSB7XG5cdFx0ICAgIC8vIGNhbGxlZCBhc3luY2hyb25vdXNseSBpZiBhbiBlcnJvciBvY2N1cnNcblx0XHQgICAgLy8gb3Igc2VydmVyIHJldHVybnMgcmVzcG9uc2Ugd2l0aCBhbiBlcnJvciBzdGF0dXMuXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRUb2RvcygpXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEYXNoQ3RybCIsIlxudmFyIEZyaWVuZERldGFpbEN0cmwgPSBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgRnJpZW5kcykge1xuICAkc2NvcGUuZnJpZW5kID0gRnJpZW5kcy5nZXQoJHN0YXRlUGFyYW1zLmZyaWVuZElkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmREZXRhaWxDdHJsIiwiXG52YXIgRnJpZW5kc0N0cmwgPSBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbikge1xuXG4gICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgIHJhZGl1czogMCxcbiAgICAgICAgc3RhcnRQb3M6IHt9XG4gICAgfTtcblxuICAgICRzY29wZS5zZXRNaXNzaW9uID0gZnVuY3Rpb24ocmFkKSB7XG4gICAgICAgIGlmKHJhZD09PXVuZGVmaW5lZCl7XG4gICAgICAgICAgICByYWQ9JHNjb3BlLmRhdGEucmFkaXVzO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5kYXRhLnJhZGl1cyA9IHJhZDtcbiAgICAgICAgY29uc29sZS5sb2cocmFkKTtcblxuICAgICAgICBpbml0TWlzc2lvbigpXG4gICAgfVxuXG4gICAgJHNjb3BlLnRvTWFwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibGVmZGFmc2RkZlwiKVxuICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3RhYi9hY2NvdW50Jyk7XG4gICAgfVxuXG4gICAgdmFyIGluaXRNaXNzaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXG4gICAgICAgICAgICBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3XCIrcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgJywnICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc3RhcnRQb3MubGF0aXR1ZGUgPSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGU7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRhdGEuc3RhcnRQb3MubG9uZ2l0dWRlID0gcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5zdGFydFBvcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbGF0OiAkc2NvcGUuZGF0YS5zdGFydFBvcy5sYXRpdHVkZSxcbiAgICAgICAgICAgICAgICAgICAgbG9uOiAkc2NvcGUuZGF0YS5zdGFydFBvcy5sb25naXR1ZGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2luZG93LmRlc3RQb3MgPSBnZW5lcmF0ZVJhbmRvbUNvb3JkKCRzY29wZS5kYXRhLnN0YXJ0UG9zLmxhdGl0dWRlLCAkc2NvcGUuZGF0YS5zdGFydFBvcy5sb25naXR1ZGUsICRzY29wZS5kYXRhLnJhZGl1cyk7XG5cbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL3RhYi9kYXNoJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yIGdldHRpbmcgbG9jYXRpb24nKTtcbiAgICAgICAgICAgIH0sIHt0aW1lb3V0OiAxNTAwMCwgZW5hYmxlSGlnaEFjY3VyYWN5OiBmYWxzZX0pO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZVJhbmRvbUNvb3JkID0gZnVuY3Rpb24obGF0LCBsb24sIHJhZGl1cykge1xuICAgICAgICB2YXIgciA9IHJhZGl1cy8xMTEzMDAgLy8gPSAxMDAgbWV0ZXJzXG4gICAgICAgICAgICAsIHkwID0gbGF0XG4gICAgICAgICAgICAsIHgwID0gbG9uXG4gICAgICAgICAgICAsIHUgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgICAsIHYgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgICAsIHcgPSByICogTWF0aC5zcXJ0KHUpXG4gICAgICAgICAgICAsIHQgPSAyICogTWF0aC5QSSAqIHZcbiAgICAgICAgICAgICwgeCA9IHcgKiBNYXRoLmNvcyh0KVxuICAgICAgICAgICAgLCB5MSA9IHcgKiBNYXRoLnNpbih0KVxuICAgICAgICAgICAgLCB4MSA9IHggLyBNYXRoLmNvcyh5MClcblxuICAgICAgICBuZXdZID0geTAgKyB5MVxuICAgICAgICBuZXdYID0geDAgKyB4MVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGF0OiBuZXdZLFxuICAgICAgICAgICAgbG9uOiBuZXdYXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cuZ2VuZXJhdGVDb29yZCA9IGdlbmVyYXRlUmFuZG9tQ29vcmQ7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGcmllbmRzQ3RybCIsIlxudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKFwiY29udHJvbGxlcnNcIiwgW1wic2VydmljZXNcIl0pO1xuXG5tb2R1bGUuY29udHJvbGxlcignRGFzaEN0cmwnLCByZXF1aXJlKCcuL0Rhc2hDdHJsJykpO1xubW9kdWxlLmNvbnRyb2xsZXIoJ0NoYXRzQ3RybCcsIHJlcXVpcmUoJy4vQ2hhdHNDdHJsJykpO1xubW9kdWxlLmNvbnRyb2xsZXIoJ0NoYXREZXRhaWxDdHJsJywgcmVxdWlyZSgnLi9DaGF0RGV0YWlsQ3RybCcpKTtcbm1vZHVsZS5jb250cm9sbGVyKCdGcmllbmRzQ3RybCcsIHJlcXVpcmUoJy4vRnJpZW5kc0N0cmwnKSk7XG5tb2R1bGUuY29udHJvbGxlcignRnJpZW5kRGV0YWlsQ3RybCcsIHJlcXVpcmUoJy4vRnJpZW5kRGV0YWlsQ3RybCcpKTtcbm1vZHVsZS5jb250cm9sbGVyKCdBY2NvdW50Q3RybCcsIHJlcXVpcmUoJy4vQWNjb3VudEN0cmwnKSk7IiwiXG52YXIgQ2hhdHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gTWlnaHQgdXNlIGEgcmVzb3VyY2UgaGVyZSB0aGF0IHJldHVybnMgYSBKU09OIGFycmF5XG5cbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxuICB2YXIgY2hhdHMgPSBbe1xuICAgIGlkOiAwLFxuICAgIG5hbWU6ICdCZW4gU3BhcnJvdycsXG4gICAgbGFzdFRleHQ6ICdZb3Ugb24geW91ciB3YXk/JyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzUxNDU0OTgxMTc2NTIxMTEzNi85U2dBdUhlWS5wbmcnXG4gIH0sIHtcbiAgICBpZDogMSxcbiAgICBuYW1lOiAnTWF4IEx5bngnLFxuICAgIGxhc3RUZXh0OiAnSGV5LCBpdFxcJ3MgbWUnLFxuICAgIGZhY2U6ICdodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzExMjE0P3Y9MyZzPTQ2MCdcbiAgfSwge1xuICAgIGlkOiAyLFxuICAgIG5hbWU6ICdBbmRyZXcgSm9zdGxpbicsXG4gICAgbGFzdFRleHQ6ICdEaWQgeW91IGdldCB0aGUgaWNlIGNyZWFtPycsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTEyNzQzNzgxODE0ODg2NDAvVHRpMGZGVkouanBlZydcbiAgfSwge1xuICAgIGlkOiAzLFxuICAgIG5hbWU6ICdBZGFtIEJyYWRsZXlzb24nLFxuICAgIGxhc3RUZXh0OiAnSSBzaG91bGQgYnV5IGEgYm9hdCcsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80NzkwOTA3OTQwNTgzNzkyNjQvODRUS2pfcWEuanBlZydcbiAgfSwge1xuICAgIGlkOiA0LFxuICAgIG5hbWU6ICdQZXJyeSBHb3Zlcm5vcicsXG4gICAgbGFzdFRleHQ6ICdMb29rIGF0IG15IG11a2x1a3MhJyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzQ5MTk5NTM5ODEzNTc2NzA0MC9pZTJaX1Y2ZS5qcGVnJ1xuICB9XTtcblxuICByZXR1cm4ge1xuICAgIGFsbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY2hhdHM7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKGNoYXQpIHtcbiAgICAgIGNoYXRzLnNwbGljZShjaGF0cy5pbmRleE9mKGNoYXQpLCAxKTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24oY2hhdElkKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjaGF0c1tpXS5pZCA9PT0gcGFyc2VJbnQoY2hhdElkKSkge1xuICAgICAgICAgIHJldHVybiBjaGF0c1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhdHMiLCJcbnZhciBGcmllbmRzID0gZnVuY3Rpb24oKSB7XG4gIC8vIE1pZ2h0IHVzZSBhIHJlc291cmNlIGhlcmUgdGhhdCByZXR1cm5zIGEgSlNPTiBhcnJheVxuXG4gIC8vIFNvbWUgZmFrZSB0ZXN0aW5nIGRhdGFcbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxuICB2YXIgZnJpZW5kcyA9IFt7XG4gICAgaWQ6IDAsXG4gICAgbmFtZTogJ0JlbiBTcGFycm93JyxcbiAgICBub3RlczogJ0Vuam95cyBkcmF3aW5nIHRoaW5ncycsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy81MTQ1NDk4MTE3NjUyMTExMzYvOVNnQXVIZVkucG5nJ1xuICB9LCB7XG4gICAgaWQ6IDEsXG4gICAgbmFtZTogJ01heCBMeW54JyxcbiAgICBub3RlczogJ09kZCBvYnNlc3Npb24gd2l0aCBldmVyeXRoaW5nJyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9hdmF0YXJzMy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xMTIxND92PTMmcz00NjAnXG4gIH0sIHtcbiAgICBpZDogMixcbiAgICBuYW1lOiAnQW5kcmV3IEpvc3RsZW4nLFxuICAgIG5vdGVzOiAnV2VhcnMgYSBzd2VldCBsZWF0aGVyIEphY2tldC4gSVxcJ20gYSBiaXQgamVhbG91cycsXG4gICAgZmFjZTogJ2h0dHBzOi8vcGJzLnR3aW1nLmNvbS9wcm9maWxlX2ltYWdlcy80OTEyNzQzNzgxODE0ODg2NDAvVHRpMGZGVkouanBlZydcbiAgfSwge1xuICAgIGlkOiAzLFxuICAgIG5hbWU6ICdBZGFtIEJyYWRsZXlzb24nLFxuICAgIG5vdGVzOiAnSSB0aGluayBoZSBuZWVkcyB0byBidXkgYSBib2F0JyxcbiAgICBmYWNlOiAnaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzQ3OTA5MDc5NDA1ODM3OTI2NC84NFRLal9xYS5qcGVnJ1xuICB9LCB7XG4gICAgaWQ6IDQsXG4gICAgbmFtZTogJ1BlcnJ5IEdvdmVybm9yJyxcbiAgICBub3RlczogJ0p1c3QgdGhlIG5pY2VzdCBndXknLFxuICAgIGZhY2U6ICdodHRwczovL3Bicy50d2ltZy5jb20vcHJvZmlsZV9pbWFnZXMvNDkxOTk1Mzk4MTM1NzY3MDQwL2llMlpfVjZlLmpwZWcnXG4gIH1dO1xuXG5cbiAgcmV0dXJuIHtcbiAgICBhbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZyaWVuZHM7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKGZyaWVuZElkKSB7XG4gICAgICAvLyBTaW1wbGUgaW5kZXggbG9va3VwXG4gICAgICByZXR1cm4gZnJpZW5kc1tmcmllbmRJZF07XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRnJpZW5kcyIsIlxudmFyIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKFwic2VydmljZXNcIiwgW10pO1xuXG5tb2R1bGUuZmFjdG9yeSgnQ2hhdHMnLCByZXF1aXJlKCcuL0NoYXRzJykpO1xubW9kdWxlLmZhY3RvcnkoJ0ZyaWVuZHMnLCByZXF1aXJlKCcuL0ZyaWVuZHMnKSk7XG4iXX0=
