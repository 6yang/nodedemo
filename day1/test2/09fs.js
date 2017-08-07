var  http = require("http");
var fs = require("fs");
var server = http.createServer(function(req,res){
	if(req.url=="/favicon.ico"){
		return;
	}
	var files = [];
	fs.readdir("./",function(err,file){
		for(var i=0;i<file.length;i++){
			var thefile = file[i];
			fs.stat("./"+thefile,function(err,status){
				if(status.isDirectory()){
					files.push(thefile);
				}
			});
		}
	});
	
});
server.listen(3000,"127.0.0.1.txt");


//不成功；