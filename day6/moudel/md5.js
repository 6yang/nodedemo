/**
 * Created by liuyang on 2017/7/17.
 */
var crypto = require("crypto");
module.exports  = function(word){
    var md5 = crypto.createHash("md5");
    var password = md5.update(word).digest("base64");
    return password;
}