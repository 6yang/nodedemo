/**
 * Created by liuyang on 2017/6/25.
 */
var express = require("express");

var app= express();
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("hah",{
        "news":["hahah","goodddd","niccesssss"]
    });
});
app.listen(3000);