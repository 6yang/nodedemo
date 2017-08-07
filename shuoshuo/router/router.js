/**
 * Created by liuyang on 2017/7/18.
 */
var formidable = require('formidable');
var db = require("../models/db.js");
var md5 = require("../models/md5.js");
var path = require("path");
var fs = require("fs");
var sd = require('silly-datetime');
var ObjectId = require('mongodb').ObjectId;
//主页
exports.showIndex = function(req,res,next){
    res.render("index",{
        "login":req.session.login == "1" ? true:false,
        "username":req.session.username,
        "active":"index",
        "avatar":req.session.avatar
    });
}
//注册页
exports.showRegist = function(req,res,next){
    res.render("regist",{
        "login":req.session.login == "1" ? true:false,
        "username":req.session.username,
        "active":"regist"
    });
}
//注册服务
exports.doRegist = function(req,res,next){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
       var username = fields.username;
        var password = md5(fields.password +"我叫++");
        db.find("shuoshuo","user",{"username":username},function(err,result){
           if(err){
               res.send("-2");
               return;
           }
           if(result.length!=0){
               res.send("-1");
               return;
           }
            db.insertOne("shuoshuo","user",{"username":username,"password":password,"avatar":"moren.jpg"},function(err,result){
               if(err){
                   res.send("-2");
                   return;
               }
                req.session.login = "1";
                req.session.username = username;
                req.session.avatar = "moren.jpg";
                res.send("1");
            });
        });
    });
}
//登录页面
exports.showLogin = function(req,res,next){
    res.render("login",{
        "login":req.session.login == "1" ? true:false,
        "username":req.session.username,
        "active":"login",
        "avator": req.session.avatar
    });
}
//登录服务
exports.doLogin = function(req,res,next){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var l_username = fields.username;
        var l_password = md5(fields.username+"我叫++");
        db.find("shuoshuo","user",{"username":l_username},function(err,result){
           if(err){
               res.send("-2");
               return;
           }
            if(result.length == 0){
                res.send("-1");
                return;
            }
            if(result[0].password!= l_password){
                res.send("0");
                return;
            }else{
                req.session.login = "1";
                req.session.username = l_username;
                req.session.avatar = result[0].avatar;
                res.send("1");
            }
        });
    });
}
//退出登录
exports.goBack = function(req,res,next){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        req.session.login = null;
        req.session.username = null;
        res.send("1");
    });
}
//设置头像页面
exports.setAvatar = function(req,res,next){
    res.render("setavatar",{
        "login":req.session.login == "1" ? true:false,
        "username":req.session.username,
        "active":"index",
        "avatar":req.session.avatar
    });
}
//上传头像
exports.doSetavatar = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../avatar");
    form.parse(req, function(err, fields, files) {
        oldname = files.file.path;
        newname = path.normalize(__dirname + "/../avatar")+"/"+req.session.username +".jpg";
        fs.rename(oldname,newname,function(err){
            if(err){
                res.send("上传图片失败");
                return;
            }
            db.updateMany("shuoshuo","user",{"username":req.session.username},
                {$set:{"avatar":req.session.username+".jpg"}},function(err,result){
                    if(err){
                        res.send("服务器错误");
                        return;
                    }
                    req.session.avatar = req.session.username+".jpg";
                    res.redirect("/");
                });
        });
    });
}
//发说说
exports.postshuoshuo = function(req,res,next){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
       var context = fields.context;
        var date = sd.format(new Date(), 'YYYY/MM/DD HH:mm');
        db.insertOne("shuoshuo","post",{
            "username":req.session.username,
            "avatar":req.session.avatar,
            "date":date,
            "context":context,
            "zan":[],
            "comment":[],
            "orzan":"0"
        },function(err,result){
           if(err){
               res.send("-1");
               return;
           }
            res.send("1");
        });

    });
}
//获得说说列表
exports.getAllshuoshuo = function(req,res,next){
    var page = req.query.page;
    db.find("shuoshuo","post",{},{"limit":10,"skip":page,"sort":{"date":-1}},function(err,result){
        if(err){
            res.send("-1");
            return;
        }
        res.json({"result":result});
    });
}
//获得赞
exports.zanzan  = function(req,res,next){
    var _id = ObjectId(req.query.id);
    var name = req.session.username;
    if(name != null) {
        db.find("shuoshuo", "post", {"_id": _id}, function (err, result) {
            if (err) {
                res.send("-1");
                result;
            }

            var orno = "";
            if (result[0].zan.length != 0) {
                for (var i = 0; i < result[0].zan.length; i++) {


                    if (result[0].zan[i].name == req.session.username) {
                        orno = "1";    //赞的列表里面有这个人
                    } else {
                        orno = "0";   //赞的列表里面没有这个人
                    }
                }
            } else {
                orno = "0";
            }

            //console.log(orno);
            if (orno == "0") {

                db.updateMany("shuoshuo", "post",
                    {"_id": _id},
                    {$push: {"zan": {"name": name}}}, function (err, result1) {
                        if (err) {
                            res.send("-2");
                            return;
                        }
                        db.updateMany("shuoshuo", "post", {"_id": _id}, {$set: {"orzan": "1"}}, function (err, r3) {
                            if (err) {
                                res.send("-2");
                                return;
                            }
                            res.send("add");
                        });

                    });
            } else if (orno == "1") {
                db.updateMany("shuoshuo", "post",
                    {"_id": _id},
                    {$pull: {"zan": {"name": name}}}, function (err, result2) {
                        if (err) {
                            res.send("-2");
                            return;
                        }
                        db.updateMany("shuoshuo", "post", {"_id": _id}, {$set: {"orzan": "0"}}, function (err, r4) {
                            if (err) {
                                res.send("-2");
                                return;
                            }
                            res.send("delete");
                        });
                    });
            }
        });
    }else{
        res.send("no");
    }
}
//获得评论
exports.pinlun = function(req,res,next){
    var form = new formidable.IncomingForm();
    if(req.session.login !=null){
        form.parse(req, function(err, fields, files) {
            //console.log(fields.comment);
            var date = sd.format(new Date(), 'YYYY/MM/DD HH:mm');
            db.updateMany("shuoshuo","post",
                {"_id":ObjectId(fields.id)},
                {$push:{comment:{
                    "comment_id":ObjectId(),
                    "comment_user":req.session.username,
                    "comment_avatar":req.session.avatar,
                    "comment_context":fields.comment,
                    "date":date
                }}},function(err,result){
                    if(err){
                        res.send("-1");
                        return;
                    }
                    res.send("1");
                });
        });
    }else{
        res.send("no");
    }
}
//转发说说
exports.zhuanfa = function(req,res,next){
    var id =req.query.id;
    if(req.session.login !=null){
        db.find("shuoshuo","post",{"_id":ObjectId(id)},function(err,fresult){
            if(err){
                res.send("-1");
                return;
            }
            var date = sd.format(new Date(), 'YYYY/MM/DD HH:mm');
            var zhuanfa =fresult[0].username+":"+fresult[0].context;
            db.insertOne("shuoshuo","post",{
                "username":req.session.username,
                "avatar":req.session.avatar,
                "date":date,
                "context":zhuanfa,
                "zan":[],
                "comment":[],
                "orzan":"0"
            },function(err,iresult){
                if(err){
                    res.send("-1");
                    return;
                }
                res.send("1");
            })
        });
    }else{
        res.send("no");
    }
}