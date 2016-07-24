//这是我的素描作品
var mongoose = require('./db.js');
//建一个草图
var sketchSchema = mongoose.Schema({
  name : String,
  updatetime : Date,
  picture : String
});
//静态方法
// jvmoSchema.methods.speak = function () {
//   var greeting = this.name ? "Meow name is " + this.name : "I don't have a name"
//   console.log(greeting);
// }
//模型化草图
var Sketch = mongoose.model('Sketch', sketchSchema);
//实例化一条数据
var onesketch = new Sketch({
  name:'圆',
  updatetime : new Date(),
  picture : '/file/tt001.jpg'
})
// onesketch.save(function(err,obj){
//   console.log(obj)
// })
module.exports = Sketch