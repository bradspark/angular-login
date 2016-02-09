var loginApp = angular.module('quad-login', ['ngRoute']);

loginApp.config(['$locationProvider','$routeProvider',function($locationProvider,$routeProvider) {
   $locationProvider.html5Mode({ enabled: true, requireBase: false }).hashPrefix('!');
}]);