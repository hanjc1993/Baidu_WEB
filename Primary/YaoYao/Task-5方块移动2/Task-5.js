$(function () {
//绘制棋盘
    $("table tr").find("td:last-child").addClass("outside2")
    $("table tr").find("td:first-child").addClass("outside")
    $("table tr:last-child").addClass("outside2")
//直接转向 及动画 函数
var direction=0;
    function direct(x) {//方向 记录及动画 函数。
        if(x==1||x==-1) {
            for (var i = 1; i < 31; i++) {
                setTimeout(function (y, z) {
                    $("#float").css("transform", "rotate(" + (y + 3 * z * x) + "deg)")
                }, 5 * i, direction, i)
            }
            if (x == 1) {
                direction += 90;
                if (direction == 360) {
                    direction = 0
                }//console.log("最新的direction是"+direction)
            } else{
                direction -= 90;
                if (direction == -90) {
                    direction = 270
                }//console.log("最新的direction是"+direction)
            }
        }else {console.log("方向记录函数 输入错误")}
    }
//直接移动 及动画 函数
var left=240,top=240;
var oldTime=new Date(),time;
    function move(x) {
        var $float=$("#float");
        top=Number($float.css("top").substring(0,$float.css("top").length-2));
        left=Number($float.css("left").substring(0,$float.css("left").length-2));//console.log("最新的left值是"+left)        console.log("最新的top值是"+top)
        if(x==0){//向上
            if(top==40){return false}
            else{$float.animate({"top":(top-40)+"px"},"fast",function () {
                top-=40;
            })}
        }
        else if(x==90) {//向右
            if (left == 400) {return false}
            else {$float.animate({"left": (left + 40) + "px"}, "fast",function () {
                left+=40;
            })}//;console.log((left + 40) + "px")
        }
        else if(x==180) {//向下
            if(top==400){return false}
            else {$float.animate({"top": (top + 40) + "px"}, "fast",function () {
                top+=40;
            })}//;console.log((top+40)+"px")
        }
        else if(x==270) {//向左
            if(left==40){return false}
            else{$float.animate({"left": (left - 40) + "px"}, "fast",function () {
                left-=40;
            })}
        }//console.log((left - 40) + "px")
        else {console.log("move参数错误")}
    }
//转向并移动 及动画 函数
    function turnMove(x) {
        var a,b,c;
        if(x=="left"){a=180;b=0;c=90}
        else if(x=="top"){a=270;b=90;c=180}
        else if(x=="right"){a=0;b=180;c=270}
        else if(x=="bottom"){a=90;b=270;c=0}
        if (direction == a) {
            direct(1);
        } else if (direction == b) {
            direct(-1);
        } else if (direction == c) {
            direct(1);
            setTimeout(function () {
                direct(1)
            },160)
        }
        setTimeout(function () {
            move(direction)//因为direction在animate回调后修改了，所以这个参数应使用最新版本，无需传入
        },320)
    }
//执行指令
    $("#orderIn").keyup(function (e) {
        if(e.keyCode==13){$("#orderSub").click()}
    })
    $("#orderSub").click(function () {
        var order=Number($("#orderIn").val());
        //此处需要调用验证位置不超出函数
        time=new Date();
        if(time-oldTime>200){
            switch (order){
            case 1:{
                move(direction);                 break;
            }
            case 2:{//逆时针旋转90度
                direct(-1);                 break;
            }
            case 3:{//顺时针旋转90度
                direct(1);                break;
            }
            case 4:{//旋转180度
                direct(1);direct(1);                break;
            }
            case 5:{//强制向左
                move(270);           break;
            }
            case 6:{//强制向上
                move(0);                break;
            }
            case 7:{//强制向右
                move(90);                break;
            }
            case 8:{//强制向下
                move(180);                break;
            }
            case 9:{//转向左侧并移动一步
                turnMove("left");                break;
            }
            case 10:{//转向上侧并移动一步
                turnMove("top");                break;
            }
            case 11:{//转向右侧并移动一步
                turnMove("right");                break;
            }
            case 12:{//转向下侧并移动一步
                turnMove("bottom");                break;
            }default:{alert("请按格式输入指令，如 1 或 2")}
            }
        }oldTime=time;//else{console.log("请勿频繁点击")};
    })
//响应坐标指令
    $("#positionIn").keyup(function (e) {
        if (e.keyCode==13){$("#positionSub").click()}
    })
    $("#positionSub").click(function () {
        var positionGet=$("#positionIn").val();
        if(positionGet.indexOf("，")!=-1){alert('请输入英文(半角)逗号');return false}
        var position=positionGet.split(",");
        var a=position[0],b=position[1];
        if(!b){alert("不输入y，则按0处理")}
        if(a<1||a>10||b<1||b>10){alert("请按正确格式输入，x为1-10的横坐标，y为1-10的纵坐标");return false}
        var time1=0;
        function positionMove(x,i) {
            if (i==0){
                setTimeout(function () {
                    turnMove(x);
                },time1)
                time1+=500;
            }else {
                setTimeout(function () {
                    turnMove(x);
                },time1)
                time1+=220;
            }
        }
        setTimeout(function (x,y) {//为了防止点击过快使动画乱套
            if(left==x&&top==y){
                var w=0;//如果xy都不需要动，则w=2
                var c=a*40-left;//横坐标的差值
                if(c>0){//横坐标位移
                    for(var i=0;i<(c/40);i++){
                        positionMove("right",i);
                    }
                }else if(c<0){
                    for(var i=0;i<(-c/40);i++){
                        positionMove("left",i);
                    }
                }else{w++}
                var d=b*40-top;//纵坐标的差值
                time1+=400;
                if(d>0){
                    for(var i=0;i<d/40;i++){
                        positionMove("bottom",i);
                    }
                }else if(d<0){
                    for(var i=0;i<(-d/40);i++){
                        positionMove("top",i);
                    }
                }else{w++}
                if(w==2){alert("不需要移动")}
            }else{alert("请在动画完成后再点击")}
        },620,left,top)
    })
})