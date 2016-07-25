var express = require('express');
var router = express.Router();
var programming = require('../model/programming');
router.get('/programmingIndex',function(req, res, next){ 
  res.render('programming/programmingIndex',{
    
  });
});

module.exports = router;