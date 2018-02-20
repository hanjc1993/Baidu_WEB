
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
var shunxu=[];
//先序遍历 显示函数
function preOrder(data) {
    if(data!=null){
        shunxu.push(data.id);
        preOrder(data.left);
        preOrder(data.right);
    }
}
//中序遍历显示 函数
function inOrder(data) {
    if(data!=null){
        inOrder(data.left);
        shunxu.push(data.id);
        inOrder(data.right);

    }
}
//后序遍历显示 函数
function postOrder(data) {
    if(data!=null){
        postOrder(data.left);
        postOrder(data.right);
        shunxu.push(data.id);
    }
}
//jQ
$(function () {
    $("#pre").click(function () {
        tree.preOrder(tree.root);
        flash();
        shunxu=[];
    })
    $("#in").click(function () {
        tree.inOrder(tree.root);
        flash();
        shunxu=[];
    })
    $("#post").click(function () {
        tree.postOrder(tree.root);
        flash();
        shunxu=[];
    })
})
//背景变化函数
function flash() {
    console.log(shunxu)
    var x=0;
    for (var i=0;i<shunxu.length;i++){
        setTimeout(function (a) {
            $(a).addClass("highLight");
            console.log(a+"已经添加高亮");
        },x,shunxu[i])//setTimeout函数仅接受简单的参数或对象，其他一律不识别，通过在时间参数后面加逗号实现，好像最多能加两个

        setTimeout(function (a) {
            $(a).removeClass("highLight");
            console.log(a+"已经移除高亮");
        },x+1000,shunxu[i])
        x+=1000;
    }
}