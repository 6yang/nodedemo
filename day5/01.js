/**
 * Created by liuyang on 2017/7/14.
 */
var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.get("/",function(req,res){

    var url = "mongodb://localhost:27017/pps";
    MongoClient.connect(url,function(err,db){
       if(err){
           console.log("数据库连接失败");
           return;
       }
       console.log("连接成功");
        db.collection("student").insertOne({
            "name":"hah",
            "age":Math.random()*100+10
        },function(err,result){
            if(err){
                console.log("插入失败");
                return;
            }
            res.send(result);
            console.log(result);
            db.close();
        })
    });
});



app.listen(3000);
