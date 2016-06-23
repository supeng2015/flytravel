var express = require('express');
var router = express.Router();
var jvmo = require('../model/jvmo');
router.get('/list',function(req, res, next){
  var page = req.query.p ? parseInt(req.query.p) : 1;
  jvmo.count(function(err,count){
    jvmo.find({}, null, {skip: (page-1)*3, limit: 3}, function (err,obj) {
      if (err) return console.error(err);
      res.render('jvmoview/jvmolist',{
        jvmolist:obj,
        page: page,
        nextpage : parseInt(page) + 1
      });
    });
  })	
});
module.exports = router;

// var page = req.query.p ? parseInt(req.query.p) : 1;
//   Posts.count({}, function(err, count) {
//     Posts.find({}, null, {skip: (page-1)*3, limit: 3}, function(err, posts) {
//       res.render('index', {
//         title: '主页',
//         user: req.session.user,
//         posts: posts,
//         page: page,
//         isFirstPage: page == 1,
//         isLastPage: (page-1)*3 + posts.length == count,
//         success: req.flash('success').toString(),
//         error: req.flash('error').toString()
//       });
//     });
//   });