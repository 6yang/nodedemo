/**
 * Created by liuyang on 2017/7/15.
 */
var express = require("express");
var app = express();
var db = require("./model/db.js");

app.get("/",function(req,res){
    db.insertOne("icat","new",{"name":"刘洋","age":parseInt(Math.random()*90+10)},function(err,result){
        if(err){
            console.log("插入失败");
            return;
        }
        res.send("插入成功");
    });
});
app.get("/du",function(req,res){
    var page = parseInt(req.query.page);

    db.find("icat","new",{},{"pagemount":5,"page":page},function(err,result){
        if(err){
            console.log("查找失败");
            return;
        }
        res.send(result);
    })
})


app.listen(3000);