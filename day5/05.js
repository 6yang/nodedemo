/**
 * Created by liuyang on 2017/7/17.
 */
var express = require("express");
var app = express();
var session = require("express-session");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.get("/",function(req,res){
    if(req.session.login == "1"){
        res.send("欢迎你"+req.session.username);
    }else{
        res.send("你还没有登陆");
    }
});
app.get("/login",function(req,res){
    req.session.login = "1";
    req.session.username = "刘洋";
    res.send("你已经成功登陆");

});
app.listen(3000);

