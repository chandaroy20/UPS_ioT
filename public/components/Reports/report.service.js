angular.module('myApp').factory('reportService', ['$http',function($http) {

return{
  getData: function () {
              console.log("inside function");
              return $http.get('components/Reports/records.json');
          }
}
}]);
