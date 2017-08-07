var http = require("http");
var url = require("url");
 http.createServer(function(req,res){
	// r
	var query = url.parse(req.url,true).query;   // true 将 query  变为对象得到 
	var name = query.name;
	var age = query.age;
	var sex = query.sex;
	
	res.end("服务器接收到了请求"+name+age+sex);
}).listen(3000,"127.0.0.1.txt");
