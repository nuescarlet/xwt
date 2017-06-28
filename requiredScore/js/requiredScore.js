/**
 * Created by ge on 2017/6/24.
 */
//全局属性
var errorCd=0;//防止重复报警
var errorContent={
    1:"该功能尚未开放",
    2:"院校对比最多只能添加4个"
}
function errorClick(errorCode){ //警告框弹出
    if(errorCd==0){
        errorCd=1;
        $(".error").html(errorContent[errorCode])
        $(".error").show().animate({"opacity":"1"},300,function(){
            setTimeout(function(){
                $(".error").animate({"opacity":"0"},300,function(){
                    $(".error").hide();
                    errorCd=0;
                })
            },2000)
        })
    }
}
//选项切换
+function(){
    $(".left-box").on("click","li",function(){
        var clt=["分数线查询","专业查询","艺考查询","全国院校库","填报志愿"];
        var rcc=$(".right-change")
        $(this).addClass("active").siblings().removeClass("active");
        $(".address a:nth-child(3) span").html(clt[$(this).data("class")])
        for(var i=0;i<rcc.length;i++){
          if($(rcc[i]).data("class")==$(this).data("class")){
              $(rcc[i]).show().siblings(".right-change").hide();
          }
        }
    })
    $(".box-option").on("click","li",function(){
        var rtc= $(".right-content")
        $(this).addClass("active").siblings().removeClass("active");
        //rtc.children(".table-content").remove();//清空查询数据
        for(var i=0;i<rtc.length;i++){
            if($(this).data("option")==$(rtc[i]).data("option")){
                $(rtc[i]).show().siblings(".right-content").hide();
            }
        }
    })
}();
//获取隐藏元素的宽高
;( function ( $ ){
    $.fn.addBack = $.fn.addBack || $.fn.andSelf;

    $.fn.extend({

        actual : function ( method, options ){
            // check if the jQuery method exist
            if( !this[ method ]){
                throw '$.actual => The jQuery method "' + method + '" you called does not exist';
            }

            var defaults = {
                absolute      : false,
                clone         : false,
                includeMargin : false,
                display       : 'block'
            };

            var configs = $.extend( defaults, options );

            var $target = this.eq( 0 );
            var fix, restore;

            if( configs.clone === true ){
                fix = function (){
                    var style = 'position: absolute !important; top: -1000 !important; ';

                    // this is useful with css3pie
                    $target = $target.
                        clone().
                        attr( 'style', style ).
                        appendTo( 'body' );
                };

                restore = function (){
                    // remove DOM element after getting the width
                    $target.remove();
                };
            }else{
                var tmp   = [];
                var style = '';
                var $hidden;

                fix = function (){
                    // get all hidden parents
                    $hidden = $target.parents().addBack().filter( ':hidden' );
                    style   += 'visibility: hidden !important; display: ' + configs.display + ' !important; ';

                    if( configs.absolute === true ) style += 'position: absolute !important; ';

                    // save the origin style props
                    // set the hidden el css to be got the actual value later
                    $hidden.each( function (){
                        // Save original style. If no style was set, attr() returns undefined
                        var $this     = $( this );
                        var thisStyle = $this.attr( 'style' );

                        tmp.push( thisStyle );
                        // Retain as much of the original style as possible, if there is one
                        $this.attr( 'style', thisStyle ? thisStyle + ';' + style : style );
                    });
                };

                restore = function (){
                    // restore origin style values
                    $hidden.each( function ( i ){
                        var $this = $( this );
                        var _tmp  = tmp[ i ];

                        if( _tmp === undefined ){
                            $this.removeAttr( 'style' );
                        }else{
                            $this.attr( 'style', _tmp );
                        }
                    });
                };
            }

            fix();
            // get the actual value with user specific methed
            // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
            // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
            var actual = /(outer)/.test( method ) ?
                $target[ method ]( configs.includeMargin ) :
                $target[ method ]();

            restore();
            // IMPORTANT, this plugin only return the value of the first element
            return actual;
        }
    });
})(jQuery);
//下拉菜单选择
+function(){
    var allMenu=$(".right-box  .input .menu");
    for(var i=0;i<allMenu.length;i++){
        $(allMenu[i]).css({"width":$(allMenu[i]).actual('width')})
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

//加入对比
+function(){
    var top=$(document).scrollTop()
    var retop=function(){  //调整加入对比框的位置
        if(top>=100){
            $(".contrast").css({"top":top-100+"px"})
        }else{
            $(".contrast").css({"top":"10px"})
        }
    }
    retop();
    $(window).scroll(function(){
        top=$(document).scrollTop()
        retop();
    })
    //加入对比
    $("#university").on("click",".table-content li:last-child",function(){
        var noRepeat=true;
        var contrast=$(".contrast-content").children("li");
        for(var i=0;i<contrast.length;i++){
            if($(this).parent().data('universityid')==$(contrast[i]).data('universityid')){
                noRepeat=false;
            }
        }
        if($(".contrast-content").children("li").length>3){
            errorClick(2);
        }
        if($(".contrast-content").children("li").length<=3&&noRepeat){
            $(".contrast").show().animate({"opacity":"1"},300);
            $(".contrast-content").append("<li data-universityId='"+$(this).parent().data('universityid')+"'><span>"+$(this).parent().children("li:first-child").html()+"</span><i></i></li>")
        }
    })

    //删除按钮
    $(".contrast").on("click",".contrast-content i",function(){
        $(this).parent().remove();
        if($(".contrast-content").children("li").length==0){
            $(".contrast").animate({"opacity":"0"},300,function(){
                $(".contrast").hide();
            })
        }
    })
    //清空按钮
    $(".contrast").on("click",".btn-box li:last-child",function(){
        $(".contrast-content").children("li").remove();
        $(".contrast").animate({"opacity":"0"},300,function(){
            $(".contrast").hide();
        })
    })
}();

//查询
+function(){
    $(".btn").click(function(){
        errorClick(1);
    })
}();