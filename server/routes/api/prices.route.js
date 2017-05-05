let express = require('express'),
    router = express.Router(),
    Prices = require('../../db/models/price.model.js');
module.exports = router;

router.get('/', function(req, res, next) {
    Prices.findAll({}).then(allPrices => {
        res.send(allPrices)
    }).catch(next)
})

router.get('/:date/:item', function(req, res, next) {
    let date = req.params.date,
        item = req.params.item;
    Prices.findAll({
        where: {
            item: item,
            date: date
        }
    }).then(singlePrice => {
        res.send(singlePrice)
    }).catch(next)
})
