var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req);
  res.render('home',{
    ip : req.ip	
  });
});
router.get('/myform', function(req, res, next) {
  res.render('myform');
});
router.post('/formdata', function(req, res, next) {
  res.json(req.body)
});




// app.get('/', function (req, res) {
//   res.render('home');
// });
// router.get('/about',function(req,res){
//   res.json({name:fortune.getFortune()});
// });
// router.get('/error',function(req,res){
//   res.status(500);
//   res.render('error');
// })
module.exports = router;
