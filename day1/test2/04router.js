var http = require("http");
var sever = http.createServer(function(req,res){
	//得到URL
	var useurl = req.url;
	res.writeHead(200,{"Content-type":"text/html;charset=utf8"});
	if(useurl.substr(0,9)=="/student/"){
		var studentid = useurl.substr(9);
		if(/^\d{6}$/.test(studentid)){
			res.end("您要查询的学生ID:"+studentid);
		}else{
			res.end("学号位数不对 ")
		}
	}else if(useurl.substr(0,9)=="/teacher/"){
		var teacherid = useurl.substr(9);
		if(/^\d{6}$/.test(teacherid)){
			res.end("您要查询的老师ID:"+teacherid);
		}else{
			res.end("学号位数不对 ")
		}
	}else{
		res.end("信息不对");
		
	}
});
sever.listen(3000,"127.0.0.1.txt");
