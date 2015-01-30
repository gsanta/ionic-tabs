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