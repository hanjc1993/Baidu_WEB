$(function () {
    $("#form div input").focus(function () {
        $(this).addClass("focus").select().next().next().show().removeClass()
    })
var pass=false;
//表单验证函数
    function check(x,y) {
        $(x).next().next().show();
        var value=$(x).val();
        var long=value.replace(/\s+/g,"").replace(/[^\u0000-\u00ff]/g,"aa").length;
        $(x).removeClass();
        if (y==1){//姓名验证
            if (long==0){
                $(x).addClass("false").next().next().text("名称不能为空").addClass("red")
            }else if(long>=4&&long<=16){
                $(x).addClass("true").next().next().text("名称可用").addClass("green")
            }else{
                $(x).addClass("false").next().next().text("长度必须是4-16个字符").addClass("red")
            }
        }else if(y==2){//密码验证
            if (long==0){
                $(x).addClass("false").next().next().text("密码不能为空").addClass("red");
                pass=false;
            }else if(long>=6&&long<=16){
                $(x).addClass("true").next().next().text("密码可用").addClass("green")
                pass=true;
            }else{
                $(x).addClass("false").next().next().text("长度必须是6-16个字符").addClass("red")
                pass=false;
            }
        }else if (y==3){//密码再次验证
            if($(x).val()==$("#passwordIn").val()){
                if(pass){
                    $(x).addClass("true").next().next().text("密码已确认").addClass("green")
                }else{
                    $(x).addClass("false").next().next().text("请先输入正确的原密码").addClass("red")
                }
            }else{
                $(x).addClass("false").next().next().text("与原密码不相同").addClass("red")
            }
        }else if(y==4){//邮箱
            //x是字母数字下划线减号。。以x开头，@后面跟着x，以（.xx或.xxx出现1到2次）结尾
            var z=$(x).val().match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)
            if(z){
                $(x).addClass("true").next().next().text("邮箱格式正确").addClass("green")
            }else{
                $(x).addClass("false").next().next().text("请输入正确的邮箱地址（示例：xx@xx.xx）").addClass("red")
            }
        }else if(y==5){//手机号
            if(long==0){$(x).next().next().hide()}
            else if(long==11){
                $(x).addClass("true").next().next().text("手机号码格式正确").addClass("green")
            }
            else{
                $(x).addClass("false").next().next().text("手机号码格式错误").addClass("red")
            }
        }
    }

    $("#nameIn").focus(function () {//用户名
        $(this).next().next().text("必填，长度为4-16个字节")
    }).blur(function () {
        check(this,1)
    })
    $("#passwordIn").focus(function () {//密码
        $(this).next().next().text("必填，长度为6-16个字符，不接受空白符")
    }).blur(function () {
        check(this,2)
    })
    $("#passAgainIn").focus(function () {//重新密码
        $(this).next().next().text("必填，请再次输入密码")
    }).blur(function () {
        check(this,3)
    })
    $("#emailIn").focus(function () {//邮件
        $(this).next().next().text("必填，请输入邮箱地址（示例：xx@xx.xx）")
    }).blur(function () {
        check(this,4)
    })
    $("#phoneIn").focus(function () {//电话号
        $(this).next().next().text("选填，请输入手机号码")
    }).keyup(function () {//这里仅允许用户输入数字，不是数字就删掉
      $(this).val($(this).val().replace(/[^\d]/g,""))
    }).blur(function () {
        check(this,5);
    })
    $("#submit").click(function () {//提交
        $("#form div input").blur()
        setTimeout(function () {
            if($("input.false").length==0){
                alert("验证成功，表单已经提交")
            }else{
                alert("请核对表单内容")
            }
        },100)
    })
})