var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var user = require('../model/user');

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
//上传头像
router.get('/portrait',function(req,res){
  res.render('user/portrait')  
})

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
          res.send('登陆成功');  
        }else{
          res.send('登陆失败');
        }
      });
    }
  })
})


module.exports = router;