var http = require("http");
var fs = require("fs");
var path = require("path");
var url = require("url");
http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;
	if(pathname.indexOf(".")==-1){
		pathname = "index.html";
	}
	fileURl = "./"+path.normalize("./static/"+pathname);
	var extname = path.extname("pathname");
	fs.readFile(fileURl,function(err,data){
		if(err){
			fs.readFile("./static/404.html",function(err,data){
				res.writeHead(404,{"Content-type":"text/html;charset = UTF8"});
				res.end(data);
			});
		}
			getextname(extname,function(mime){			
				res.writeHead(200,{"Content-type":mime});
				res.end(data);
			});
		
	})
}).listen(3000,"127.0.0.1.txt");

function getextname(extname,callback){
	fs.readFile("./mime.json",function(err,data){
		if(err){
			throw ("找不到 MIME文件");
			return;
		}
		var mimejson = JSON.parse(data);
		var mime = mimejson[extname] || "text/html;charset=UTF8";
		callback(mime);
	});
	
}
