let defaultWen = {
    name: '请输入标题',
    startTime:'',
    deadline: '',
    question:[]
}
let vm = new Vue({
    el:'#container',
    data:{
        wenjuan : [
            {
            name: '这是我的第一份问卷',
            startTime:'2018-02-27T12:10',
            deadline: '2018-06-27T13:10',
            question:[{
                type:'radio',
                text:'这是一道单选题，请选择',
                options:['他最帅','你最帅','我最帅','她最帅'],
                required:true,
                data:[1,1,2,1,3,0,1]
            },{
                type:'checkbox',
                text:'这是一道多选题，请选择',
                options:['他也帅','你也帅','我也帅'],
                required:true,
                data:[[1,1],[2,1],[2,0],[1],[1,2,0],[1,2]]
            },{
                type:'text',
                text:'这是一道简答题，请写下你的想法',
                options:[],
                required:false,
                data:['我觉得他真的好帅','还好他没有我帅','个个都是帅比','个个都是帅比个个都是帅比个个都是帅比个个都是帅比个个都是帅比']
            }]
        },{
            name: '这是我的第二二二份问卷',
            startTime:'2018-02-26T12:10',
            deadline: '2018-02-27T13:10',
            question:[{
                type:'radio',
                text:'这是一道单选题，请选择',
                options:['他最帅','你最帅','我最帅','她最帅'],
                required:true,
                data:[1,1,2,1,3,0,1]
            },{
                type:'checkbox',
                text:'这是一道多选题，请选择',
                options:['他也帅','你也帅','我也帅'],
                required:true,
                data:[[1,2],[1,2],[2,0],[1],[1,2,0],[1,2]]
            },{
                type:'text',
                text:'这是一道简答题，请写下你的想法',
                options:[],
                required:false,
                data:['我觉得他真的好帅','还好他没有我帅','个个都是帅比']
            }]
        },{
            name: '这是我的第三三三份问卷--edit测试',
            startTime:'2018-04-27T12:10',
            deadline: '2018-06-27T13:10',
            question:[{
                type:'radio',
                text:'这是一道单选题，请选择--edit测试专用',
                options:['他最帅edit测试','你最帅edit测试','我最帅edit测试','她最帅edit测试'],
                required:true,
                data:[1,1,2,1,3,0,1]
            },{
                type:'checkbox',
                text:'这是一道多选题，请选择--edit测试专用',
                options:['他也帅edit测试','你也帅edit测试','我也帅edit测试'],
                required:true,
                data:[[1,1],[2,1],[2,0],[1],[1,2,0],[1,2]]
            },{
                type:'text',
                text:'这是一道简答题，请写下你的想法--edit测试专用',
                options:[],
                required:false,
                data:['我觉得他真的好帅edit测试','还好他没有我帅edit测试','个个都是帅比edit测试']
            }]
        },{
            name: '新建的问卷-测试',
            startTime:'2018-02-27T12:10',
            deadline: '2018-04-27T13:10',
            question:[
                {
                    type:'radio',
                    text:'这是一道单选题，请选择',
                    options:['他最帅','你最帅','我最帅','她最帅'],
                    required:true,
                    data:[1,1,2,1,3,0,1]
                },{
                    type:'checkbox',
                    text:'这是一道多选题，请选择',
                    options:['他也帅','你也帅','我也帅'],
                    required:true,
                    data:[[1,1],[2,1],[2,0],[1],[1,2,0],[1,2]]
                },{
                    type:'checkbox',
                    text:'这是另一道多选题，请选择',
                    options:['他也帅','你也帅','我也帅'],
                    required:true,
                    data:[[1,1],[2,1],[2,0],[1],[1,2,0],[1,2]]
                },{
                    type:'text',
                    text:'这是一道简答题，请写下你的想法',
                    options:[],
                    required:false,
                    data:['我觉得他真的好帅','还好他没有我帅','个个都是帅比']
                }
            ],
        }],
        newwenjuan:[defaultWen],//这里设置为数组，主要是为了和上面保持一致，方便函数处理
        editwenjuan:[defaultWen],//这里设置为数组，主要是为了和上面保持一致，方便函数处理
        quicksetOption :(
        '                        <option value=""></option>\n' +
        '                        <option value="0"> 今天</option>\n' +
        '                        <option value="1">1 天后</option>\n' +
        '                        <option value="2">2 天后</option>\n' +
        '                        <option value="3">3 天后</option>\n' +
        '                        <option value="5">5 天后</option>\n' +
        '                        <option value="7">7 天后</option>\n' +
        '                        <option value="10">10天后</option>\n' +
        '                        <option value="30">30天后</option>\n' +
        '                        <option value="365">365天后</option>'),
        selectWenIndex: -1,//当前选中的是哪个问卷
        floatShow:false,//提示框显示与否
        alertContent:'',//提示框中的内容
        ACOption:{
            inputOne:'请输入选项内容：<br><input type="text" id="inputOne">',
            inputTwo:
                '请输入题干内容：<br><input type="text" id="inputTwo1">' +
                '请输入选项，以半角分号";"分隔<br><input type="text" id="inputTwo2">',
            noOptionQs:'没有选项的选择题将不被显示，请删除题目或补充选项',
            delAll:'你确定要删除<b>全部</b>问卷？',
            delThis:'你确定要删除所选的问卷？',
            delNoCheck:'请选中至少一个问卷',
            noSaveOut:'直接退出后的内容将无法保存，您确定么？',
            noWen:'当前没有问卷，自动跳转到新建页面',
            editStems:'请输入新的题干内容：<br><input type="text" id="inputOne">',
            cantEdit:'<b>强烈不建议</b>编辑"发布中"或"已结束"的问卷',
            cantShow:'未发布的问卷，没有数据可供展示',
            newTextType:'请输入简答题题干：<br><input type="text" id="inputOne">'
        },
        floatButton:'',//提示框按钮的内容，
        FBOption:{
            alert:
            '                <div id="alertB" class="windowB">\n' +
            '                    <input type="button" onclick="vm.floatClose()" value="   确定   ">\n' +
            '                </div>',
            delAll:
            '                <div id="delAllB" class="windowB">\n' +
            '                    <input type="button" onclick="delAllWen()" value="   确定   ">\n' +
            '                    <input type="button" onclick="vm.floatClose()" value="   取消   ">\n' +
            '                </div>',
            delOne:
            '                <div id="delOneB" class="windowB">\n' +
            '                    <input type="button" onclick="delOneWen()" value="   确定   ">\n' +
            '                    <input type="button" onclick="vm.floatClose()" value="   取消   ">\n' +
            '                </div>',
            newOption:
            '                <div id="newOptionB" class="windowB">\n' +
            '                    <input type="button" onclick="getNewOption()" value="   确定   ">\n' +
            '                    <input type="button" onclick="vm.floatClose()" value="   取消   ">\n' +
            '                </div>',
            newRadio:
            '                <div id="newRadioB" class="windowB">\n' +
            '                    <input type="button" onclick="getNewQs(\'radio\')" value="   确定   ">\n' +
            '                    <input type="button" onclick="vm.floatClose()" value="   取消   ">\n' +
            '                </div>',
            newCheck:
            '                <div id="newCheckB" class="windowB">\n' +
            '                    <input type="button" onclick="getNewQs(\'checkbox\')" value="   确定   ">\n' +
            '                    <input type="button" onclick="vm.floatClose()" value="   取消   ">\n' +
            '                </div>',
            newText:
            '                <div id="newTentB" class="windowB">\n' +
            '                    <input type="button" onclick="getNewQs(\'text\')" value="   确定   ">\n' +
            '                    <input type="button" onclick="vm.floatClose()" value="   取消   ">\n' +
            '                </div>',
            noSaveOut://懒得把这条数据放在vue-computed中，将就一下。saveOut函数进行了对应的微调。
            '                <div id="noSaveOutB" class="windowB">\n' +
            '                    <input type="button" onclick="returnMyWen();" value="   不保存   ">\n' +
            '                    <input type="button" onclick="vm.saveOut()" value="   保存并退出   ">\n' +
            '                </div>',
            editStems:
            '                <div id="editStemsB" class="windowB">\n' +
            '                    <input type="button" onclick="stemsEdit()" value="   确定   ">\n' +
            '                    <input type="button" onclick="vm.floatClose()" value="   取消   ">\n' +
            '                </div>',
            cantEdit:
            '                <div id="cantEditB" class="windowB">\n' +
            '                    <input type="button" onclick="vm.editWen(\'stillEdit\')" value="   仍然编辑   ">\n' +
            '                    <input type="button" onclick="vm.floatClose()" value="   取消   ">\n' +
            '                </div>',
        },
        wenNameEditing:false,//问卷名字正在被修改么
        qsTypeEditing:false,//新建题目正在被选择类型么
        editWhichQs:-1,//当前正在编辑哪个题目，添加选项和编辑题干用到
        whichShow:'main',//目前正在显示的，是main还是new还是edit还是show
        biggerFloat:false,//floatwindow是否应用bigger类
    },
    watch:{
        wenjuanLength(newVal){    //检查问卷数量，如果为0则自动跳转新建页面
            if (newVal == 0){
                vm.floatWindow('alert','noWen')
                vm.newWen();
            }
        }
    },
    computed:{
        //当新建或者编辑的问卷问题改变后，通过此处刷新
        newWenQs:function () {
            let x = '';
            if(this.whichShow == 'edit' || this.whichShow == 'new'){
                let which = this.whichShow+'wenjuan';//标记是edit问卷还是new问卷
                for (let i=0 ; i< this[which][0].question.length; i++){
                    let li = '';
                    let newOption = ''
                    let type = this[which][0].question[i].type;
                    if(type == 'text'){
                        li = '<textarea rows="3"></textarea>'
                    }//如果是选择题，则允许添加选项，则循环输出其选项
                    else{
                        for (let a=0 ; a<this[which][0].question[i].options.length ; a++){
                            li += '         <li><input type="'+type+'" disabled>'+this[which][0].question[i].options[a]+' <span>×</span></li>\n'
                        }
                        newOption = '       <span class="newOption">＋</span>\n'
                    }
                    //顶端不需要上移，低端不需要下移
                    let upThis = ''
                    let downThis = ''
                    if(i!=0){
                        upThis = '       <span class="upThis">上移</span>\n'
                    }
                    if(i!=this[which][0].question.length - 1){
                        downThis = '       <span class="downThis">下移</span>\n'
                    }
                    //必填的选项框状态
                    let required = '';
                    if(this[which][0].question[i].required){
                        required = 'checked'
                    }
                    //累加生成html内容
                    x += '<div class="wenQs">\n' +
                        '   <ul>\n' +
                        '       <li><b>Q'+(i+1)+'&nbsp;</b> '+this[which][0].question[i].text+'<img height="20" src="edit.png" alt="编辑题干"></li>\n' +
                        li+
                        '   </ul>\n' +
                        '   <div class="qsFunc">\n' +
                        '       <span class="delThis">删除</span>\n' +
                        '       <span class="reuseThis">复用</span>\n' +
                        downThis +
                        upThis +
                        '       <span><label><input type="checkbox" '+required+'> 是否必填 </label></span>\n' +
                        newOption +
                        '   </div>\n' +
                        '</div>'
                }
            }
            return x;
        },
        //作为问卷长度监听属性的，中间值
        wenjuanLength(){ return this.wenjuan.length  },
        othersHide(){
            let x = {
                'main':false,
                'new':false,
                'edit':false,
                'show':false
            }
            x[this.whichShow] = true;
            return x;
        },
        //更新问卷的发布状态，初始化.NoT属性赋值
        timeAndState(){
            let x = {
                wenjuan:[],
                newwenjuan:[],
                editwenjuan:[]
            }
            let date = new Date();
            //wenjuan 的赋值
            for(let i = 0 ; i < this.wenjuan.length ; i++) {
                let wenjuan = {
                    deadlineNoT: this.wenjuan[i].deadline.replace(/T/, ' '),
                    startTimeNoT: this.wenjuan[i].startTime.replace(/T/, ' '),
                    state:''
                }
                if (compareDate(wenjuan.startTimeNoT, date)) {
                    wenjuan.state = ['待发布',false];
                } else if (compareDate(date, wenjuan.deadlineNoT)) {
                    wenjuan.state = ['已结束',false];
                } else {
                    wenjuan.state = ['发布中',true];
                }
                x.wenjuan.push(wenjuan);
            }
            //newwenjuan 的赋值
            let newwenjuan = {
                deadlineNoT:this.newwenjuan[0].deadline.replace(/T/, ' '),
                startTimeNoT:this.newwenjuan[0].startTime.replace(/T/, ' '),
                state:''
            }
            if (compareDate(newwenjuan.startTimeNoT, date)) {
                newwenjuan.state = ['待发布',false];
            } else if (compareDate(date, newwenjuan.deadlineNoT)) {
                newwenjuan.state = ['已结束',false];
            } else {
                newwenjuan.state = ['发布中',true];
            }
            x.newwenjuan = newwenjuan;
            //editwenjuan 的赋值
            let editwenjuan = {
                deadlineNoT: this.editwenjuan[0].deadline.replace(/T/, ' '),
                startTimeNoT: this.editwenjuan[0].startTime.replace(/T/, ' '),
                state:''
            }
            if (compareDate(editwenjuan.startTimeNoT, date)) {
                editwenjuan.state = ['待发布',false];
            } else if (compareDate(date, editwenjuan.deadlineNoT)) {
                editwenjuan.state = ['已结束',false];
            } else {
                editwenjuan.state = ['发布中',true];
            }
            x.editwenjuan = editwenjuan;

            return x;
        }
    },
    methods:{
        //日期-检查截止时间不能在开始时间之前
        checkDuring:function () {
            let which = this.whichShow+'wenjuan';
            let deadline = this[which][0].deadline.replace(/T/,' ') ;
            let startime = this[which][0].startTime.replace(/T/,' ') ;
            let error = compareDate(startime,deadline)
            if(error){
                alert('截止时间必须在开始时间之后')
                return false;
            }else{return true}
        },
        //检查 编辑的问卷是否有标题，开始时间是否早于当前
        checkData:function () {
            let which = this.whichShow+'wenjuan';
            let startTime = this[which][0].startTime;
            startTime = startTime.replace(/T/,' ');
            let now = new Date();
            if(this[which][0].name == '请输入标题'){
                alert('请修改标题')
                return false;
            }else if(compareDate(now,startTime)){
                alert('开始时间不能早于当前时间');
                return false;
            }
            else{
                return true;
            }
        },
        //浮动框弹出-被各种调用
        floatWindow(button,content){
            this.floatButton = this.FBOption[button];
            this.alertContent = this.ACOption[content];
            this.floatShow = true;
            //这里vue处理需要时间，所以把focus放在timeout队列中
            setTimeout(function () {
                let alertInput = document.getElementById('alertContent').getElementsByTagName('input');
                if(alertInput.length != 0){//否则浏览器会记录上次的内容
                    for(let i=0;i<alertInput.length ; i++){
                        alertInput[i].value = ''
                    }
                    alertInput[0].focus();
                }
            },1)
        },
        //提示框-关闭
        floatClose() {
            this.floatShow = false;
            this.biggerFloat = false;
        },
        //新建问卷-启动函数
        newWen() {
            this.whichShow = 'new'
            vm.newwenjuan = [defaultWen];
            document.querySelectorAll('#newMain select option:first-child').selected = true;
            vm.newDuring();
        },
        //新建问卷-新建截止日期，默认设置为当前日期
        newDuring(dayafter,type) {//dayafter 意为几天后，绑定快捷设置日期
            let date = new Date();
            let date1;
            if(dayafter!=undefined){
                dayafter = Number(dayafter);
                date1 = new Date(date.getFullYear(),date.getMonth(),(date.getDate()+dayafter));
            }else{date1 = date;}

            let day = ('0'+date1.getDate()).slice(-2);
            let month = ('0'+(date1.getMonth()+1)).slice(-2);
            let year = date1.getFullYear()
            let hour = ('0'+date.getHours()).slice(-2);
            let minute = ('0'+date.getMinutes()).slice(-2);
            let which = this.whichShow+'wenjuan';
            if(type == 'deadline'){
                this[which][0].deadline = year+'-'+month+'-'+day+'T'+hour+':'+minute;
            }else if(type == 'startTime'){
                this[which][0].startTime = year+'-'+month+'-'+day+'T'+hour+':'+minute;
            }else if(type == undefined){
                this[which][0].deadline = this[which][0].startTime = year+'-'+month+'-'+day+'T'+hour+':'+minute;
            }
            vm.checkDuring();
        },
        //退出-不保存就退出的提示
        noSaveOut() {
            vm.floatWindow('noSaveOut','noSaveOut');
        },
        //退出-保存并退出
        saveOut(state) {
            if(vm.checkDuring() && vm.checkData()){
                let nowWenData = JSON.parse(JSON.stringify(this[this.whichShow+'wenjuan'][0]));
                if(this.whichShow == 'new'){
                    this.wenjuan.push(nowWenData);
                    if(state == 'stay'){
                        setTimeout(function () {//还是数据同步时间问题，深度复制好像是另一个线程？
                            //为了进入编辑状态，先把新添加的问卷选中
                            let newone = document.querySelectorAll('#mainTable tbody input[name="select"]')
                            newone[newone.length - 1].checked = true;
                            vm.editWen();
                        },1)
                    }
                }else if(this.whichShow == 'edit'){
                    this.wenjuan.splice(this.selectWenIndex,1,nowWenData);
                    if(state == 'stay'){//这里就不需要settimeout，不懂为什么
                        document.querySelectorAll('#mainTable tbody input[name="select"]')[this.selectWenIndex].checked = true;
                        vm.editWen();
                    }
                }
                if(state == undefined){returnMyWen()}
            }
        },
        //编辑问卷
        //编辑问卷启动函数
        editWen(x) {
            if(vm.checkChecked()){
                if(x == 'stillEdit' || this.timeAndState.wenjuan[this.selectWenIndex].state[0] == '待发布'){
                    this.whichShow = 'edit'
                    document.querySelectorAll('#editMain select option:first-child').selected = true;
                    let edit = JSON.parse(JSON.stringify(this.wenjuan[this.selectWenIndex]));
                    this.editwenjuan.splice(0,1,edit);
                    if(x){vm.floatClose();}
                }else{
                    vm.floatWindow('cantEdit','cantEdit')
                }
            }
        },
        //检查是否选中，单个删除和查看数据时也调用这函数
        checkChecked() {
            this.selectWenIndex = $('#mainTable tbody input[name="select"]:checked').parents('tr').index();
            if(this.selectWenIndex == -1){
                vm.floatWindow('alert','delNoCheck');
                return false
            }else{
                return true;
            }
        }
    },
})