//视频选项跳转
var jump=function(id){
    window.location.href="Video.html?id="+id;
};
//视频组件补正
+function(){
    $("video").on("pause",function(){
        $(".vjs-big-play-button").css({"display":"block"})
    });
    $("video").on("play",function(){
        $(".vjs-big-play-button").css({"display":"none"})
    });
}();

//滚动条左边小箭头
+function(){
    var move=0;
    var fullscreen=0;
    $(".btn-slide").click(function(){
        if(move==0){
            move=1
            $(".list").animate({width:"0px"}, 300);
            $(".vadio").animate({width:"1188px"}, 300);
            $("#video_1").animate({width:"1188px"}, 300);
            $("#video_1 video").animate({width:"930px","margin-left":"129px"}, 300);
            $(this).addClass("left");
        }else{
            move=0
            $(".vadio").animate({width:"930px"}, 300);
            $("#video_1").animate({width:"930px"}, 300);
            $("#video_1 video").animate({width:"930px","margin-left":"0px"}, 300);
            $(".list").animate({width:"258px"}, 300);
            $(this).removeClass("left");
        }
    })

    $(".vjs-fullscreen-control").on("click",function(){
        if(fullscreen==0){
            fullscreen=1;
            $("#video_1 video").css({width:"100%","margin-left":"0px"});
        }else{
            fullscreen=0;
            if(move==1){
                $(".list").css({width:"0px"});
                $(".vadio").css({width:"1188px"});
                $("#video_1").css({width:"1188px"});
                $("#video_1 video").css({width:"930px","margin-left":"129px"});
                $(this).addClass("left");
            }else{
                $(".list").css({width:"258px"});
                $(".vadio").css({width:"930px"});
                $("#video_1").css({width:"930px"});
                $("#video_1 video").css({width:"930px","margin-left":"0px"});
                $(this).removeClass("left");
            }
        }
    });
}();

//滚动条组件
+function(){
    (function($, window, document,undefined) {

        $.fn.xb_scroll = function(options)
        {
            var scroll_config={
                "speed":25,
                "isMaxHeight":false,
                "barOffTop":2,
                "barOffBottom":2,
                "barOffRight":2,
                "boxWidth":7,
                "barWidth":7,
                "childPanel":"._panel-box",
                "boxClass":"_scroll_box",
                "barClass":"_scroll_bar"
            }

            var opts = $.extend({},scroll_config,options)
            var w = {};
            w.FlagName = "_Prefix";
            var elem = $(this) , id = $(this).attr("id") , elChild;

            elem.css({"position":"relative","overflow":"hidden"});
            elChild = elem.find(opts.childPanel);
            elChild.css({"position":"absolute","width":"100%","top":"0"});

            if(opts.isMaxHeight)
            {
                var sham = $("<div style='position:relative;background:transparent;z-index:-1;height:"+elChild.outerHeight()+"px'></div>");
                sham.appendTo(elem);
            }

            var jqScrollBox = $("<div style='position:absolute;width:"+opts.boxWidth+"px;top:"+opts.barOffTop+"px;right:"+opts.barOffRight+"px;bottom:"+opts.barOffBottom+"px;border-radius: 5px;background: rgba(255,255,255,0);'></div>");
            jqScrollBox.addClass(opts.boxClass);
            var jqScrollBar= $("<div style='position:absolute;width:"+opts.barWidth+"px;top:"+opts.barOffTop+"px;right:"+opts.barOffRight+"px;border-radius: 5px;background: rgba(100,100,100,.5);'></div>");
            jqScrollBar.addClass(opts.barClass);
            jqScrollBox.appendTo(elem);
            jqScrollBar.appendTo(elem);

            var iRate = elem.innerHeight()/elChild.outerHeight();
            var iScrollBoxHeight = jqScrollBox.innerHeight() ;
            var iScrollBarHeight = Math.round(iRate*iScrollBoxHeight);
            if(iRate >= 1){
                jqScrollBox.hide();
                jqScrollBar.css("height",0);
            }
            else
            {
                jqScrollBar.css("height",iScrollBarHeight);
            }
            var iMinTop = elem.innerHeight() - elChild.outerHeight();
            var sMaxTop = iScrollBoxHeight - iScrollBarHeight + opts.barOffTop;

            var sMouseWheel = "mousewheel";
            if(!("onmousewheel" in document)){						/*浏览器鼠标滚动事件的简单兼容*/
                sMouseWheel = "DOMMouseScroll";
            }
            elem.on(sMouseWheel,function(ev){
                ev.preventDefault();
                ev = ev.originalEvent;
                if(iRate >= 1)
                    return;
                if(ev.wheelDelta){
                    iWheelDelta = ev.wheelDelta/120;
                }else{
                    iWheelDelta = -ev.detail/3;
                }
                if(iMinTop>0){
                    elChild.css("top",0);
                    return;
                }
                var iTop = parseInt(elChild.css("top"));
                var iTop = iTop + opts.speed*iWheelDelta;
                iTop = iTop > 0 ? 0 : iTop;
                iTop = iTop < iMinTop ? iMinTop : iTop;
                elChild.css("top",iTop);
                fnScrollContent(elem,elChild,jqScrollBox,jqScrollBar,opts.barOffTop);
            });

            var isS_B = false ,  doc_py , barTop , conTop;			/*滚动条拖拽*/
            jqScrollBar.on("mousedown",function(ev){
                isS_B = true;
                elem.css({"-moz-user-select": "none","-khtml-user-select": "none","user-select": "none"});
                jqScrollBar.css({"background":"rgba(100,100,100 .75)"});
                barTop = parseInt(jqScrollBar.css("top"));
                conTop = parseInt(elChild.css("top"));
            });
            $(document).on("mousedown",function(ev){
                if(isS_B)
                    doc_py = ev.pageY;
            });
            $(document).on("mousemove",function(ev){
                if(isS_B)
                {
                    var rate = ev.pageY - doc_py;

                    var sTop = barTop + rate;
                    sTop = sTop < opts.barOffTop ? opts.barOffTop : sTop;
                    sTop = sTop > sMaxTop ? sMaxTop : sTop;
                    jqScrollBar.css("top",sTop);

                    var jqCon_rate = elChild.outerHeight() * (rate/iScrollBoxHeight) * -1;
                    var iTop = conTop + jqCon_rate;
                    iTop = iTop > 0 ? 0 : iTop;
                    iTop = iTop < iMinTop ? iMinTop : iTop;
                    elChild.css("top",iTop);
                }
            });
            $(document).on("mouseup",function(ev){
                elem.css({"-moz-user-select": "","-khtml-user-select": "","user-select": ""});
                jqScrollBar.css({"background":"rgba(100,100,100 .5)"});
                isS_B = false;
            });


            elChild.bind('DOMNodeInserted', function(e) {			/*容器内元素添加*/
                fnContentResize();
            });
            elChild.bind('DOMNodeRemoved', function(e) {		    /*容器内元素移除*/
                setTimeout(function(){fnContentResize();},100);
            });
            function fnContentResize()								/*容器内元素变动更新滚动*/
            {
                if(opts.isMaxHeight)
                {
                    sham.css({"height":elChild.outerHeight()+"px"});
                }
                iRate = elem.innerHeight()/elChild.outerHeight();
                if(iRate >= 1){
                    jqScrollBox.hide();
                    jqScrollBar.css("height",0);
                    elChild.css("top",0);
                    return;
                }
                jqScrollBox.show();
                iScrollBoxHeight = jqScrollBox.outerHeight();
                iScrollBarHeight = Math.round(iRate*iScrollBoxHeight);
                jqScrollBar.css("height",iScrollBarHeight);
                iMinTop = elem.innerHeight() - elChild.outerHeight();
                sMaxTop = iScrollBoxHeight - iScrollBarHeight ;
                var nowConTop = parseInt(elChild.css("top"));
                fnScrollContent(elem,elChild,jqScrollBox,jqScrollBar,0,0);
                if(nowConTop<iMinTop)
                {
                    elChild.css("top",iMinTop);
                    jqScrollBar.css("top",sMaxTop);
                }
            }

            function fnScrollContent(jqWrapper,jqContent,jqFollowWrapper,jqFlollowContent,iOffset){
                var rate = parseInt(jqContent.css("top"))/(jqContent.outerHeight()-jqWrapper.innerHeight())//卷起的比率
                var iTop = (jqFlollowContent.outerHeight()-jqFollowWrapper.innerHeight())*rate + iOffset;
                jqFlollowContent.css("top",iTop);

            }

            elem.data(w.FlagName,true);
        }

    })(jQuery, window, document);

}();

//评论框自适应组件
;(function ($) {
    $(function () {
        $('#textarea-l').flexText();
    });
    // Constructor
    function FT(elem) {
        this.$textarea = $(elem);

        this._init();
    }

    FT.prototype = {
        _init: function () {
            var _this = this;

            // Insert wrapper elem & pre/span for textarea mirroring
            this.$textarea.wrap('<div class="flex-text-wrap" />').before('<pre><span /><br /><br /></pre>');

            this.$span = this.$textarea.prev().find('span');

            // Add input event listeners
            // * input for modern browsers
            // * propertychange for IE 7 & 8
            // * keyup for IE >= 9: catches keyboard-triggered undos/cuts/deletes
            // * change for IE >= 9: catches mouse-triggered undos/cuts/deletions (when textarea loses focus)
            this.$textarea.on('input propertychange keyup change', function () {
                _this._mirror();
            });

            // jQuery val() strips carriage return chars by default (see http://api.jquery.com/val/)
            // This causes issues in IE7, but a valHook can be used to preserve these chars
            $.valHooks.textarea = {
                get: function (elem) {
                    return elem.value.replace(/\r?\n/g, "\r\n");
                }
            };

            // Mirror contents once on init
            this._mirror();
        }

        // Mirror pre/span & textarea contents
        ,_mirror: function () {
            this.$span.text(this.$textarea.val());
        }
    };

    // jQuery plugin wrapper
    $.fn.flexText = function () {
        return this.each(function () {
            // Check if already instantiated on this elem
            if (!$.data(this, 'flexText')) {
                // Instantiate & store elem + string
                $.data(this, 'flexText', new FT(this));
            }
        });
    };

})(jQuery);

//评论组件
+function(){
    $(".evaluate-option i").click(function(){
        $(this).parent().addClass("active").siblings().removeClass("active");
    })
    $(".evaluate i").click(function(){
        $(this).parent().addClass("active").siblings().removeClass("active");
    })

    $(".btn-reply").on("click",function(){
        if($(this).children("span").html()>0&&$(this).data("click")==1){
            $(this).data("click",0);
            $(this).parent().append('<div class="reply-content clear"><i></i><textarea name="reply-text" id="" cols="30" rows="2"></textarea><p>字数限300字符以内</p><div class="btn-re-reply">回复</div><div class="re-reply"><b class="portrait"><img src="../user/portrait/1-min.jpg" alt=""/></b><p class="name">光辉<span>2017-5-16</span></p><p class="text">这个课程很棒，我学习到了很多知识</p><div class="btn-reply"><i></i>回复</div></div><div class="re-reply"><b class="portrait"><img src="../user/portrait/3-min.jpg" alt=""/></b><p class="name">夕立<span>2017-5-16</span></p><p class="text">楼上说得很对</p><div class="btn-reply"><i></i>回复</div></div></div>')
        }

    })
}();
