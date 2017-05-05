var router = require('express').Router();

router.use('/consumption', require('./api/consumption.route.js'));
router.use('/prices', require('./api/prices.route.js'));
router.use('/production_patterns', require('./api/production_patterns.route.js'));

module.exports = router;
