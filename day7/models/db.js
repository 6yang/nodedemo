/**
 * Created by liuyang on 2017/7/23.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.createConnection('localhost','iii');

db.once('open',function(){
    console.log("数据库连接成功");
});
module.exports = db;