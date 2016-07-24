var express = require('express');
var router = express.Router();
var sketch = require('../model/sketch');
router.get('/sketchIndex',function(req, res, next){
  sketch.find({},function(err,obj){
    console.log(obj);
    if (err) return console.error(err);
    res.render('sketchview/sketchIndex',{
      picList : obj  
    });
  });
  
  // var page = req.query.p ? parseInt(req.query.p) : 1;
  // jvmo.count(function(err,count){
  //   jvmo.find({}, null, {skip: (page-1)*3, limit: 3}, function (err,obj) {
  //     if (err) return console.error(err);
  //     res.render('jvmoview/jvmolist',{
  //       jvmolist:obj,
  //       page: page,
  //       nextpage : parseInt(page) + 1
  //     });
  //   });
  // })	
});

module.exports = router;