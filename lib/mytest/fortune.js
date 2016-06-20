var fortune = [
  'binbin',
  'sy',
  'xiaohua'
];
exports.getFortune = function(){
  var idx = Math.floor(Math.random()*fortune.length);
  return fortune[idx];
};