myApp.config(function($stateProvider,$urlRouterProvider){

  $stateProvider
  .state('dashboard',{
    templateUrl: 'components/Dashboard/dashboard.view.html',
    controller: 'dashboardController',
    url: '/dashboard/'
  });

});
