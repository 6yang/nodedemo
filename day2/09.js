var http = require("http");
var formidable = require('formidable');
var util = require("util");
var sd =  require("silly-datetime");
var fs = require("fs");
var path = require("path");

//创建服务器
var server = http.createServer(function(req,res){
    //如果你的访问地址是这个，并且请求类型是post
    if(req.url == "/appcc" && req.method.toLowerCase() == "post"){
        //Creates a new incoming form.
        var form = new formidable.IncomingForm();
        //设置文件上传存放地址
        form.uploadDir = "./updatas";
        //执行里面的回调函数的时候，表单已经全部接收完毕了。
        form.parse(req, function(err, fields, files) {
            if(err){
                throw err;
            }
            //console.log(fields);
            //console.log(files);
            console.log(util.inspect({fields: fields, files: files}));
            //所有的文本域、单选框，都在fields存放；
            var extname = path.extname(files.myfile.name);
            var date = sd.format(new Date(),'YYYYMMDDHHmmss');
            var ran = parseInt(Math.random()*89999+10000);
            var oldname = __dirname + "/" +files.myfile.path;
            var newname = __dirname + "/updatas/" + date + ran + extname ;
            fs.rename(oldname,newname,function(err){
                if(err){
                    throw  err;
                }

                res.writeHead(200, {'content-type': 'text/html'});

                res.end("success");
            })
            //所有的文件域，files

        });
    }else if(req.url == "/"){
        fs.readFile("./aaa.html",function(err,data){
            if(err){throw err}
            res.writeHead(200, {'content-type': 'text/html'});

            res.end(data);
        })
    }else{
       fs.readFile("./static/404.html",function(err,data){
           if(err){throw err}
           res.writeHead(404, {'content-type': 'text/html'});

           res.end(data);
       })
    }
});

server.listen(3000,"127.0.0.1");