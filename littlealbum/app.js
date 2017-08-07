/**
 * Created by liuyang on 2017/6/25.
 */
var express = require("express");
var router = require("./controller");
var app = express();
//设置模板引擎
app.set("view engine","ejs");
//路由中间件
//设置静态页面
app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.get("/",router.showIndex);

app.get("/:albumName",router.showAlbum);
app.get("/up",router.showUp);
app.post("/up",router.doPost);
app.use(function(req,res){
    res.render("err");
});
app.listen(3000);