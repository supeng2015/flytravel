var mongoose = require('./db.js');
//建一个草图
var jvmoSchema = mongoose.Schema({
  name: String,
  distribution : String,
  picture : String,
  classification : Number,
  describe : String
});
//静态方法
// jvmoSchema.methods.speak = function () {
//   var greeting = this.name ? "Meow name is " + this.name : "I don't have a name"
//   console.log(greeting);
// }
//模型化草图
var Jvmo = mongoose.model('Jvmo', jvmoSchema);
//实例化一条数据
//var xueding = new Jvmo({
//  name:'恶齿',
//  distribution: '辛特兰',
//  picture : '',
//  classification : 2,
//  describe : ''
//})
module.exports = Jvmo