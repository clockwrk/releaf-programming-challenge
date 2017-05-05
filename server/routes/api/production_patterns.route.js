let express =  require('express'),
    router = express.Router();
module.exports = router;

router.get('/', function(req, res, next){
  console.log('Hit the all production patterns route')
  res.send('Hit the all production patterns route');
})

router.get('/:consumptionID', function(req, res, next){
  console.log('Hit the single production patterns route')
  res.send('Hit singl production patterns route')
})
