/**
 * Created by liuyang on 2017/7/17.
 */
var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();
app.use(cookieParser());
app.get("/",function(req,res){
    res.cookie('name', 'iis', { maxAge:30000, httpOnly: true });
    res.send("我去过的地方有"+req.cookies.mudi);
});
app.get("/gonglue",function(req,res){
    var mudi = req.query.mudi;
    var mudiarray = req.cookies.mudi || [];
    var n = [];
    mudiarray.push(mudi);
    for(var i = 0 ;i<mudiarray.length;i++){
        if(n.indexOf(mudiarray[i] )== -1) {
            n.push(mudiarray[i]);
        }
    }
    res.cookie('mudi', n, { maxAge:300000, httpOnly: true });
    res.send("目的地是："+ mudi);

});

app.listen(3000);