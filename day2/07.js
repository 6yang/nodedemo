/**
 * Created by liuyang on 2017/6/23.
 */
var http = require("http");
var querystring = require("querystring");
http.createServer(function (req,res) {

    if(req.url=="/appcc"&& req.method.toLowerCase()=="post"){
        var alldata = "";
        req.addListener("data", function (chunk) {
            alldata +=chunk;
        })
        req.addListener("end", function (chunk) {
            var dataobj = querystring.parse(alldata);
            console.log(dataobj);
            console.log(dataobj.hobby);
            res.end("sunccess");
        })
    }
}).listen(3000,"127.0.0.1");