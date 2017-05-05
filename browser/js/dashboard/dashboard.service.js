app.service('displayData', function(dashboardFactory) {

    return {
        setDisplayData: function(start, end) {
            return dashboardFactory.getAllPrices().then(allPrices => {
                let priceDisplayArray = [],
                    itemsArray = [],
                    transferArray = [],
                    sortedpriceDisplayArray;

                function singleTileData(item) {
                    this.item = item || "";
                    this.direction = false;
                    this.dateValues = [];

                    dashboardFactory.getSinglePrice(start, item).then(startPrice => {
                        return dashboardFactory.getSinglePrice(end, item).then(endPrice => {
                            if (parseFloat(startPrice[0].value) <= parseFloat(endPrice[0].value)) {
                                this.direction = true;
                            }
                        })
                    })
                };

                angular.forEach(allPrices, singleItem => {
                    if (itemsArray.indexOf(singleItem.item) === -1) {
                        itemsArray.push(singleItem.item)
                    }
                });

                angular.forEach(itemsArray, item => {
                    let newTile = new singleTileData(item, start, end);
                    priceDisplayArray.push(newTile);

                })
                return priceDisplayArray
            })
        }
    }
})
