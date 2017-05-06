var app = angular.module('releafApp', ['ui.router', 'rzModule','highcharts-ng']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	    $urlRouterProvider.otherwise('/dashboard');
}])
