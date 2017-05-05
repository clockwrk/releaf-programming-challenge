let parser = require('babyparse'),
    fs = require('fs'),
    Price = require('../server/db/models/price.model.js'),
    db = require('../server/db/models'),
    // Consumption = require('../server/db/models/consumption.models.js'),
    // ProductionPattern = require('../server/db/models/production_patterns.models.js'),
    pricesPath = 'seed/prices/prices.csv',
    consumptionPath = './consumption/consumption.csv',
    productionPatternPath = './production_patterns/production_patterns.csv',
    pricesFileObject = fs.readFileSync(pricesPath, { encoding: 'binary' }),
    // consumptionFileObject = fs.readFileSync(consumptionPath, { encoding: 'binary'}),
    // productionPatternFileObject = fs.readFileSync(productionPatternPath, { encoding: 'binary'})
    newPricesArray = [];

function newPrice(newCsvRow) {
    this.item = newCsvRow.item;
    this.date = newCsvRow.Date;
    this.value = newCsvRow.Value;
};

db.sync({ force: true }).then(() => {
    return parser.parse(pricesFileObject, {
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
}).catch()
