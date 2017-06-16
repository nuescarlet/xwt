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