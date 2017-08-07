var  http = require("http");
var fs = require("fs");
var server = http.createServer(function(req,res){
	if(req.url=="/favicon.ico"){
		return;
	}
	fs.mkdir("./sss/ssa");
	
});
server.listen(3000,"127.0.0.1.txt");
