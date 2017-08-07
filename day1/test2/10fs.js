var http = require("http");
var fs = require("fs");
http.createServer(function(req,res){
	if(req.url == "/favicon.ico"){
		return;
	}
	fs.readdir("./",function(err,file){
		var wenjianjia = [];
		(function iterator(i){
			if(i  ==   file.length){
				console.log(wenjianjia);
				return;
			}
			fs.stat("./"+file[i],function(err,status){
				if(status.isDirectory()){
					wenjianjia.push(file[i]);
				}
				iterator(i+1);
			})
		})(0);
	});
	res.end();
	
}).listen(3000,"127.0.0.1.txt");
