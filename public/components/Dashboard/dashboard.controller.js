myApp.controller('dashboardController', ['$scope', '$state', '$rootScope', 'dashboardService', function($scope, $state, $rootScope, dashboardService) {

$scope.parameters={
"temperature":25,
"voltage":30,
"current":60,
"humidity":10,
"power":80,
"efficiency":75
}

}]);
