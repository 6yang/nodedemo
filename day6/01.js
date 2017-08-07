/**
 * Created by liuyang on 2017/7/17.
 */
var express = require("express");
var app = express();
var db = require("./moudel/db.js");
var formidable = require("formidable");
var md5 = require("./moudel/md5.js");
app.set("view engine","ejs");

app.use(express.static("./public"));
app.get("/regist",function(req,res,next){
   res.render("regist");
});
app.get("/login",function(req,res,next){
    res.render("login");
})

app.post("/dregist",function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
       if(fields.name.length!=0 && fields.password.length!=0  ){
            var md5password =md5(md5(fields.password).substr(3,8));
           db.insertOne("icat","all",{
               "name":fields.name,
               "password":md5password
           },function(err,result){
                if(err){
                    res.send("-1");
                    return;
                }
               res.send("1");
           });
       }else{
           res.send("2");
       }
    });
});
app.post("/dlogin",function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var lname = fields.name;
        var lmd5password = md5(md5(fields.password).substr(3,8));
        db.find("icat","all",{
            "name":lname
        },function(err,result){
            if(result.length==0){
                res.send("-1");
                return;
            }
            if(result[0].password == lmd5password){
                res.send("1");
            }else{
                res.send("2");
            }

        })
    });
});

app.listen(3000);