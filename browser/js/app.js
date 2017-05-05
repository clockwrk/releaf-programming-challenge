console.log('loeading this')
var app = angular.module('releafApp', ['ui.router', 'rzModule']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	    $urlRouterProvider.otherwise('/dashboard');
		console.log('here');

}])

app.controller('TestController', TestController);

function TestController() {
    var vm = this;

    vm.priceSlider = {
        value: 200,
        options: {
            floor: 0,
            ceil: 500
        }
    }
}
