
app.config(['$routeProvider', function($routeProvider){
$routeProvider
     .when('/allDetails', {
       templateUrl:'views/view1.html',
       controller:'mainController',
       controllerAs:'mainCtrl'
      })
     .when('/singleMatchDetails', {
      templateUrl:'views/view2.html',
      controller:'mainController',
      controllerAs: 'mainCtrl'
    })
      .when('/teamWiseDetails', {
       templateUrl:'views/view3.html',
       controller:'mainController',
       controllerAs:'mainCtrl'
    });
}]);
