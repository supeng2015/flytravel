var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var user = require('../model/user');

//注册列表
router.get('/register',function(req,res){
  res.render('user/register');  
})
//注册
router.post('/registersubmit',function(req,res){
  user.find({ name: req.body.name }, function(err,obj){
    
    if(obj.length == 0){
      //var newuser = req.body;
      bcrypt.hash(req.body.password,null,null,function(err,hash){
        req.body.password = hash;    
        var newuser = new user(req.body).save(function(err,obj){
          res.render('user/registerresult',{
            mes : '注册成功'
          })
          console.log(obj)
        })
      });   	
    }else{
      res.render('user/registerresult',{
        mes : '注册失败'  	
      })	
    }
  })
})

module.exports = router;