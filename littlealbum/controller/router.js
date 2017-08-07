/**
 * Created by liuyang on 2017/6/25.
 */
var file = require("../module/file.js");
var formidable = require('formidable');
var path = require("path");
var fs =  require("fs");
exports.showIndex = function(req,res,next){
    //res.render("index",{
    //    "albums":file.getAllalbums(aa);
    //});
    file.getAllalbums(function(err,albums){
        if(err){
            next();
            return;
        }
        res.render("index",{
            "albums":albums
        })
    })

}
exports.showAlbum = function(req,res,next){
   var albumName = req.params.albumName;
    file.getAllImagesByAlbumName(albumName,function(err,imageArray){
        if(err){
            next();
            return;
        }
        res.render("album",{
            "albumName":albumName,
            "images":imageArray
        });
    })

}
exports.showUp = function (req,res) {
    file.getAllalbums(function (err,albums) {
        res.render("up",{
            albums:albums
        });
    })
}
exports.doPost = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+ "/../"+"/tempup/");
    form.parse(req, function(err, fields, files,next) {
       console.log(fields);
        console.log(files);
        if(files.tupian.size > 1024*1024){
            res.send("文件太大");
            fs.unlink(files.tupian.path);
            return;
        }
        if(err){
            next();
            return;
        }
        var wenjianjia = fields.wenjianjia;
        var  oldpath = files.tupian.path;
        var  newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia +"/"+files.tupian.name);
        fs.rename(oldpath,newpath,function(err){
            if (err){
                res.send("改名失败");
                return;
            }
            res.send("上传成功");
        })
    });
}
