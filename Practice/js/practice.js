//屏幕滚动控制组件
+function(){
    $(document).ready(function(e) {
        var s = $(document).scrollTop();
        var h = $(document.body).height();
        var speed=7
        var w = $(document.body).width();
        var t=$(".practice").offset().top-$(window).height();
        var v = 100-((s-t)*speed/100)
        if(s<100){
            $(".h-nav").removeClass("h-fixed s-fixed");
            setTimeout("$('.h-nav').removeClass('s-fixed')", 110)
        }else{
            $(".h-nav").addClass("h-fixed");
            setTimeout("$('.h-nav').addClass('s-fixed')", 105)
        };
        if(s>=t&&v<=100&&v>=0){
            $(".practice").css({"background-position":"0 "+v+"%"})
        }
        $(window).scroll(function(e){
            s = $(document).scrollTop();
            h = $(document.body).height();
            w = $(document.body).width();
            t=$(".practice").offset().top-$(window).height();
            v = 100-((s-t)*speed/100)
            if(s<100){
                $(".h-nav").removeClass("h-fixed s-fixed");
                setTimeout("$('.h-nav').removeClass('s-fixed')", 110)
            }else{
                $(".h-nav").addClass("h-fixed");
                setTimeout("$('.h-nav').addClass('s-fixed')", 105)
            };
            if(s>=t&&v<=100&&v>=0){
                $(".practice").css({"background-position":"0 "+v+"%"})
            }
        })
    });
}();

//新闻选择组件
+function(){
    $(".news .box li:nth-child(3) a").hover(function(){
        switch($(".news .box li a").index($(this)))
        {
            case 0:
                $(".news .box .option").css({"top":"-22px","height":"71px"});
                break;
            case 1:
                $(".news .box .option").css({"top":"49px","height":"71px"});
                break;
            case 2:
                $(".news .box .option").css({"top":"120px","height":"71px"});
                break;
            case 3:
                $(".news .box .option").css({"top":"191px","height":"104px"});
                break;
        }
    })
}();

//报名组件
+function(){
    $(".join").hover(function(){
        $(".i1").css({"top":"-85px"});
        $(".i2").css({"bottom":"-85px"});
    });
    $(".join").mouseleave(function() {
        $(".i1").css({"top": "-35px"});
        $(".i2").css({"bottom": "-35px"});
    })
}();

//视频组件
+function(){
    var start=0;
    $(".play").click(function(){
        $(this).removeClass("active").prev().trigger('play');
        start=1;
    });
    $(".pause").click(function(){
        $(this).removeClass("active").prev().prev().trigger('play');
    });
    $("Video").click(function(){
        if($("Video")[0].paused==true){
            $(this).trigger('play');
            $(this).next().removeClass("active").next().removeClass("active");
        }else{
            $(this).trigger('pause');
            $(this).next().next().addClass("active");
        }
    });
    $("Video").on("pause",function(){
        $(this).next().next().addClass("active");
    });
    $("Video").on("play",function(){
        $(this).next().removeClass("active").next().removeClass("active");
    });
}();