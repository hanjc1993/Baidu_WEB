$(function () {
    var $keduDiv=$("#biaopan #kedu")
    for(var i=1;i<61;i++){
        if(i%5==0){
            if(i%3==0){//画最大的
                $keduDiv.append("<div id='kd"+i+"' class='daKD'></div>")
                $keduDiv.find("div:last-child").css("transform","translateX(-3px) rotate("+6*i+"deg)")
            }else {//画整点
                $keduDiv.append("<div id='kd"+i+"' class='xiaoKD'></div>")
                $keduDiv.find("div:last-child").css("transform","translateX(-8px) rotate("+6*i+"deg)")
            }
        }else{//画最小的
            $keduDiv.append("<div id='kd"+i+"' class='mixKD'></div>")
            $keduDiv.find("div:last-child").css("transform","translateX(-2px) rotate("+6*i+"deg)")
        }
    }
    //时针旋转时候，shadow值也跟着变化
    var deg;
    function newClock() {
        var date=new Date();
        var seconds=date.getHours()*3600+date.getMinutes()*60+date.getSeconds();
        deg=seconds*6+2.4;//加2.4纯粹为了校正，必须是0.6的倍数
    }
    newClock();
    //指针移动函数 + 阴影旋转函数
    var zhuandong,shuaxin,x=0,KDdeg=0;
    function flash() {
        zhuandong=setInterval(function () {
            $("#miaozhen").css({transform:"rotate("+deg+"deg)"})
            $("#fenzhen").css({transform:"rotate("+deg/60+"deg)"})
            $("#shizhen").css({transform:"rotate("+deg/720+"deg)"})

            //数字刻度 + 小刻度阴影
            if (KDdeg<90&&KDdeg>=0) {//必须重复计算两次，因为text-shadow只能接受3个px参数，box是4个
                $("#bigKD div").css("text-shadow",x+"px "+(6-x)+"px 3px gray")
                $("#kedu div").css("box-shadow",x+"px "+(6-x)+"px 3px 1px gray")
                x+=0.04;
            }else if(KDdeg<180&&KDdeg>=90){
                $("#bigKD div").css("text-shadow",x+"px "+(x-6)+"px 3px gray")
                $("#kedu div").css("box-shadow",x+"px "+(x-6)+"px 3px 1px gray")
                x-=0.04;
            }else if(KDdeg<270&&KDdeg>=180){
                $("#bigKD div").css("text-shadow",x+"px "+(0-x-6)+"px 3px gray")
                $("#kedu div").css("box-shadow",x+"px "+(0-x-6)+"px 3px 1px gray")
                x-=0.04;
            }else if(KDdeg<360&&KDdeg>=270){
                $("#bigKD div").css("text-shadow",x+"px "+(6+x)+"px 3px gray");
                $("#kedu div").css("box-shadow",x+"px "+(6+x)+"px 3px 1px gray")
                x+=0.04;
            }
            KDdeg+=0.6;
            if(KDdeg>=359.6&&KDdeg<=360.4){KDdeg=0}//正常是==360重置的，但此处数字失去精度，所以给个范围
            //刻度阴影函数到此为止，不喜欢可以注释掉，省cpu资源
            //内表盘旋转,里面的参数完全是试验出来的。。看起来和刻度旋转基本同步
            $("#neibiaopan").css("background","linear-gradient("+(-deg+60)+"deg,#bbb,#eaeadf)")
            //内表盘旋转完毕

            deg+=0.6;//秒针 每0.1秒变化0.6度
        },10)
        shuaxin=setInterval(newClock,300000)
    }
    flash();
    //暂停及恢复
    var pause=true;
    $("#button #Pause").click(function () {
        if(pause){
            clearInterval(zhuandong);clearInterval(shuaxin);
            var date=new Date();
            var year=date.getUTCFullYear();
            var month=date.getUTCMonth()+1;
            var day=date.getUTCDate();
            var hour=date.getHours();
            var minute=date.getMinutes();
            var second=date.getSeconds();
            var milliSecond=date.getMilliseconds();
            $("#button #time").val(year+"年"+month+"月"+day+"日"+hour+"时"+minute+"分"+second+","+milliSecond).show()
        }
        pause=false;
    })
    $("#button #Restart").click(function () {
        newClock();
        flash();
        $("#button #time").hide()
        pause=true;
    })
    $("#button #time").keypress(false)

})
