var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var user = require('../model/user');
var multiparty = require('multiparty');
var fs = require('fs');

//注册
router.get('/register',function(req,res){
  res.render('user/register');  
})
//注册提交
router.post('/registersubmit',function(req,res){
  user.find({ name: req.body.name }, function(err,obj){
    if(obj.length==0){
      //var newuser = req.body;
      bcrypt.hash(req.body.password,null,null,function(err,hash){
        req.body.password = hash;    
        var newuser = new user(req.body).save(function(err,obj){
          res.render('user/registerresult',{
            mes : '注册成功'
          })
          console.log(obj);
        })
      });   	
    }else{
      res.render('user/registerresult',{
        mes : '注册失败'  	
      })	
    }
  })
});
//上传头像表单
router.get('/portrait',function(req,res){
  if(!req.session.uid){
    res.redirect('/');
  }else{
    res.render('user/portrait')    
  }
   
});
//上传头像
router.post('/portrait',function(req,res){
   //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({uploadDir: './public/files/'});
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files,null,2);
    if(err){
      console.log('parse error: ' + err);
    }else{
      // console.log('parse files: ' + filesTmp);
      var inputFile = files.upfile[0];

      var uploadedPath = inputFile.path.slice(7);
      console.log(uploadedPath);
    }
    res.render('user/portrait',{
      path : uploadedPath
    }) 
  });
});
//登陆
router.get('/login',function(req,res){
  res.render('user/login');
})
//登陆提交
router.post('/loginsubmit',function(req,res){
  user.find({name:req.body.name},function(err,obj){
    if(obj.length==0){
      res.render('user/login',{
        mes : '用户不存在'	
      })
    }else{
      bcrypt.compare(req.body.password,obj[0].password,function(err,o){
        if(o){
          console.log(req.session)  
          req.session.uid = obj[0]._id
          //res.send('登陆成功');  
          res.redirect('portrait');
        }else{
          res.send('登陆失败');
        }
      });
    }
  })
})
//退出登录
router.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    res.redirect('/');
  });
})

module.exports = router;