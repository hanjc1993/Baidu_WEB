//归根结底是想的太复杂了，生成的多叉树怎么可能随着页面变化而变化呢
//应该是先变化页面，再重新生成多叉树，及其位置存储函数



//创建一个多D叉C树S 的函数
function DCS() {
    this.root = null;
    this.insert=insert;
    this.del=del;
    //this.inOrder=inOrder;
    //this.preOrder=preOrder;
    //this.postOrder=postOrder;
}
//创建多叉树-节点的函数
function Node(parent,id,children,htmlId,value) {//如果这里的id等于html中的id，则可以更简单，但本次提供更大自由度
    this.parent=parent;
    this.id=id;
    this.children=children;
    this.htmlId=htmlId;
    this.value=value;
}
//存储id和位置的数组
var save =[];
//创建多叉树的函数
function insert(parent,id,value) {//其实可以分为根节点录入（2个参数），普通录入（3参），和带子节点一起录入（4）
    if (typeof parent=="number"&&typeof id=="number") {
        var json = [];//声明children是一个数组 json
        var htmlID = "DCS_" + id;//自动生成html id，方便后续调用
        var n = new Node(parent, id, json, htmlID, value);//根据输入的数据创建一个节点
        var p, L;//p中存储了再save中查出的id对应的position信息。。L中存储了parent原来的孩子数
        if (this.root == null) {//判断树是否为空，为空则把新节点作为根
            this.root = n;
            save.push({
                "id": n.id,
                "position": [0],
                "pToString":0
            })
            return n;//返回新加入的节点
        } else {//如果树不为空
            var boolIn = false;
            for (var i = 0; i < save.length; i++) {//则判断id是否冲突，冲突不给加
                if (save[i].id == id) {
                    alert("本体id已经存在")
                    break;
                }
                if (save[i].id == parent) {//则查找新加入的节点的parent是否存在，不存在在不给加
                    p = save[i].position.slice();//p是一个数组,复制父元素id对应的position信息
                    console.log("输入的父节点存在，坐标为： " + p);
                    boolIn = true;
                    break;
                }
            }
            if (boolIn) {//如果save中存在新加的元素的父元素则
                var check = "tree.root";
                for (var i = 0; i < p.length - 1; i++) {//把p中存储的位置信息应用
                    check = check + ".children[" + p[i] + "]";
                }
                console.log("In刚生成的check语句为： " + check);
                console.log("In即将执行的的check语句为： " + check + ".children.length");
                L = eval(check + ".children.length");//获取加入元素前，其父元素的孩子数量
                eval(check + ".children.push(n)");//加入
                p.push(L);//把L加入p的末尾，就产生了新的id的position信息
                var x=new RegExp(",","g");//创建一个正则表达式，用于将数组形式的position转换为字符串
                save.push({//save中也记录一下这个id及其position信息
                    "id": id,
                    "position": p,
                    "pToString":String(p).replace(x,"")
                })
                return n;
            } else alert("未找到父节点")
        }
    }else alert("id必须为数字")
}
//删除多叉树节点 的函数
function del(id) {
    var boolDel=false;
    var p,L,n,x;
    if (typeof id=="number") {//判断输入的格式
        if(this.root==null){alert("无可删除的节点")}//判断树是否为空，为空不能删
        else{//如果树不为空
            for(var i=0;i<save.length;i++){//查找save数组
                if (save[i].id==id) {//查找如果有想删除的id
                    p=save[i].position.slice();//记录此id对应的position
                    x=save[i].pToString;//记录此id对应的pToString
                    alert("找到了指定id")
                    boolDel=true;
                }
            }
            if(boolDel){//如果查到了
                //需要再将此节点下的孩子节点全部删除
                for(var i=save.length-1;i>=0;i--){//这里必须倒倒叙，否则查找会遗漏
                    if (save[i].pToString.substr(0,x.length)==x){//如果pTS的前几位想相等则证明是本身或者孩子
                        save.splice(i,1);//将此id 及其对应的position，pTS信息从save中剔除
                    }
                }
                //需要将此节点后面的同辈节点位置向前挪1
                L=p.pop();//将position去掉最后一位产生父节点的位置，并用L记录删掉的数据
                var check = "tree.root";
                for (var i = 0; i < p.length - 1; i++) {//把p中存储的位置信息应用
                    check = check + ".children[" + p[i] + "]";
                }
                console.log("Del刚生成的check语句为： " + check);
                console.log("即将执行的语句为"+"n="+check+".children["+L+"].slice()");
                eval("n="+check+".children[L]");//记录即将被删掉的节点(对象)
                eval(check+".children[L]=null");//将父节点的此孩子节点置空，优化的话就是把此节点删掉，但save中他的所有子元素position信息都要改，很麻烦，这里就不费事了
                return n;//返回被删除的节点,这里没错，在上面eval中已经赋值了，只是编译器识别不出来
            }else{alert("没有查到指定id")}
        }
    }else alert("id必须为数字")
}

var tree=new DCS();

//jQ
$(function () {
    var checkedID,n,divid;
    n=1;
    $("#root").click(function () {
        var a=n;
        $(this).toggleClass("highLight");
        if ($(this).hasClass("highLight")){
            divid = 999999999;
            checkedID=$(this).attr("id");
            console.log("checkedid的值为 ："+checkedID)
            n=0;
        }else {
            divid=null;
            checkedID=null;
            n=a;
        }

    })
    $("#root").on("click","div",function (e) {
        e.stopPropagation();
        if(checkedID!=$(this).attr("id")){
            $("#"+checkedID).removeClass("highLight")
        }
        $(this).toggleClass("highLight");
        if ($(this).hasClass("highLight")){
            divid = $(this).attr("data-DCSid");
            checkedID=$(this).attr("id");
            console.log("checkedid的值为 ："+checkedID)
        }else {
            divid=null;
            checkedID=null;
            console.log("checkedid的值为 ："+checkedID)
        }
    })
    $("#valueText").focus(function () {
        $(this).select()
    })
    $("#valueIn").click(function () {
        var text=$("#valueText").val();
        if(divid==null){alert("请选中想要插入的元素的父元素")}
        else {
            divid=Number(divid);
            var newNode=tree.insert(divid,n,text);
            if(newNode){
                $("#"+checkedID).append("<div id='"+newNode.htmlId+"' data-DCSid='"+n+"'>"+text+"</div>");
                alert("插入成功！");
                $("#valueText").select();
                var grow= $("#"+checkedID).css("flex-grow");
                $("#"+checkedID).css("flex-grow",++grow);
            }else alert("插入失败")
            n++;
        }
    })
    $("#divDel").click(function () {
        if(divid==null){alert("请选中想要删除的元素")}
        else {
            divid=Number(divid);
            var delNode=tree.del(divid);
            if(delNode){
                var grow= $("#"+checkedID).parent().css("flex-grow");
                $("#"+checkedID).parent().css("flex-grow",--grow);
                $("#"+checkedID).remove();
                alert("删除成功");
                //可能需要清空所有highLight样式
            }else alert("删除失败")
        }
    })
})