/**
 * Created by liuyang on 2017/6/26.
 */
var fs = require("fs");
exports.getAllalbums = function(callback){
    fs.readdir("./uploads", function (err,files) {
        if(err){
            callback("没有找到uploads文件夹",null);
        }
        var albums = [];
        (function iteror(i){
            if(i == files.length){
                //console.log(albums);
                callback(null,albums);
                return;
            }
            fs.stat("./uploads/"+files[i],function(err,stats){
                if(err){
                    callback("找不到文件"+files[i],null);
                }
                if(stats.isDirectory()){
                    albums.push(files[i]);
                }
                iteror(i+1);
            });
        })(0);

    });
}

exports.getAllImagesByAlbumName = function(albumName,callback){
    fs.readdir("./uploads/"+albumName, function (err,files) {
        if(err){
            callback("没有找到文件夹",null);
            return;
        }
        var images = [];
        (function iterr(i){
            if(i == files.length){
                console.log(images);
                callback(null,images);
                return;
            }
            fs.stat("./uploads/"+albumName+"/"+files[i],function(err,stats){
                if(err){
                    callback("找不到文件"+files[i],null);
                    return;
                }
                if(stats.isFile()){
                    images.push(files[i]);
                }
                iterr(i+1);
            });
        })(0);

    });
}