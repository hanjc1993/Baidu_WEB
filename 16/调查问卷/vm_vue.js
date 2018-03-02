//新建问卷后，直接append到wenjuan数组中，其state初始为draft
let vm = new Vue({
    el:'#container',
    data:{
        wenjuan : [{
            name: '这是我的第一份问卷',
            startTime:'2018-02-27T12:10',
            deadline: '2018-06-27T13:10',
            state: '待发布',
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
            state: '已结束',
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
            deadline: '2018-02-27T13:10',
            state: '发布中',
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
            startTime:'2018-04-27T12:10',
            deadline: '2018-02-27T13:10',
            state: '发布中',
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
        newwenjuan:[{//这里设置为数组，主要是为了和上面保持一致，方便函数处理
            name: '请输入标题',
            startTime:'',
            deadline: '',
            state: '发布中',
            question:[]
        }],
        editwenjuan:[{
            name: '',
            startTime:'',
            deadline: '',
            state: '',
            question:[]
        }],
        selectWenIndex: -1,//当前选中的是哪个问卷
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
            cantShow:'未发布的问卷，没有数据可供展示'
        },
        floatButton:'',//提示框按钮的内容，
        FBOption:{
            alert:
            '                <div id="alertB" class="windowB">\n' +
            '                    <input type="button" onclick="floatClose()" value="   确定   ">\n' +
            '                </div>',
            delAll:
            '                <div id="delAllB" class="windowB">\n' +
            '                    <input type="button" onclick="delAllWen()" value="   确定   ">\n' +
            '                    <input type="button" onclick="floatClose()" value="   取消   ">\n' +
            '                </div>',
            delOne:
            '                <div id="delOneB" class="windowB">\n' +
            '                    <input type="button" onclick="delOneWen()" value="   确定   ">\n' +
            '                    <input type="button" onclick="floatClose()" value="   取消   ">\n' +
            '                </div>',
            newOption:
            '                <div id="newOptionB" class="windowB">\n' +
            '                    <input type="button" onclick="getNewOption()" value="   确定   ">\n' +
            '                    <input type="button" onclick="floatClose()" value="   取消   ">\n' +
            '                </div>',
            newRadio:
            '                <div id="newRadioB" class="windowB">\n' +
            '                    <input type="button" onclick="getNewQs(\'radio\')" value="   确定   ">\n' +
            '                    <input type="button" onclick="floatClose()" value="   取消   ">\n' +
            '                </div>',
            newCheck:
            '                <div id="newCheckB" class="windowB">\n' +
            '                    <input type="button" onclick="getNewQs(\'checkbox\')" value="   确定   ">\n' +
            '                    <input type="button" onclick="floatClose()" value="   取消   ">\n' +
            '                </div>',
            newText:
            '                <div id="newTentB" class="windowB">\n' +
            '                    <input type="button" onclick="getNewQs(\'text\')" value="   确定   ">\n' +
            '                    <input type="button" onclick="floatClose()" value="   取消   ">\n' +
            '                </div>',
            noSaveOut://懒得把这条数据放在vue-computed中，将就一下。saveOut函数进行了对应的微调。
            '                <div id="noSaveOutB" class="windowB">\n' +
            '                    <input type="button" onclick="delNowWen();returnMyWen();" value="   不保存   ">\n' +
            '                    <input type="button" onclick="saveOut(\'relative\',\'relative\')" value="   保存并退出   ">\n' +
            '                </div>',
            editStems:
            '                <div id="editStemsB" class="windowB">\n' +
            '                    <input type="button" onclick="stemsEdit()" value="   确定   ">\n' +
            '                    <input type="button" onclick="floatClose()" value="   取消   ">\n' +
            '                </div>',
            cantEdit:
            '                <div id="cantEditB" class="windowB">\n' +
            '                    <input type="button" onclick="editWen(\'stillEdit\')" value="   仍然编辑   ">\n' +
            '                    <input type="button" onclick="floatClose()" value="   取消   ">\n' +
            '                </div>',
        },
        wenNameEditing:false,//问卷名字正在被修改么
        qsTypeEditing:false,//新建题目正在被选择类型么
        editOrNew:'',//当前正在显示的是编辑还是新建页面？
        editWhichQs:-1,//当前正在编辑哪个题目，添加选项和编辑题干用到
    },
    computed:{
        wenlist :function () {
            let x ='';
            for(let i = 0 ; i < this.wenjuan.length ; i++){
                let deadline = this.wenjuan[i].deadline.replace(/T/,' ') ;
                let startime = this.wenjuan[i].startTime.replace(/T/,' ') ;
                let state;
                let date = new Date();

                if(compareDate(startime,date)){
                    this.wenjuan[i].state = '待发布';
                    state = '';
                }else if(compareDate(date,deadline)){
                    this.wenjuan[i].state = '已结束';
                    state = '';
                }else{
                    this.wenjuan[i].state = '发布中';
                    state = 'ing';
                }
                x += '<tr>' +
                    '<td class="col1"><input type="radio" name="select"></td>' +
                    '<td class="col2">'+this.wenjuan[i].name+'</td>' +
                    '<td class="col3">'+deadline+'</td>' +
                    '<td class="col4 '+state+'">'+this.wenjuan[i].state+'</td>' +
                    '</tr>'
            }
            x += '                <tr id="last">\n' +
                '                    <td colspan="2">\n' +
                '                        <input type="button" id="newWen" onclick="newWen()" value="＋ 新建问卷">\n' +
                '                    </td>\n' +
                '                    <td class="col5">\n' +
                '                        <input type="button" value="编辑" onclick="editWen()">\n' +
                '                        <input type="button" value="删除" onclick="doDel(\'this\')">\n' +
                '                        <input type="button" value="查看数据" onclick="showData()">\n' +
                '                    </td>\n' +
                '                    <td>\n' +
                '                        <input type="button" value="全部删除" onclick="doDel(\'all\')">\n' +
                '                    </td>\n' +
                '                </tr>'
            return x;
        },
        newWenQs:function () {
            let x = '';
            let which = this.editOrNew+'wenjuan';//标记是edit问卷还是new问卷
            for (let i=0 ; i< this[which][0].question.length; i++){
                //如果是选择题，则循环记录其选项
                //如果是选择题，则允许添加选项
                let li = '';
                let newOption = ''
                let type = this[which][0].question[i].type;
                if(type == 'text'){
                    li = '<textarea rows="3"></textarea>'
                }else{
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
            return x;
        },
    },
    methods:{
        //日期-检查截止时间不能在开始时间之前
        checkDuring:function () {
            let which = this.editOrNew+'wenjuan';
            let deadline = this[which][0].deadline.replace(/T/,' ') ;
            let startime = this[which][0].startTime.replace(/T/,' ') ;
            let error = compareDate(startime,deadline)
            if(error){
                alert('截止时间必须在开始时间之后')
                return false;
            }else{return true}
        },
        checkData:function () {
            let which = this.editOrNew+'wenjuan';
            let startTime = this[which][0].startTime;
            startTime = new Date(startTime.replace(/T/,' ').replace(/-/g,"\/"));
            let now = new Date();
            console.log(startTime);
            console.log(now)
            if(this[which][0].name == '请输入标题'){
                alert('请修改标题')
                return false;
            }else if(startTime <= now){
                alert('开始时间不能早于当前时间');
                return false;
            }
            else{
                return true;
            }
        }
    }
})