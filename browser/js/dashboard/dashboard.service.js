app.service('displayData', function(dashboardFactory){

return {
      setDisplayData :function(start, end){
        return dashboardFactory.getAllPrices().then(allPrices =>{
          console.log(allPrices)
          let priceDisplayArray=[],
              itemsArray = [],
              transferArray = [],
              sortedpriceDisplayArray;
          function singleTileData(item){
                this.item = item || "";
                this.direction =false;
                this.dateValues = [];

                dashboardFactory.getSinglePrice(start, item).then(startPrice =>{
                  return dashboardFactory.getSinglePrice(end, item).then(endPrice =>{
                    console.log('startPrice response value',startPrice[0].value)
                    console.log('startPrice',parseFloat(startPrice.value))
                    console.log('endPrice', parseFloat(endPrice.value))
                      if(parseFloat(startPrice[0].value) <= parseFloat(endPrice[0].value)){
                        console.log('startPrice',parseFloat(startPrice.value))
                        console.log('endPrice', parseFloat(endPrice.value))
                        this.direction = true;
                      }
                  })
                })
              };

                angular.forEach(allPrices, singleItem =>{
                  // console.log('found all Prices',allPrices)
                  // console.log('single item', singleItem)
                if(itemsArray.indexOf(singleItem.item)===-1){
                  itemsArray.push(singleItem.item)
                }
              });

              angular.forEach(itemsArray, item =>{
                // console.log('item',item);
                // console.log('items array',itemsArray)
                let newTile = new singleTileData(item, start, end);
                priceDisplayArray.push(newTile);

              })
              console.log('priceDisplayArray' ,priceDisplayArray[0].item)
              return priceDisplayArray



        })
        // dashboardFactory.getAllPrices().then(allPrices = {

// })
        // allPrices.forEach(singleprice => {
        //   let dateValue = {};
        //   dateValue.date = price.date;
        //   dateValue.value = price.value
        //
        //   priceDisplayArray[price.item].dateValues.push(dateValue)
        // })
  //
  //       while(priceDisplayArray){
  //         transferArray.push(priceDisplayArray.pop())
  //       }
  //
  //       priceDisplayArray = transferArray.forEach(transferItem.dateValues => {
  //           dateValues = dataValues.sort()
  //         })
  //
  //
  //   return priceDisplayArray;
  // }
}

}
})
