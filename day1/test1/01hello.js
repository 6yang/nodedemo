var http  = require("http");
var fs = require("fs");
var server = http.createServer(function(req,res){
	if(req.url == "/fang"){
		fs.readFile("./fang.html",function(err,data){
			res.writeHead(200,{"Content-type":"text/html;charset = utf-8"});
			res.end(data);
		})
	}
	else if(req.url == "/yuan"){
		fs.readFile("./yuan.html",function(err,data){
			res.writeHead(200,{"Content-type":"text/html;charset = utf-8"});
			res.end(data);
		})
	}
	else if(req.url =="/logo.png"){
		fs.readFile("./logo.png",function(err,data){
			res.writeHead(200,{"Content-type":"image/png"});
			res.end(data);
		})
	}
	else if(req.url =="/bbb.css"){
		fs.readFile("./bbb.css",function(err,data){
			res.writeHead(200,{"Content-type":"text/css"});
			res.end(data);
		})
	}
	else{
		res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
		res.end("没有这个页面呦");
	}
});
//运行服务器  
server.listen(3000,"127.0.0.1.txt");
