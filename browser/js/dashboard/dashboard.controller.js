app.controller("dashboardController", function($scope, allPrices, displayData){
  // $scope.allPrices = allPrices;

$scope.mockData = [{'item':"tomatoes","direction":false},{'item':'vegetables', "direction":true},{'item':"canned food", "direction":false}]


$scope.displayDataForCurrentRange = []




console.log($scope.mockData);

// $scope.priceSlider = 150;
let monthYears = ['2009/12'];
  for(let year = 2010; year <= 2015; year++){
    for(let month = 1; month <= 12; month++){
      let string = ""+year+"/"+month;
      monthYears.push(string);
    }
  }
  monthYears = monthYears.concat(['2016/1','2016/2','2016/3','2016/4','2016/5','2016/6'])

  $scope.slider = {
  min: '2010/01',
  max: '2015/01',
  options: {
    floor: '2009/12',
    ceil: '2016/6',
    stepsArray:monthYears,
    onStart: function functionName() {
      displayData.setDisplayData($scope.slider.min, $scope.slider.max).then( result =>{
              $scope.displayDataForCurrentRange = result;
                    console.log('Current displayDataForCurrentRange',$scope.displayDataForCurrentRange);
      });

    },
    onEnd: function(){
        displayData.setDisplayData($scope.slider.min, $scope.slider.max).then( result =>{
                $scope.displayDataForCurrentRange = result;
                      console.log('Current displayDataForCurrentRange',$scope.displayDataForCurrentRange);
        });


    }
  }
};


  //
  //
  // $scope.priceDisplayData = mockData;

  console.log($scope.slider)
});
