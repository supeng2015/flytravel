var mongoose = require('./db.js');
//建一个草图
var kittySchema = mongoose.Schema({
  name: String
});
kittySchema.methods.speak = function () {
  var greeting = this.name ? "Meow name is " + this.name : "I don't have a name"
  console.log(greeting);
}
//模型化草图
var Kitten = mongoose.model('Kitten', kittySchema);
//实例化一条数据
//var silence = new Kitten({ name: 'Silence' })
// silence.save(function (err, silence) {
//   if (err) return console.error(err);
//   silence.speak();
// });
Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens)
})
module.exports = Kitten;