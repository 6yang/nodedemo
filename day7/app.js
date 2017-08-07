/**
 * Created by liuyang on 2017/7/23.
 */
var student = require("./models/student.js");
//var xiaoming = new student({
//    "name" : "xiaoming",
//    "age"  : 22,
//    "sex"  : "男"
//});
//
//xiaoming.save(function(err){
//
//    console.log("存储成功");
//});
//student.create({"name":"小红",age:22,sex:"女"},function(err){
//    console.log("保存成功");
//});
//student.zhaoren("小红",function(err,result){
//   console.log(result);
//});
//student.charu({
//    "name":"小李子",
//    "age":33,
//    "sex":"男"
//},function(err){
//    console.log("保存成功");
//})
student.gengai({"name":"小红"},{$set:{"age":99}},{},function(err,result){
   console.log("更改成功");
});