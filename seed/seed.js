let parser = require('babyparse'),
    fs = require('fs'),
    Price = require('../server/db/models/price.model.js'),
    db = require('../server/db/models'),
    Consumption = require('../server/db/models/consumption.model.js'),
    Production = require('../server/db/models/production_patterns.model.js'),
    pricesPath = 'seed/prices/prices.csv',
    consumptionPath = 'seed/consumption/consumption.csv',
    productionPatternPath = 'seed/production_patterns/production_patterns.csv',
    productionPatternPathArray = [
      {item:'Cashew',path:'seed/production_patterns/cashew_production.csv'},
      {item:'Cocoa',path:'seed/production_patterns/cocoa_production.csv'},
      {item:'Kola nuts',path:'seed/production_patterns/kola_nut_production.csv'},
      {item:'Palm oil',path:'seed/production_patterns/palm_oil_production.csv'},
      {item:'Sugarcane',path:'seed/production_patterns/sugar_cane_production.csv'}
    ]
    pricesFileObject = fs.readFileSync(pricesPath, { encoding: 'binary' }),
    consumptionFileObject = fs.readFileSync(consumptionPath, { encoding: 'binary'}),
    // productionPatternFileObject = fs.readFileSync(productionPatternPath, { encoding: 'binary'}),
    newPricesArray = [],
    newComsumptionArray = [];

function newPrice(newCsvRow) {
    this.item = newCsvRow.item;
    this.date = newCsvRow.Date;
    this.value = newCsvRow.Value;
};

function newComsumption(newCsvRow){
  this.state = newCsvRow['ï»¿"states"'];
  this.item = newCsvRow.indicators;
  this.value = newCsvRow.Value;
}

// { 'ï»¿"states"': 'Yobe',
//   indicators: 'Sugarcane 2',
//   Unit: '',
//   Date: '2011',
//   Value: '36' }

function newProduction(newCsvRow){
  this.state = newCsvRow['ï»¿"states"'];
  this.indicator = newCsvRow.indicators;
  this.value = newCsvRow.Value;
  this.date = newCsvRow.Date;
}

db.sync({ force: true }).then(() => {
  //seeding Prices database
    parser.parse(pricesFileObject, {
        header: true,
        step: row => {
            let _newPrice = new newPrice(row.data.pop())
            if (_newPrice.item) {
                _newPrice.data = _newPrice.date.replace('M', "/");
                newPricesArray.push(_newPrice)
            }
        },
        complete: function() {

            return Price.bulkCreate(newPricesArray).then(() => {
                return Price.findAll();
            }).then((allPrices) => {})
        }
    })
    //seeding Comsumption Database
    parser.parse(consumptionFileObject, {
        header: true,
        step: row => {
            let _newConsumption = new newComsumption(row.data.pop());
            if (_newConsumption.item) {
                newComsumptionArray.push(_newConsumption);
            }
        },
        complete: function() {
            return Consumption.bulkCreate(newComsumptionArray).then(() => {
                return Consumption.findAll();
            }).then((allConsumption) => {})
        }
    })

    //seeding Production

  function inputProductionData(productionPatternArrayItem){
      console.log('productionPatternArrayItem',productionPatternArrayItem);
      let newProductionArray = [];

      let productionPatternFileObject = fs.readFileSync(productionPatternArrayItem.path, { encoding: 'binary'});
      parser.parse(productionPatternFileObject, {
        header: true,
          step: row => {
              let rawData = row.data.pop();

              let _newProduction = new newProduction(rawData);
                _newProduction.item = productionPatternArrayItem.item
              if (_newProduction.date && _newProduction.value && _newProduction.indicator) {
                console.log("2", _newProduction)

                  newProductionArray.push(_newProduction);
              }
              console.log("3")
          },
          complete: function() {
            // console.log("***********")
            // console.log('----------------')
              return Production.bulkCreate(newProductionArray).then((results) => {
                // console.log('XXXXXXXX')
                // console.log(results);
                newProductionArray=[];
                  return Production.findAll();
              }).then((allProduction) => {})
          }
      })
    }
productionPatternPathArray .forEach(inputProductionData)

  }).catch()
