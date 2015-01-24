var DashCtrl = function($scope, $http) {

  $http.post('https://result-estimator.herokuapp.com/sedcup/add', {kurva: 'kurvaAdat'}).success(function(data) {
      console.log(data.data)
  })
  .error(function(data){
    console.log(data)   
  });

}

module.exports = DashCtrl