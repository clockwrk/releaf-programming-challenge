
var app = angular.module('releafApp', ['ui.router', 'rzModule']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	    $urlRouterProvider.otherwise('/dashboard');
}])
