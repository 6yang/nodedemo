/**
 * Created by liuyang on 2017/7/23.
 */
var mongoose = require("mongoose");
var db = require("./db.js");

var bookschema = new mongoose.Schema({
    name   : {type : String},
    author : {type : String},
    price  : {type : Number}
});

bookschema.statics.getallbook = function(callback){
    this.model("book").find({},callback);
}

bookschema.statics.getid = function(id,callback){
    this.model("book").find({"_id":id},callback);
}
bookschema.statics.xiugai = function(conditions, update, options, callback){
    this.model("book").update(conditions, update, options, callback);
}
var bookmodel = db.model("book",bookschema);
module.exports = bookmodel;