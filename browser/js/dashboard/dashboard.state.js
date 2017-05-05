app.config(function($stateProvider){
  console.log('in state provider')
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: '../../views/dashboard.view.html',
    controller: 'dashboardController',
    resolve: {
      allPrices: (dashboardFactory)=>{
        console.log('dashboardFactory')
        return dashboardFactory.getAllPrices();
      }
      }
    })
  })
