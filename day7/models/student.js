/**
 * Created by liuyang on 2017/7/23.
 */
var mongoose = require("mongoose");
var db = require("./db.js");
var studentty = new mongoose.Schema({
    name : {type : String},
    age  : {type : Number},
    sex  : {type : String}
});
studentty.statics.zhaoren = function (name,callback) {
     this.model("student").find({"name":name},callback);
}
studentty.statics.charu = function(doc,callback){
    this.model("student").create(doc,callback);
}
studentty.statics.gengai = function(conditions, update, options, callback){
    this.model("student").update(conditions, update, options, callback);
}
var studentModel = db.model("student",studentty);
module.exports = studentModel;