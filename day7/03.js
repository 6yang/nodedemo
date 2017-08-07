/**
 * Created by liuyang on 2017/7/24.
 */
var http = require("http");
var fs = require("fs");
var server = http.createServer(function(req,res){
    if(req.url == "/"){
        fs.readFile("./1.html",function(err,data){
            res.end(data);
        });
    }
});
var io = require("socket.io")(server);
io.on("connection",function(socket){
   console.log("一个客户端连接了")
    socket.on("tiwen",function(msg){
        console.log(msg);
        socket.emit("huida","吃了");
    });
});
server.listen(3000,"127.0.0.1");