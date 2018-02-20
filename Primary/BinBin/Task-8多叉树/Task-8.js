var $select=null;//当前被选中的元素id

$(function () {
//基本功能
//输入框样式切换
    $("#button :text").focus(function () {
        $(this).select().removeClass("gray")
    }).blur(function () {
        $(this).addClass("gray")
    })
//div点击反馈
    $("#root").click(function () {
        divclick(this)
    }).on("click","div",function (e) {
        e.stopPropagation();
        if ($("#root .blue").length!=0){return false}//如果正在执行动画则不响应点击事件
        divclick(this)
    })
    function divclick(x) {//仅能有一个元素有selected样式
        var selected=$(x).hasClass("selected");
        $("div.selected").removeClass("selected");
        if(!selected){
            $(x).addClass("selected");
            $select=$(x);//记录有selected样式的元素
        }else{$select=null;}
        console.log($select)
    }


//插入及删除
//插入按钮被点击
    $("#insert").click(function () {
        if($select){//如果有元素被选中
            var insertText=$("#insertText").val();
            $select.append("<div>"+insertText+"</div>")
        }else alert("没有元素被选中")
        $("#insertText").select();
    })
//删除按钮被点击
    $("#divDel").click(function () {
        if($select){//如果有元素被选中
            $select.remove();
        }else alert("没有元素被选中")
    })


//动画                遍历及搜索的动画
//遍历过程显示动画 函数
var time=0,clear=-50,newClear=0,xClear;
    function flash(x,y) {
//搜索功能嵌套在了显示动画函数中
        if(y==1) {//如果传入了第二个参数，且恰好为1，则标记搜索到的元素，并通过动画显示
            var $a = x.clone();//复制出来，防止操作网页
            $a.children().remove();//去掉所有孩子节点
            if ($a.text().replace(/\s+/, "") == searchText) {//$a的text中有很多空白，去掉后和搜索值比较
                clearTimeout(xClear+2);//clearTimeout在set之前执行，但也在timeout队列中，所以这句超前终止队列的语句才能生效
                setTimeout(function () {//顶替被禁用的动画addclass(blue)
                    x.addClass("green")
                },time);
            }
        }
        xClear=setTimeout(function () {
            x.addClass("blue")
        },time);
        newClear=setTimeout(function () {
            x.removeClass("blue")
        },time+=500)
    }
//清除正在显示的timeout事件队列 函数
    function clearFlash() {
        for (var i=clear;i<=newClear;i++){//清除上一轮生成的所有动画，不管执行完毕与否
            clearTimeout(i);
        }
        clear=newClear+1;
        $("#root .blue").removeClass("blue");
        $("#root .green").removeClass("green");
    }
//清除动画及样式 按钮 被点击
    $("#clearFlash").click(function () {
        clearFlash();
    })


//遍历
//深度优先遍历 及显示
    function dfs(x,y) {
        if(x){//标准的深度优先遍历格式
            flash(x,y);//先显示
            for(var i=0;i<x.children().length;i++){
                dfs(x.children().eq(i),y)//再循环遍历子元素
            }
        }else dfs($("#root"),y)//如果没有被选中的，则遍历整棵树
    }
//深度优先 遍历 按钮
    $("#DFS").click(function () {
        clearFlash();
        time=0;//重置time,再执行动画
        dfs($select,0);//执行遍历但不执行搜索
    })
//广度优先遍历 及显示
    function bfs(x,y) {
        if(x){//标准的广度优先遍历格式
            for(var i=0;i<x.children().length;i++){//先循环遍历子元素
                bfs(x.children().eq(i),y)
            }
            flash(x,y);//再显示
        }else bfs($("#root"),y)//如果没有被选中的，则遍历整棵树
    }
//广度优先 遍历 按钮
    $("#BFS").click(function () {
        clearFlash();
        time=0;//重置time,再执行动画
        bfs($select,0);//执行遍历但不执行搜索
    })


//搜索
var searchText;
//深度优先遍历 按钮 被点击
    $("#search1").click(function () {
        clearFlash();
        time=0;
        searchText=$("#searchText").val();
        dfs($select,1)//执行遍历并执行搜索
    })
//广度优先遍历 按钮 被点击
    $("#search2").click(function () {
        clearFlash();
        time=0;
        searchText=$("#searchText").val();
        bfs($select,1)//执行遍历并执行搜索
    })
})







