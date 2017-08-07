/**
 * Created by liuyang on 2017/7/16.
 */
var express = require("express");
var app = express();
var db = require("./model/db.js");
var formidable = require('formidable');

app.set("view engine","ejs");
app.use(express.static("./public"));

//浏览所有留言
app.get("/",function(req,res,next){
    db.fcount("pps","liuyan",function(count){
        res.render("index",{
            "pagemount":Math.ceil(count/4)
        });
    });


});
app.get("/du",function(req,res,next){
    var page = parseInt(req.query.page);
    db.find("pps","liuyan",{},{"sort":{"date":-1},"limit":5,"skip":page},function(err,result){
        if(err){
            console.log(err);
            return;
        }
       res.json({"result":result});
    });
});

app.post("/tijiao",function(req,res,next){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields) {
        db.insertOne("pps","liuyan",{
            "name":fields.xinming,
            "text":fields.liuyan,
            "date":new Date()
        },function(err,result){
            if(err){
                console.log(err);
                res.send({"result":-1});
                return;
            }
            res.send({"result":1});
        })
    });
});



app.listen(3000);