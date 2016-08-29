myApp.controller('homeController', ['$scope', '$state', '$rootScope', 'dashboardService', function($scope, $state, $rootScope, homeService) {

  $state.go('dashboard');

}]);
