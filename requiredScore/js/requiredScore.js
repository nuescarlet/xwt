/**
 * Created by ge on 2017/6/24.
 */
//选项切换
+function(){
    $(".left-box").on("click","li",function(){
        var clt=["分数线查询","专业查询","艺考查询","全国院校库","填报志愿"];
        $(this).addClass("active").siblings().removeClass("active");
        $(".address a:nth-child(3) span").html(clt[$(this).data("class")])
    })
    $(".box-option").on("click","li",function(){
        $(this).addClass("active").siblings().removeClass("active");
    })
}();

//下拉菜单选择
+function(){
    var allMenu=$(".input .menu");
    for(var i=0;i<allMenu.length;i++){
        $(allMenu[i]).css({"width":$(allMenu[i]).css("width")})
    }
    $(".menu").on("click","div>p",function(){
        $(this).parent().parent().children("span").html($(this).html())
    })
    $(".menu").on("click",function(){
        if($(this).children("div").css("display")=="none"){
            $(this).children("div").show();
        }else{
            $(this).children("div").hide();
        }

    })
}();

//查询
+function(){
    var error=0;
    $(".btn").click(function(){
        if(error==0){
            error=1;
            $(".error").show().animate({"opacity":"1"},300,function(){
                setTimeout(function(){
                    $(".error").animate({"opacity":"0"},300,function(){
                        $(".error").hide();
                        error=0;
                    })
                },2000)
            })
        }
    })
}();