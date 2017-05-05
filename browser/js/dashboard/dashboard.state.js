app.config(function($stateProvider) {
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: '../../views/dashboard.view.html',
        controller: 'dashboardController',
        resolve: {
            allPrices: (dashboardFactory) => {
                return dashboardFactory.getAllPrices();
            }
        }
    })
})
