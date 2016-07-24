var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
//var util = require('util');
var fs = require('fs');

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
  });	
});
//增加表单
router.get('/add',function(req,res){
  res.render('jvmoview/addjvmo');  
})
//提交增加表单
router.post('/addsubmit',function(req,res){
  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({uploadDir: './public/files/'});
  //上传完成后处理
    form.parse(req, function(err, fields, files) {
      console.log(fields); 
      console.log(files);
      var filesTmp = JSON.stringify(files,null,2);
      if(err){
        console.log('parse error: ' + err);
      } else {
        // console.log('parse files: ' + filesTmp);
        var inputFile = files.picture[0];

        var uploadedPath = inputFile.path.slice(7);
        console.log(uploadedPath);
        //var dstPath = './public/files/' + inputFile.originalFilename;
        //重命名为真实文件名
        // fs.rename(uploadedPath, dstPath, function(err) {
        //   if(err){
        //     console.log('rename error: ' + err);
        //   } else {
        //     console.log('rename ok');
        //  }
        // });
      }
      //res.render('jvmoview/addjvmo');
      // res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
      // res.write('received upload:\n\n');
      //res.end(util.inspect({fields: fields, files: filesTmp}));
      res.render('jvmoview/addjvmoformsubmit',{
        path : uploadedPath
      }) 
    });


  
})
module.exports = router;

