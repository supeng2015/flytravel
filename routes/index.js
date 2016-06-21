var express = require('express');
var fortune = require('../lib/mytest/fortune');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/about',function(req,res){
  res.json({name:fortune.getFortune()});
});
router.get('/error',function(req,res){
  res.status(500);
  res.render('error');
})
module.exports = router;
