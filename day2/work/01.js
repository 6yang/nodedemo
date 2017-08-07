/**
 * Created by liuyang on 2017/6/24.
 */
var http = require("http");
var fs = require("fs");
var formidable = require("formidable");
var ejs = require("ejs");
var server = http.createServer(function(req,res){
    if(req.url == "/admin"){
        fs.readFile("./admin.html",function(err,data){
            var dict ={
                fil:[]
            };
            fs.readdir(__dirname+"/uploads/",function(err,files){
                (function iterator(i){
                    fs.stat(__dirname+"/uploads/"+files[i],function(err,stats){
                        //if(status.isDirectory()){
                        //    //dict.fil.push(files[i]);
                        //    console.log("1");
                        //}
                        if(err){
                            throw  err;
                        }
                        if(stats.isFile()){
                            //如果是文件夹，那么放入数组。不是，什么也不做。
                            console.log("1");
                        }
                        iterator(i+1);
                    });
                })(0);
                var html = ejs.render(data.toString(),dict);
                res.writeHead(200,{"Content-type":"text/html;charset = UTF8"});
                res.end(html);

            });

        });
    }else if(req.url == "/appcc" && req.method.toLowerCase() =="post"){
        var form = new formidable.IncomingForm();

    }
});
server.listen(3000,"127.0.0.1");
