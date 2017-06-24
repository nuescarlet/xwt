/**
 * Created by ge on 2017/6/22.
 */
//初始化
var session=localStorage.getItem("20170614091744");//获取存档内容
var setSession;
+function(){
    $(".paper").data("allObject",$(".paper .object").length);
    $(".paper").data("ansObject",$(".answer-content .active").length);
    $(".answer-btn span").html( $(".paper").data("allObject")- $(".paper").data("ansObject"));
    $(".paper .content").css({"padding-bottom":$(".answer").css("height")});
    $(".time div:nth-child(1) p:nth-child(2) span").html($(".paper").data("allObject"));
    $(".time div:nth-child(1) p:nth-child(3) span").html( $(".paper").data("allObject")- $(".paper").data("ansObject"));
    $(window).resize(function(){
        $(".modal").css({"height":$(window).height()+"px"})
    });
}();
//载入session
+function(){
    console.log(session);
    console.log(session!=null)
    if(session!=null&&session!=[]){
        console.log("载入存档");
        setSession=session.split(",")//将存档内容转化为数组
        var allObj=$(".object");
        var allAns=$(".answer").children().children("li");
        for(var i=0;i<allObj.length;i++){//选项存档读取
            $(allObj[i]).data("option",setSession[i+1])//将内置选项数据变为为存档中读取的选项
            for(var j= 0;j<4;j++){//读取为灰色选项
                if($($(allObj[i]).children(".option")[j]).data("option")==setSession[i+1]){
                    $($(allObj[i]).children(".option")[j]).addClass("active")
                }
            }
            for(var k= 0;k<4;k++){//读取为红色选择
                if($($(allObj[i]).children().children(".btn-option li")[k]).data("option")==setSession[i+1]){
                    $($(allObj[i]).children().children(".btn-option li")[k]).addClass("active")
                    for(var l=0;l<allAns.length;l++){
                        if($(allAns[l]).data("object")==$(allObj[i]).data("object")&&$(allObj[i]).data("type")==0){
                            $(allAns[l]).addClass("active")//同步答题卡
                            $(".paper").data("ansObject",$(".answer-content .active").length);//确定回答的题目数
                            $(".answer-btn span").html( $(".paper").data("allObject")- $(".paper").data("ansObject"))
                            $(".time div:nth-child(1) p:nth-child(3) span").html( $(".paper").data("allObject")- $(".paper").data("ansObject"))
                        }
                    }
                }
            }
        }

        console.log("载入存档成功")
    }else{
        console.log("未发现存档")
        setSession=[];
    }
}();
//选择题选项组件
+function(){
    $(".answer-btn span").html( $(".paper").data("allObject")- $(".paper").data("ansObject"));
    $(".paper .content").on("click",".object .btn-option li",function(){
        var option=$(this).data("option");
        var opp=$(this).parent().parent();
        var ans=$(".answer-content li");
        $(this).addClass("active").siblings().removeClass("active");
        opp.data("option",option);
        for(var i= 0;i<4;i++){
            if($(opp.children(".option")[i]).data("option")==$(this).data("option")){
                $(opp.children(".option")[i]).addClass("active")
            }else{
                $(opp.children(".option")[i]).removeClass("active")
            }
        }
        for(var j=0;j<ans.length;j++){
            if($(ans[j]).data("object")==opp.data("object")){
                $(ans[j]).addClass("active");//激活答题卡对应数字
                $(".paper").data("ansObject",$(".answer-content .active").length);//确定回答的题目数
                $(".answer-btn span").html( $(".paper").data("allObject")- $(".paper").data("ansObject"))
                $(".time div:nth-child(1) p:nth-child(3) span").html( $(".paper").data("allObject")- $(".paper").data("ansObject"))
            }
        }
        setSession[opp.data("object")]=opp.data("option");
        localStorage.setItem("20170614091744", setSession);
        console.log(localStorage.getItem("20170614091744"))
        console.log("你选中的是第"+opp.data("question")+"大题的总第"+opp.data("object")+"题的"+opp.data("option")+"选项");
        console.log("已答"+$(".paper").data("ansObject")+"题")
    })
}();
//解答题
+function(){
    $(".paper .content").on("keyup",".object textarea",function(){
        var opp=$(this).parent();
        var ans=$(".answer-content li");
        for(var j=0;j<ans.length;j++){
            if($(ans[j]).data("object")==opp.data("object")){
                $(ans[j]).addClass("active");//激活答题卡对应数字
                $(".paper").data("ansObject",$(".answer-content .active").length);//确定回答的题目数
                $(".answer-btn span").html( $(".paper").data("allObject")- $(".paper").data("ansObject"))
                $(".time div:nth-child(1) p:nth-child(3) span").html( $(".paper").data("allObject")- $(".paper").data("ansObject"))
            }
        }
    })
}();
//答题卡组件
+function(){
    var hidden=1;
    var click=1;
    var scroll=1;
    var anh=parseInt($(".answer .answer-content").css("height"))*-1+26;
    $(".answer").css({"bottom":anh+"px"});
    $(".answer-btn").click(function(){
        if(hidden==1&&click==1){
            hidden=0;
            click=0;
            $(".answer").animate({"bottom":"0px"},300,function(){
                click=1;
                $(".answer-btn i").addClass("down");
            })
        }else if(click==1){
            hidden=1;
            click=0;
            $(".answer").animate({"bottom":anh+"px"},300,function(){
                click=1;
                $(".answer-btn i").removeClass("down");
            })
        }
    })
    $(".answer").on("click","li",function(){
        if( scroll==1){
            scroll=0;
            var obj=$(this).data("object");
            for(var i=0;i<$(".object").length;i++){
                if($($(".object")[i]).data("object")==obj){
                    $('html,body').animate({scrollTop: $($(".object")[i]).offset().top+"px"},500,function(){scroll=1;});
                }
            }
        }
    })

}();

//计时器组件
+function(){
    var top=$(document).scrollTop()
    var time=0;
    var h=0;
    var m=0;
    var s=0;
    var addTime=function(){
        time++;
        h=parseInt(time/3600);
        m=parseInt((time%3600)/60);
        s=parseInt((time%3600)%60);
        var hPrev=h<10?"0":"";
        var mPrev=m<10?":0":":";
        var sPrev=s<10?":0":":";
        $(".time div:nth-child(1) p:nth-child(1)").html(hPrev+h+mPrev+m+sPrev+s);
        localStorage.setItem("20170614091744time", time);
    }
    var timeRun=setInterval(addTime,1000);
    var retop=function(){
        if(top>=140){
            $(".paper .time").css({"top":top-121+"px"})
        }else{
            $(".paper .time").css({"top":"20px"})
        }
    }
    if(localStorage.getItem("20170614091744time")!=null&&localStorage.getItem("20170614091744time")!=[]){//载入时间存档
        time=session=localStorage.getItem("20170614091744time")
        addTime();
    }
    retop();
    $(window).scroll(function(){
        top=$(document).scrollTop()
        retop();
    })

    $(".time div:nth-child(4)").click(function(){
        $('html,body').animate({scrollTop:"0px"},500)
    })

    //暂停
    $(".time div:nth-child(2)").click(function(){
        $(".modal").css({"display":"block","height":$(window).height()+"px"})
        $(".modal .suspend").css({"display":"block"})
        clearInterval(timeRun);
    })

    //继续
    $(".suspend .btn").click(function(){
        $(".modal").css({"display":"none"})
        $(".modal .suspend").css({"display":"none"})
        timeRun=setInterval(addTime,1000);
    })

    //交卷确认
    $(".time div:nth-child(3)").click(function(){
        $(".modal").css({"display":"block","height":$(window).height()+"px"})
        $(".modal .submit").css({"display":"block"})
        clearInterval(timeRun);
    })

    //继续
    $(".submit .btn:nth-child(3)").click(function(){
        $(".modal").css({"display":"none"});
        $(".modal .submit").css({"display":"none"});
        timeRun=setInterval(addTime,1000);
    })
}();

//交卷组件
+function(){
    var testAns=["A","B","C","D","A","B","C","D","A","B","<h5>要点一：借向往隐居生活，表达对韦曲春景的喜爱。（或：因韦曲春色美景而生隐居山林之情）</h5><h5>要点二：隐含求仕未果的复杂心情。 </h5>"];
    var finish=0;
    //交卷
    $(".submit .btn:nth-child(2)").click(function(){
        if(finish==0){//交卷过 该按钮无效
            localStorage.setItem("20170614091744", []);
            localStorage.setItem("20170614091744time", []);
            $(".modal").css({"display":"none"});
            $(".modal .submit").css({"display":"none"});
            finish=1;
            var allObj=$(".object");
            for(i=0;i<allObj.length;i++){
                if($(allObj[i]).data("type")==0){//0选择题 1问答题  出现答案
                    var allOpt=$(allObj[i]).children(".option");
                    var ansImg=$(allObj[i]).data("option")==testAns[i]?"correct":"error";
                    for(j=0;j<4;j++){
                        if($(allOpt[j]).data("option")==testAns[i]){
                            $(allOpt[j]).addClass(ansImg)
                        }
                    }
                    $(allObj[i]).children(".btn-option").css({"display":"none"});
                    $(allObj[i]).append('<ul class="correct-ans clear"><li class="'+ansImg+'"></li><li>正确答案:<span>'+testAns[i]+'</span></li><li>您的答案:<span>'+$(allObj[i]).data("option")+'</span></li></ul>');
                }else{
                    $(allObj[i]).children(".ans-position").append('<p class="ans-title">参考答案：</p>'+testAns[i])
                }
            }
        }else{
            $(".modal").css({"display":"none"});
            $(".modal .submit").css({"display":"none"});
        }
    })
}();
