var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;
	if(pathname == "/"){
		pathname = "index.html";
	}
	var extname = path.extname(pathname);
	fs.readFile("./static/"+pathname,function(err,data){
		if(err){
			fs.readFile("./static/404.html",function(err,data){
				res.writeHead(404,{"Content-type":"text/html;charset=UTF8"});
				res.end(data);
			});
			return;
		}
		var mine = getextname(extname);
		res.writeHead(200,{"Content-type":mine});
		res.end(data);
	});
}).listen(3000,"127.0.0.1.txt");
function getextname(extname){
	switch(extname){
		case ".html":
			return "text/html;charset=UTF8";
			break;
		case ".png":
			return "images/png";
			break;
		case ".css":
			return "text/css";
			break;
	}
}
