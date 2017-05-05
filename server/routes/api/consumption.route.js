let express =  require('express'),
    router = express.Router();

module.exports = router;

router.get('/', function(req, res, next){
  console.log('Hit the allcomsumption route')
  res.send('Hit the all comsumption route');
})

router.get('/:consumptionID', function(req, res, next){
  console.log('Hit the single compsumption route')
  res.send('Hit singl compsumption route')
})
