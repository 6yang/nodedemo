
/**
 * Created by liuyang on 2017/6/25.
 */


var express = require("express");
var app = express();
app.use(express.static("./static"));
app.get("/haha",function(req,res){
   res.send("haha");
})
app.listen(3000);