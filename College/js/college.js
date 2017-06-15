//页头固定
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
        })
    });
}();

//按钮选择
+function(){
    $(".option li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    })
    $(".filp  li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    })
}();