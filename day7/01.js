
/**
 * Created by liuyang on 2017/7/24.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.createConnection('localhost','test');

db.once('open',function(){
    console.log("数据库连接成功");
});
var animateSchema = mongoose.Schema({
    name : String,
    type : String
});
animateSchema.methods.zhaogou = function(callback){
    this.model("animate").find({"type":this.type},callback);
}
var animate = db.model("animate",animateSchema);
//animate.create({"name":"小mimi","type":"dog"});

animate.findOne({"name":"小mimi"},function(err,result){
    var dog = result;
    console.log(dog);
    dog.zhaogou(function(err,result1){
        console.log(result1);
    })
});