//新建问卷后，直接append到wenjuan数组中，其state初始为draft
let vm = new Vue({
    el:'#container',
    data:{
        wenjuan : [{
            name: '这是我的第一份问卷',
            deadline: [2017,12,1,20,12,33],
            state: '待发布',
            question:[{
                type:'单选题',
                text:'这是一道单选题，请选择',
                options:['他最帅','你最帅','我最帅','她最帅'],
                required:true,
                data:[1,1,2,1,3,0,1]
            },{
                type:'多选题',
                text:'这是一道多选题，请选择',
                options:['他也帅','你也帅','我也帅'],
                required:true,
                data:[[1,1],[2,1],[2,0],[1],[1,2,0],[1,2]]
            },{
                type:'简答题',
                text:'这是一道简答题，请写下你的想法',
                options:[],
                required:false,
                data:['我觉得他真的好帅','还好他没有我帅','个个都是帅比']
            }]
        },{
            name: '这是我的第二二二份问卷',
            deadline: [2017,12,1,20,12,33],
            state: '已结束',
            question:[{
                type:'单选题',
                text:'这是一道单选题，请选择',
                options:['他最帅','你最帅','我最帅','她最帅'],
                required:true,
                data:[1,1,2,1,3,0,1]
            },{
                type:'多选题',
                text:'这是一道多选题，请选择',
                options:['他也帅','你也帅','我也帅'],
                required:true,
                data:[[1,1],[2,1],[2,0],[1],[1,2,0],[1,2]]
            },{
                type:'简答题',
                text:'这是一道简答题，请写下你的想法',
                options:[],
                required:false,
                data:['我觉得他真的好帅','还好他没有我帅','个个都是帅比']
            }]
        },{
            name: '这是我的第三三三份问卷',
            deadline: [2017,12,1,20,12,33],
            state: '发布中',
            question:[{
                type:'单选题',
                text:'这是一道单选题，请选择',
                options:['他最帅','你最帅','我最帅','她最帅'],
                required:true,
                data:[1,1,2,1,3,0,1]
            },{
                type:'多选题',
                text:'这是一道多选题，请选择',
                options:['他也帅','你也帅','我也帅'],
                required:true,
                data:[[1,1],[2,1],[2,0],[1],[1,2,0],[1,2]]
            },{
                type:'简答题',
                text:'这是一道简答题，请写下你的想法',
                options:[],
                required:false,
                data:['我觉得他真的好帅','还好他没有我帅','个个都是帅比']
            }]
        }],
        newwenjuan:[{
            name: '请输入标题',
            deadline: [2017,12,1,20,12,33],
            state: '发布中',
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
            }],
        }],
        alertContent:'',//提示框中的内容
        ACOption:{
            inputOne:'请输入选项内容：<br><input type="text" id="inputOne">',
            inputTwo:
                '请输入题干内容：<br><input type="text" id="inputTwo1">' +
                '请输入选项，以半角分号";"分隔<br><input type="text" id="inputTwo2">',
            noOptionQs:'没有选项的选择题将不被显示，请删除题目或补充选项',
            delAll:'你确定要删除所选的问卷？',
            delNoCheck:'请选中后再执行单个删除',

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
            
        }
    },
    computed:{
        wenlist :function () {
            let x ='';
            for(let i = 0 ; i < this.wenjuan.length ; i++){
                let time = '';
                for(let a=0 ; a<6 ; a++){
                    time += this.wenjuan[i].deadline[a];
                    if(a<2){
                        time += '-';
                    }else if(a==2){
                        time += ' ';
                    }else if(a<5){
                        time += ':'
                    }//如果等于5，不操作
                }
                let state = this.wenjuan[i].state;
                if(state !='发布中'){
                    state = ''
                }else{state = 'ing'}
                x += '<tr>' +
                    '<td class="col1"><input type="radio" name="select"></td>' +
                    '<td class="col2">'+this.wenjuan[i].name+'</td>' +
                    '<td class="col3">'+time+'</td>' +
                    '<td class="col4 '+state+'">'+this.wenjuan[i].state+'</td>' +
                    '</tr>'
            }
            x += '                <tr id="last">\n' +
                '                    <td colspan="2">\n' +
                '                        <button id="newWen" onclick="newWen1()">\n' +
                '                            <span>+</span> 新建问卷\n' +
                '                        </button>\n' +
                '                    </td>\n' +
                '                    <td class="col5">\n' +
                '                        <input type="button" value="编辑">\n' +
                '                        <input type="button" value="删除" onclick="doDel(\'this\')">\n' +
                '                        <input type="button" value="查看数据">\n' +
                '                    </td>\n' +
                '                    <td>\n' +
                '                        <input type="button" value="全部删除" onclick="doDel(\'all\')">\n' +
                '                    </td>\n' +
                '                </tr>'
            return x;
        },
        newWenQs:function () {
            let x = '';
            for (let i=0 ; i< this.newwenjuan[0].question.length; i++){
                //如果是选择题，则循环记录其选项
                //如果是选择题，则允许添加选项
                let li = '';
                let newOption = ''
                let type = this.newwenjuan[0].question[i].type;
                if(type == 'text'){
                    li = '<textarea rows="3"></textarea>'
                }else{
                    for (let a=0 ; a<this.newwenjuan[0].question[i].options.length ; a++){
                        li += '         <li><input type='+type+' disabled>'+this.newwenjuan[0].question[i].options[a]+' <span>×</span></li>\n'
                    }
                    newOption = '       <span class="newOption">＋</span>\n'
                }
                //顶端不需要上移，低端不需要下移
                let upThis = ''
                let downThis = ''
                if(i!=0){
                    upThis = '       <span class="upThis">上移</span>\n'
                }
                if(i!=this.newwenjuan[0].question.length - 1){
                    downThis = '       <span class="downThis">下移</span>\n'
                }
                //累加生成html内容
                x += '<div class="newWenQs">\n' +
                    '   <ul>\n' +
                    '       <li><b>Q'+(i+1)+'&nbsp;</b> '+this.newwenjuan[0].question[i].text+'</li>\n' +
                    li+
                    '   </ul>\n' +
                    '   <div class="qsFunc">\n' +
                    '       <span class="delThis">删除</span>\n' +
                    '       <span class="reuseThis">复用</span>\n' +
                    downThis +
                    upThis +
                    '       <span><label><input type="checkbox" checked> 是否必填 </label></span>\n' +
                    newOption +
                    '   </div>\n' +
                    '</div>'
            }
            return x;
        }
    },
    methods:{

    }
})