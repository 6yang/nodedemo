var http = require("http");
var url = require("url");
var server = http.createServer(function(req,res){
	// r
	var path = url.parse(req.url).pathname;
	var query = url.parse(req.url,true).query;   // true 将 query  变为对象得到 
	var age = query.age;
	console.log("pathname:"+path);
//	console.log("query:" + query);
	console.log("age:"+age);
	res.end();
}).listen(3000,"127.0.0.1.txt");
