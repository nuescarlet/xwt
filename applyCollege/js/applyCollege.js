//屏幕滚动控制组件
+function(){
    $(document).ready(function(e) {
        var s = $(document).scrollTop();
        var h = $(document.body).height();
        var v = -(s-1030)*1000/(h-1030);
        var w = $(document.body).width();
        var limit=(w*1282/1920)-550;
        if(s<100){
            $(".h-nav").removeClass("h-fixed s-fixed");
            setTimeout("$('.h-nav').removeClass('s-fixed')", 110)
        }else{
            $(".h-nav").addClass("h-fixed");
            setTimeout("$('.h-nav').addClass('s-fixed')", 105)
        };
        if(s>=1030&&v>=-limit){
            $(".division").css({"background-position":"0 "+v+"px"})
        }
        $(window).scroll(function(e){
            s = $(document).scrollTop();
            h = $(document.body).height();
            w = $(document.body).width();
            limit=(w*1282/1920)-550;
            v =-(s-1030)*1000/(h-1030);
            if(s<100){
                $(".h-nav").removeClass("h-fixed s-fixed");
                setTimeout("$('.h-nav').removeClass('s-fixed')", 110)
            }else{
                $(".h-nav").addClass("h-fixed");
                setTimeout("$('.h-nav').addClass('s-fixed')", 105)
            };
            console.log(s);
            console.log(limit);
            if(s>=1030&&v>=-limit){
                $(".division").css({"background-position":"0 "+v+"px"})
            }
        })
    });
}();

//家长学生就业选择组件
+function(){
    $(".option-box>ul li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        if($(".option-box>ul li").index($(this))+1==1){
            $(".option-box .choose-line").css({"left":"-77px"})
            $(".box-case .box:nth-child(1)").siblings().animate({top:"200px",opacity:0,"z-index":2}, 500,function(){$(this).css({top:"0",left:"200px"})});
            $(".box-case .box:nth-child(1)").animate({left:"0px",opacity:1,"z-index":4}, 750);
        }else if($(".option-box>ul li").index($(this))+1==2){
            $(".option-box .choose-line").css({"left":"0px"})
            $(".box-case .box:nth-child(2)").siblings().animate({top:"200px",opacity:0,"z-index":2}, 500,function(){$(this).css({top:"0",left:"200px"})});
            $(".box-case .box:nth-child(2)").animate({left:"0px",opacity:1,"z-index":4}, 750);
        }else{
            $(".option-box .choose-line").css({"left":"77px"})
            $(".box-case .box:nth-child(3)").siblings().animate({top:"200px",opacity:0,"z-index":2},500 ,function(){$(this).css({top:"0",left:"200px"})});
            $(".box-case .box:nth-child(3)").animate({left:"0px",opacity:1,"z-index":4}, 750);
        }
    })
}();
