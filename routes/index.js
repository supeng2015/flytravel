var express = require('express');
var fortune = require('../lib/mytest/fortune');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/about',function(req,res){
  res.json({name:fortune.getFortune()});
});
module.exports = router;
