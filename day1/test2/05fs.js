var  http = require("http");
var fs = require("fs");
var server = http.createServer(function(req,res){
	if(req.url=="/favicon.ico"){
		return;
	}
	res.writeHead(200,{"Content-type":"text/html;charset=UTF8"});
	fs.readFile("./案例清单.txt",{"charset":"utf-8"},function(err,data){
		if(err){
			throw err;
		}
		console.log(1);
		res.end(data);
	})
	console.log(2);
});
server.listen(3000,"127.0.0.1.txt");
