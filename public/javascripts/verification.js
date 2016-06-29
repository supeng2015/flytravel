sp.verification = function(){
  return {
    legal : true,
    //空验证
    emptyCom : function(){
      var bre = false;
      $.each(arguments,function(i,n){
        if(!n.val()&&!bre){
          alert('请填写完整');
          bre = true;    
        }
      })
      if(bre){
        this.legal = false;   
      }
    },
    //确认密码
    surePassword : function(pass,cpass){
     	console.log(pass);
      if(pass.val()!=cpass.val()){
      	alert('确认密码不一致');
        this.legal = false;       
      }    
    },
    //提交验证
    submitForm : function(formid,pass,cpass,name,email){
      formid.submit(function(){
        $that = sp.verification();
        $that.emptyCom(pass,cpass,name,email);
        $that.surePassword(pass,cpass);
        console.log($that.legal);
        if(!$that.legal){
          return false	
        }
      });	
    }
  }
}