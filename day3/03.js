/**
 * Created by liuyang on 2017/6/25.
 */
var app = require("express")();
app.get("/student/:id",function(req,res){
   var id  = req.params["id"];
    var reg = /^[\d]{6}$/;
    if(reg.test(id)){
        res.send(id);
    }else {
        res.send("请检查代码格式");
    }
});
app.listen(3000);