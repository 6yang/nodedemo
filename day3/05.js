/**
 * Created by liuyang on 2017/6/25.
 */
var  express = require("express");
var app = express();
app.get("/",function(req,res){
    console.log(req.query);
    res.send();
});
//http://127.0.0.1:3000/?id=10000&name=sss&name=aaa
//{ id: '10000', name: [ 'sss', 'aaa' ] }

app.listen(3000);
