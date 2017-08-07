/**
 * Created by liuyang on 2017/7/18.
 */
var fs = require("fs");
var gm = require("gm");

gm("./404.jpg").crop(141,96,152,181).write("./2.jpg",function(err){
         //141  96 是宽高 。  152  181是坐标
    if (err){
        console.log(err);
    }
});
