/**
 * Created by liuyang on 2017/6/23.
 */

exports.showIndex = showIndex;
exports.show404 = show404;
exports.showStudent= showStudent;


function  showIndex(req,res){
    res.writeHead(200,{"Content-type":"text/html;charset=utf8"});
    res.write("我是主页");
}
function showStudent(req,res){
    res.writeHead(200,{"Content-type":"text/html;charset=utf8"});
    res.write("我是学生");
}
function show404(req,res){
    res.writeHead(200,{"Content-type":"text/html;charset=utf8"});
    res.write("404");
}