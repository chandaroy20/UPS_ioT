myApp.config(function($stateProvider,$urlRouterProvider){

  $stateProvider
  .state('report',{
    templateUrl: 'components/Reports/report.view.html',
    controller: 'reportController',
    url: '/report/'
  });

});
