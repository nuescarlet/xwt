/**
 * Created by ge on 2017/6/6.
 */
//励志课堂选择
+function () {
    $(".classroom .box .page li").click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        if ($(this).attr("id")=="CEE") {
            $(".classroom .box .main ul").css({"left": "-500px"});
            $(".pic1").css({"left": "-200px","opacity":"0"});
            setTimeout("$('.pic2').css({'left': '-100px','opacity':'1'})", 200);
        } else {
            $(".classroom .box .main ul").css({"left": "0px"});
            $(".pic2").css({"left": "-300px","opacity":"0"});
            setTimeout("$('.pic1').css({'left': '0px','opacity':'1'})", 200);
        }
    })
}();

//lineHeight自适应
($)(function(){
    var lineHeight= $(".menu li").css("height");
    console.log($(".menu li").css("height"))
    $(document).ready(function(){
        $(".menu li").css({"line-height":lineHeight});
    })
    $(window).resize(function(){
        lineHeight= $(".menu li").css("height");
        $(".menu li").css({"line-height":lineHeight});
    })
});
//实践之旅选择
+function(){
    var choose=$(".practice .choose");
    $(".practice .option").hover(function () {
        if($(this).attr("id")=="option1"){
            choose.css({"top":"0px"})
        }else if($(this).attr("id")=="option2"){
            choose.css({"top":"240px"})
        }else{
            choose.css({"top":"480px"})
        }
    })
}();

//页头固定,六个圈动效
+function(){
    $(document).ready(function(e) {
        var circle=1;
        s = $(document).scrollTop();
        if(s<100){
            $(".h-nav").removeClass("h-fixed s-fixed");
            setTimeout("$('.h-nav').removeClass('s-fixed')", 110)
        }else{
            $(".h-nav").addClass("h-fixed");
            setTimeout("$('.h-nav').addClass('s-fixed')", 105)
        };
        $(window).scroll(function(e){
            s = $(document).scrollTop();
            if(s<100){
                $(".h-nav").removeClass("h-fixed s-fixed");
                setTimeout("$('.h-nav').removeClass('s-fixed')", 110)
            }else{
                $(".h-nav").addClass("h-fixed");
                setTimeout("$('.h-nav').addClass('s-fixed')", 105)
            };

            if(s>=2700){
                if(circle==1){
                    circle=0;
                    setTimeout("$('.circle:nth-child(3),.circle:nth-child(4),.circle:nth-child(5),.circle:nth-child(6),.circle:nth-child(7)').css({'left': '18.4375%','top':'34.53724605%'})", 100);
                    setTimeout("$('.circle:nth-child(4),.circle:nth-child(5),.circle:nth-child(6),.circle:nth-child(7)').css({'left': '31.875%','top':'10.15801354%'})", 200);
                    setTimeout("$('.circle:nth-child(5),.circle:nth-child(6),.circle:nth-child(7)').css({'left': '52.08333333%','top':'10.15801354%'})", 300);
                    setTimeout("$('.circle:nth-child(6),.circle:nth-child(7)').css({'left': '66.875%','top':'34.53724605%'})", 400);
                    setTimeout("$('.circle:nth-child(7)').css({'left': '71.35416667%','top':'70.54176072%'})", 500);
                    setTimeout("$('.circle p').css({'opacity':'1'})", 800);
                }
            }
        })
    });
}();