var http = require("http");
http.createServer(function(req,res){
	// req 是请求  res是响应
	console.log("服务器接收到了请求"+req.url);
	res.writeHead(200,{"Content-type":"text/html;charset=UTF8"})
	res.write("hahhah");
	res.write((1+2+3).toString());
	res.end("你这个大傻逼");
}).listen("3000","127.0.0.1.txt");
