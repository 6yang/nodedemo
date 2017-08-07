/**
 * Created by liuyang on 2017/7/18.
 */
var express = require("express");
var app = express();
var router = require("./router/router.js");
var session = require("express-session");
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
//模板引擎
app.set("view engine","ejs");
//静态页面
app.use(express.static("./public"));
app.use(express.static("./avatar"));
//路由表

app.get("/",router.showIndex);
app.get("/regist",router.showRegist);               //注册页面
app.post("/doregist",router.doRegist);              //注册服务
app.get("/login",router.showLogin);                 //登录页面
app.post("/dologin",router.doLogin);                //登录服务
app.post("/goback",router.goBack);                  //退出登录
app.get("/setavatar",router.setAvatar);             //设置头像页面
app.post("/dosetavatar",router.doSetavatar);        //上传头像
app.post("/postshuoshuo",router.postshuoshuo);      //发表说说存入数据库
app.get("/getallshuoshuo",router.getAllshuoshuo);   //获得说说列表
app.get("/zanzan",router.zanzan);                   //获得点赞
app.post("/pinlun",router.pinlun);                  //获得评论
app.get("/zhuanfa",router.zhuanfa);                 //转发说说
app.listen(3000);