//伪造的题目，数组形式传递
var type= location.search.replace(/[?&]type=([^&#]*)/gi,function(a,b){
    return b;
});
var subject=[
    "1.我不想成为一个喜欢批评的人，但很难做到",
    "2.别人不能完成他的分内事，会令我失望和愤怒",
    "3.我的面部表情严肃而生硬",
    "4.我常对自己挑剔，期望不断改善自己的缺点，以成为一个完美的人",
    "5.我讲理，重实用",
    "6.我不想成为一个喜欢批评的人，但很难做到",
    "7.别人不能完成他的分内事，会令我失望和愤怒",
    "8.我的面部表情严肃而生硬",
    "9.我常对自己挑剔，期望不断改善自己的缺点，以成为一个完美的人",
    "10.我讲理，重实用",
    "11.我不想成为一个喜欢批评的人，但很难做到",
    "12.别人不能完成他的分内事，会令我失望和愤怒",
    "13.我的面部表情严肃而生硬",
    "14.我常对自己挑剔，期望不断改善自己的缺点，以成为一个完美的人",
    "15.我讲理，重实用",
    "16.我讲理，重实用"
]
//初始化 localStorage.getItem("type")
console.log(localStorage.getItem(type))
var session=JSON.parse(localStorage.getItem(type))
if(session==null||session=={}){
    session={
        Answer:0,
        nowPage:1,
        save:[]
    }
}
var Total=subject.length;//总试题数
var Answer=session.Answer;//已答题数
var totalPage=parseInt(Total/5)+1//上限page
var nowPage=session.nowPage;//当前页数
$(".count li:nth-child(1) span").html(Total)//匹配总试题数
$(".count li:nth-child(2) span").html(Answer)//匹配已答题数
$(".count li:nth-child(3) span").html(Total-Answer)//匹配未答题数
$(".flip li:nth-child(2) span:nth-child(2)").html(totalPage);//匹配总页数
function turnPage(){//翻页组件
    $(".test-content").html("");
    if(nowPage==totalPage){//到达最后一页时自动变为提交
        $(".flip li:nth-child(3)").html("提交")
    }else{
        $(".flip li:nth-child(3)").html("下一页")
    }
    for(var i=(nowPage-1)*5;i<(nowPage-1)*5+5;i++){
        if(i<Total){
            $(".test-content").append(`
                <li class="clear" data-number="${i+1}">
                <p>${subject[i]}</p>
                <div>是</div>
                <div>否</div>
                </li>
                    `)
            if(session.save[i+1]==1){
                $(".test-content li:last-child div:nth-child(2)").addClass("active")
            }else if(session.save[i+1]==0){
                $(".test-content li:last-child div:nth-child(3)").addClass("active");
            }
        }
    }
    session.nowPage=nowPage;
    var sessionStr = JSON.stringify(session);
    localStorage.setItem(type, sessionStr);
}
//试题记录加载
+function(){
    $(".flip li:nth-child(2) span:nth-child(1)").html(nowPage);
    turnPage();
}();

//背景切换
+function(){
    setInterval(function(){
        bgTime++;
        var bgPage=bgTime%3+1
        $(".bg li:nth-child("+bgPage+")").addClass("active").siblings().removeClass("active")
    },20000)
}();

//选择题点击
+function(){
    $(".test-content").on("click","li>div",function(){
        if($(this).parent().children(".active").length==0){//判断已答题 增加已答题数
            Answer++;
            $(".count li:nth-child(2) span").html(Answer)
            $(".count li:nth-child(3) span").html(Total-Answer)
            session.Answer=Answer;//存档已答题数
            var sessionStr = JSON.stringify(session);
            localStorage.setItem(type, sessionStr);
        }
        $(this).addClass("active").siblings().removeClass("active");
        var YNjudge=$(this).html()=="是"?1:0;
        session.save[$(this).parent().data("number")]=YNjudge;//存档答题状态 第i题则存在save[i]位置
        var sessionStr = JSON.stringify(session);
        localStorage.setItem(type, sessionStr);
    })
}();

//提交
var errorCd=0;//防止警告框重复弹出
function errorClick(errorContent){ //警告框弹出
    if(errorCd==0){
        errorCd=1;
        $(".error").html(errorContent)
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
+function(){
    $(".flip").on("click","li:nth-child(3)",function(){
        if($(this).html()=="提交"&&Answer!=Total){
            errorClick("请在答完所有的题目后再提交^_^");
        }else if($(this).html()=="提交"&&Answer==Total){
            errorClick("提交完成");
        }
    })
}();

//翻页
+function(){
    $(".flip").on("click","li:nth-child(1)",function(){
        if(nowPage>1){
            nowPage--;
            turnPage();
            $(".flip li:nth-child(2) span:nth-child(1)").html(nowPage)
        }
    })
    $(".flip").on("click","li:nth-child(3)",function(){
        if(nowPage<totalPage){
            nowPage++;
            turnPage();
            $(".flip li:nth-child(2) span:nth-child(1)").html(nowPage)
        }
    })
}();

