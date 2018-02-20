function getmatrix(a,b,c,d,e,f){  //将矩阵转换为角度
    var aa=Math.round(180*Math.asin(a)/ Math.PI);
    var bb=Math.round(180*Math.acos(b)/ Math.PI);
    var cc=Math.round(180*Math.asin(c)/ Math.PI);
    var dd=Math.round(180*Math.acos(d)/ Math.PI);
    var deg=0;
    if(aa==bb||-aa==bb){
        deg=dd;
    }else if(-aa+bb==180){
        deg=180+cc;
    }else if(aa+bb==180){
        deg=360-cc||360-dd;
    }
    return deg>=360?0:deg;
}
function getDeg(){//得到角度值
    var deg = eval('get'+window.getComputedStyle(block, null).getPropertyValue("transform"));
    return deg;
}

function allCommand(){
    var command = document.getElementById('command').value;
    var block = document.getElementById('block');
    var y = block.offsetTop;
    var x = block.offsetLeft;
    if(command == "GO"){
        if (x > 350) {
            if(getDeg()==270){
                block.style.left =(x-54)+"px";
            }
        }
        if (x < 750) {
            if(getDeg() ==90){
                block.style.left =(x+54)+"px";
            }
        }
        if (y > 100) {
            if(getDeg()==0){
                block.style.top =(y-50)+"px";
            }
        }
        if (y < 500) {
            if(getDeg()==180){
                block.style.top=(y+50)+"px";
            }
        }
    }
    if(command == "TUN LEF"){
        block.style.transition ="transform 1s";
        block.style.transform = "rotate("+ eval(getDeg()-90) +"deg)";
    }
    if(command == "TUN RIG"){
        block.style.transition ="transform 1s";
        block.style.transform = "rotate("+ eval(getDeg()+90) +"deg)";
    }
    if(command == "TUN BAC"){
        block.style.transition ="transform 1s";
        block.style.transform = "rotate("+ eval(getDeg()+180) +"deg)";
    }
    if(command == "TRA LEF"){
        if(x>350){
            block.style.transition ="left 1s";
            block.style.left = (x-54)+"px";
        }
    }
    if(command == "TRA RIG"){
        if(x<750){
            block.style.transition ="left 1s";
            block.style.left = (x+54)+"px";
        }
    }
    if(command == "TRA TOP"){
        if(y>100){
            block.style.transition ="top 1s";
            block.style.top = (y-50)+"px";
        }
    }
    if(command == "TRA BOT"){
        if(y<500){
            block.style.transition ="top 1s";
            block.style.top = (y+50)+"px";
        }
    }
    if(command == "MOV LEF"){
        if(x>350){
            block.style.transition ="left 1s";
            block.style.left = (x-54)+"px";
            block.style.transform = "rotate(270deg)";
        }
    }
    if(command == "MOV RIG"){
        if(x<750){
            block.style.transition ="left 1s";
            block.style.left = (x+54)+"px";
            block.style.transform = "rotate(90deg)";
        }
    }
    if(command == "MOV TOP"){
        if(y>100){
            block.style.transition ="top 1s";
            block.style.top = (y-50)+"px";
            block.style.transform = "rotate(0deg)";
        }
    }
    if(command == "MOV BOT"){
        if(y<500){
            block.style.transition ="top 1s";
            block.style.top = (y+50)+"px";
            block.style.transform = "rotate(180deg)";
        }
    }
}
function init(){
    var doIt = document.getElementById('doIt');
    doIt.onclick = allCommand;
}
init();
