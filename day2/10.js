/**
 * Created by liuyang on 2017/6/24.
 */
var http =require("http");
var ejs = require("ejs");
var fs= require("fs");
http.createServer(function(req,res){
    fs.readFile("./views/index.html",function(err,data){
        var dict = {
            a:1000,
            news:["第一个","wonderful","牛牛牛"]
        };
        var html = ejs.render(data.toString(),dict);
        res.writeHead(200, {'content-type': 'text/html'});

        res.end(html);
    })

}).listen(3000,"127.0.0.1");