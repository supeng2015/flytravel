//这是一个巨魔的数据表，主要练习增删改查
var mongoose = require('./db.js');
//建一个草图
var userSchema = mongoose.Schema({
  name: String,
  //头像
  portrait : String,
  //权限
  power : Number,
  email : String,
  password : String,
  //种族
  race : Number
});
//静态方法
// jvmoSchema.methods.speak = function () {
//   var greeting = this.name ? "Meow name is " + this.name : "I don't have a name"
//   console.log(greeting);
// }
//模型化草图
var User = mongoose.model('User', userSchema);
//实例化一条数据
// var supeng = new User({
//  name : '憨憨的猫猫',
//  portrait : 'qqq.jpeg',
//  power : 3,
//  email : '281317914@qq.com',
//  race : 0
// })
// supeng.save(function(err,obj){
//   console.log(obj)
// })

module.exports = User