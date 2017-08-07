/**
 * Created by liuyang on 2017/6/24.
 */

    数据绑定
var ejs = require("ejs");
var string = "哈哈哈，好高兴，今天买了<%= a %>个苹果";
var data = {
    a: 1000
};
var html =ejs.render(string,data);
console.log(html);