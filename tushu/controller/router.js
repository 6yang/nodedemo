/**
 * Created by liuyang on 2017/7/23.
 */
var book = require("../model/book.js");
var mongoose = require("mongoose");
exports.showIndex =function(req,res,next){
    book.getallbook(function(err,result){
        res.render("index",{
            "result":result
        });
    })
}
exports.showaddlist = function(req,res,next){
    res.render("add");
}
exports.addlist = function(req,res,next){
    book.create(req.query,function(){
        res.send("添加成功");
    })
}
exports.xiugai = function(req,res,next){
    book.find({"_id":mongoose.Types.ObjectId(req.query.id)},function(err,result){
        res.render("xiugai",{
            "result":result
        })
    });
}
exports.delete = function(req,res,next){
    book.update({"_id":mongoose.Types.ObjectId(req.query.id)},{
        "name":req.query.name,
        "author":req.query.author,
        "price":req.query.price
    },{},function(err,result){
        res.redirect("/");
    });
}