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
  this.state = findStateCode(newCsvRow['ï»¿"states"']);
  this.item = newCsvRow.indicators;
  this.value = newCsvRow.Value;
}

function findStateCode(state){
  let nigerianStateKey =[
          { "id": "AB", "state": "Abia" },
          { "id": "FC", "state": "Abuja" },
          { "id": "AD", "state": "Adamawa" },
          { "id": "AK", "state": "Akwa Ibom" },
          { "id": "AN", "state": "Anambra" },
          { "id": "BA", "state": "Bauchi" },
          { "id": "BY", "state": "Bayelsa" },
          { "id": "BE", "state": "Benue" },
          { "id": "BO", "state": "Borno" },
          { "id": "CR", "state": "Cross River" },
          { "id": "DE", "state": "Delta" },
          { "id": "EB", "state": "Ebonyi" },
          { "id": "ED", "state": "Edo" },
          { "id": "EK", "state": "Ekiti" },
          { "id": "EN", "state": "Enugu" },
          { "id": "GO", "state": "Gombe" },
          { "id": "IM", "state": "Imo" },
          { "id": "JI", "state": "Jigawa" },
          { "id": "KD", "state": "Kaduna" },
          { "id": "KN", "state": "Kano" },
          { "id": "KT", "state": "Katsina" },
          { "id": "KE", "state": "Kebbi" },
          { "id": "KO", "state": "Kogi" },
          { "id": "KW", "state": "Kwara" },
          { "id": "LA", "state": "Lagos" },
          { "id": "NA", "state": "Nassarawa" },
          { "id": "NI", "state": "Niger" },
          { "id": "OG", "state": "Ogun" },
          { "id": "ON", "state": "Ondo" },
          { "id": "OS", "state": "Osun" },
          { "id": "OY", "state": "Oyo" },
          { "id": "PL", "state": "Plateau" },
          { "id": "RI", "state": "Rivers" },
          { "id": "SO", "state": "Sokoto" },
          { "id": "TA", "state": "Taraba" },
          { "id": "YO", "state": "Yobe" },
          { "id": "ZA", "state": "Zamfara" }
        ]

        function isCorrectState(stateObject) {
            console.log(stateObject.state === state ,stateObject.state)
            console.log('looking for', state)
            return stateObject.state === state ;
        }

      let correctObjectFind = nigerianStateKey.find(isCorrectState)
      console.log("correctObjectFind found ",correctObjectFind)

      return correctObjectFind.id;
}

// { 'ï»¿"states"': 'Yobe',
//   indicators: 'Sugarcane 2',
//   Unit: '',
//   Date: '2011',
//   Value: '36' }

function newProduction(newCsvRow){
  this.state = findStateCode(newCsvRow['ï»¿"states"']);
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

          let rawData = row.data.pop();
            if (rawData['ï»¿"states"']&&rawData['ï»¿"states"']!= "Nigeria") {
                let _newConsumption = new newComsumption(rawData);

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
              console.log("rawDATA ",rawData)

              if(rawData.indicators && rawData.Value && rawData.Date ){
                rawData.indicators =  rawData.indicators.split("").splice(0,4).join("")


                let _newProduction = new newProduction(rawData);
                  _newProduction.item = productionPatternArrayItem.item
                  newProductionArray.push(_newProduction);
              }

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
