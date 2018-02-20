//创建一个二叉树 的函数
function BST() {
    this.root = null;
    this.insert=insert;
    this.inOrder=inOrder;
    this.preOrder=preOrder;
    this.postOrder=postOrder;
}
//创建二叉树-节点的函数
function Node(data,left,right,id) {
    this.data=data;
    this.left=left;
    this.right=right;
    this.id=id;
    this.show=show;
}
//显示节点数据 函数
function show() {
    return this.data;
}
//创建页面结构二叉树的函数
function insert(data,id) {
    var n= new Node(data,null,null,id);
    if (this.root==null){
        this.root=n;
    }else{
        var current = this.root;
        var parent;
        while (current){
            parent=current;
            if (data<current.data){
                current=current.left;
                if (current==null){
                    parent.left=n;
                    break;
                }
            }else if(data>current.data){
                current=current.right;
                if(current==null){
                    parent.right=n;
                    break;
                }
            }
        }
    }
}
//生成与页面结构相同的二叉树
var tree=new BST();
tree.insert(100,"#root");
tree.insert(50,"#node_L");
tree.insert(25,"#node_LL");
tree.insert(12,"#node_LLL");
tree.insert(37,"#node_LLR");
tree.insert(75,"#node_LR");
tree.insert(62,"#node_LRL");
tree.insert(87,"#node_LRR");
tree.insert(150,"#node_R");
tree.insert(125,"#node_RL");
tree.insert(112,"#node_RLL");
tree.insert(137,"#node_RLR");
tree.insert(175,"#node_RR");
tree.insert(162,"#node_RRL");
tree.insert(187,"#node_RRR");
var x=0;
var y=0,z=0,z1=0,y1=0;
//为元素添加样式并删除的函数。循环后生成settimeout活动队列
function haha(a) {
    y=setTimeout(function (a) {
        $(a).addClass("highLight")
    },x,a);
    z=setTimeout(function (a) {
        $(a).removeClass("highLight")
    },x+1000,a);
    x+=1000;
}
//先序遍历 显示函数
function preOrder(data) {
    if(data!=null){
        haha(data.id);
        preOrder(data.left);
        preOrder(data.right);
    }
}
//中序遍历显示 函数
function inOrder(data) {
    if(data!=null) {
        inOrder(data.left);
        haha(data.id);
        inOrder(data.right);
    }
}
//后序遍历显示 函数
function postOrder(data) {
    if(data!=null) {
        postOrder(data.left);
        postOrder(data.right);
        haha(data.id);
    }
}
//清除之前的特效
function clear() {
    for(y1;y1<y;y1++){clearTimeout(y1)}y1=y;
    for(z1;z1<z;z1++){clearTimeout(z1)}z1=z;
    $("div").removeClass("highLight");
}
//jQ
$(function () {
    $("#pre").click(function () {
        clear();
        tree.preOrder(tree.root);
        x=0;
    })
    $("#in").click(function () {
        clear();
        tree.inOrder(tree.root);
        x=0;
    })
    $("#post").click(function () {
        clear();
        tree.postOrder(tree.root);
        x=0;
    })
    $("#stop").click(function () {
        clear();
    })
})