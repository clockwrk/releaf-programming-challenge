app.factory('dashboardFactory', function($http){
  let getData = response => {
    return response.data;
  }

  return {
    getAllPrices: function(){
      console.log('in dashboardFactory getAllPrices function')
      return $http.get('/api/prices').then(getData)
      .then(allPrices=>{
        // console.log(allPrices)
        allPrices.forEach(function(price ,index,theArray){
          theArray[index].date = theArray[index].date.replace("M","/")
        })
        console.log(allPrices)

        return allPrices
      }).catch();
    },
    getSinglePrice: function(date, item){

      let currentDate = date.replace("/", "M");
      return $http.get('/api/prices/'+currentDate+'/'+item)
      .then(singlePrice =>{
        console.log(singlePrice)
        return singlePrice.data;
      })
    }
  }
})
