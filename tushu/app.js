var express = require("express");
var app = express();
var router = require("./controller/router.js");

app.set("view engine","ejs");

app.get("/",router.showIndex);           //主页
app.get("/showadd",router.showaddlist);  //添加页面
app.get("/add",router.addlist);          //添加操作
app.get("/xiugai",router.xiugai);
app.get("/delete",router.delete);
app.listen(3000);