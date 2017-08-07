/**
 * Created by liuyang on 2017/7/21.
 */
getallshuoshuo();
$("#goback").click(function(){
    $.post("/goback",{},function(result){
        if(result == "1"){
            window.location.href = "/";
        }
    });
});
$("#textbt").click(function(){
    if($("#context").val() == ""){
        $("#gg").html("内容不能为空");
        $("#gg").fadeIn();
        $("#gg").fadeOut(1000);
    }else{
        $.post("/postshuoshuo", {
            "context": $("#context").val()
        }, function (result) {
            if (result == "-1") {
                $("#gg").html("服务器错误发表失败");
                $("#gg").fadeIn();
                $("#gg").fadeOut(1000);
            }else if(result == "1"){
                $("#succ").html("发表成功");
                $("#succ").fadeIn();
                $("#succ").fadeOut(1000);
                document.getElementById("context").value = "";
                getallshuoshuo();
            }
        });
    }
});

function  getallshuoshuo(){
    $.get("/getallshuoshuo?page=0",function(result){
        var html = template("shuoshuomoban",result);
        $("#showshuoshuo").html(html);
    });
}
function zanzan(obj) {

    var id = $(obj).attr("date_shuoshuoid");
    $.get("/zanzan?id="+id,function(result){
        if(result =="-1"&&result == "-2"){
            console.log(服务器出错);
        }
        if(result == "add"){
            $(obj).addClass("zano");
            getallshuoshuo();
        }else  if(result == "delete"){
            $(obj).removeClass("zano");
            getallshuoshuo();
        }else if(result == "no"){
            $("#zhuanfashibai").html("您还没有登录，不能点赞");
            $("#zhuanfashibai").fadeIn();
            $("#zhuanfashibai").fadeOut(1000,function() {
                window.location.href = "/login";
            });
        }
    })
}
//评论

function pinlun(obj){
    var id = $(obj).attr("id_pinlun");
    var value = $("#"+id).val();

    if(value == ""){
        $("#"+id).siblings().html("输入框不能为空");
        $("#"+id).siblings().fadeIn();
        $("#"+id).siblings().fadeOut(1000);
    }else{
        $.post("/pinlun",{
            "comment":value,
            "id":id
        },function(result){
            if(result == "no"){
                $("#"+id).siblings().html("您还没有登录，不能发表评论");
                $("#"+id).siblings().fadeIn();
                $("#"+id).siblings().fadeOut(1000,function(){
                    window.location.href = "/login";
                });
            }
            if(result == "1"){
               window.location.href = "/";
            }
            if(result == "-1"){
                $("#"+id).siblings().html("服务器错误");
                $("#"+id).siblings().fadeIn();
                $("#"+id).siblings().fadeOut(1000);
            }
        });
    }
}
function zhuanfa(obj){
    var id = $(obj).attr("zhuanfa");
    $.get("/zhuanfa?id="+id,function(result){
        if(result == "no"){
            $("#zhuanfashibai").html("您还没有登录，不能转发");
            $("#zhuanfashibai").fadeIn();
            $("#zhuanfashibai").fadeOut(1000,function(){
               window.location.href ="/login";
            });
        }else if(result == "-1"){
            $("#zhuanfashibai").html("服务器错误");
            $("#zhuanfashibai").fadeIn();
            $("#zhuanfashibai").fadeOut(1000);
        }else if(result == "1"){
            getallshuoshuo();
        }
    });
}