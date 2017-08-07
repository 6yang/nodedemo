
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.createConnection('localhost','test');

db.once('open',function(){
    console.log("数据库连接成功");
});
var blogSchema = mongoose.Schema({
    title : String,
    body : String,
    comment:[{body:String,date:Date}],
    date:Date
});
blogSchema.methods.pinlun = function(obj,callback){
    this.comment.push(obj);
    this.save();
}

var blog = db.model("blog",blogSchema);
blog.findOne({"title":"第2篇文章"},function(err,re1){
   re1.pinlun({
       "body": "评论内容ssss",
       "date": new Date()
   });
});