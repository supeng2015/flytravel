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
        req.body.race = Math.floor(Math.random()*5); 
        var newuser = new user(req.body).save(function(err,obj){
          //console.log(obj);
          req.session.user = obj;
          res.redirect('portrait');
          // res.render('user/registerresult',{
          //   mes : '注册成功'
          // })
          //console.log(obj);
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
  if(!res.locals.user){
    res.redirect('/');
  }else{
    res.render('user/portrait',{
      cat :  res.locals.user.name 
    })    
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
      var inputFile = files.upfile[0];
      var uploadedPath = inputFile.path;
      var suzu = inputFile.path.split('/');
      suzu[suzu.length-1] = res.locals.user._id + '.jpg';
      var dstPath = suzu.join('/');
      console.log(dstPath);
      //console.log(uploadedPath);
      //var dstPath = './public/files/' + inputFile.originalFilename;
      //console.log(dstPath);
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function(err) {
        if(err){
          console.log('rename error: ' + err);
        }else{
          //修改数据库里用户的头像路径  
          user.findOne({name:res.locals.user.name},function(err,doc){
            doc.portrait = dstPath.split('/')[1] + "/" + dstPath.split('/')[2];
            doc.save(function(err,obj){
              name:res.locals.user.portrait = obj.portrait
              res.render('user/portrait',{
                path : res.locals.user.portrait,
                cat :  res.locals.user.name 
              }) 
            });
          })
        }
      });
    };
    
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
          req.session.user = obj[0];
          res.redirect('portrait');
          //res.send('登陆成功');  
          //res.redirect('portrait');
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
//个人首页
router.get('/myinfo',function(req,res){
  console.log(res.locals.user.race);
  switch(res.locals.user.power){
    case 0 : 
      res.locals.user.powerCn = "死猫";
      break;
    case 1 : 
      res.locals.user.powerCn = "普通猫";
      break;
    case 2 : 
      res.locals.user.powerCn = "氏族首领猫";
      break;
    case 3 : 
      res.locals.user.powerCn = "超级猫";
      break;      

  }  
  switch(res.locals.user.race){
    case 0 : 
      res.locals.user.raceCn = '黑暗巨魔';
      break;
    case 1 :
      res.locals.user.raceCn = '沙漠巨魔';
      break;
    case 2 :
      res.locals.user.raceCn = '森林巨魔';
      break;
    case 3 : 
      res.locals.user.raceCn = '丛林巨魔';
      break;
    case 4 : 
      res.locals.user.raceCn = '冰霜巨魔';
      break;
    default :
      res.locals.user.raceCn = '未知生物';   
  };
  res.render('user/myinfo',{
    info : res.locals.user
  })
})

module.exports = router;