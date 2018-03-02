function drawCharts() {
    $('#showWenBody').empty();
    let thiswen = vm.wenjuan[vm.selectWenIndex];
    //标题
    $('#showWenName p').text(thiswen.name);
    //起止日期
    let deadline = thiswen.deadline.replace(/T/,' ');
    let startTime = thiswen.startTime.replace(/T/,' ');
    $('#showMain #durEnd b').text(deadline);
    $('#showMain #durStart b').text(startTime);

    for(let i =0 ; i<vm.wenjuan[vm.selectWenIndex].question.length ; i++){
        let qs = thiswen.question[i];
        //<b>Q'+(i+1)+'&nbsp;</b> '+this[which][0].question[i].text
        $('#showWenBody').append(
            "<div class='showQsText'><b>Q"+(i+1)+"&nbsp;</b>"+qs.text+"</div>" +
            "<div id='showQs"+i+"' style='height: 300px;width: 700px'></div>"
        )
        let myCharts = echarts.init($('#showWenBody').find('div:last')[0])

        let dataNew = dataTransform(qs.data,qs.options,qs.type);
        let option = newOption(dataNew,qs.options,qs.type);
        myCharts.setOption(option)
    }
}

function dataTransform(dataOld,options,type) {
    //其实qs.data的格式可以在用户提交时候就自动转换，但我觉得还是保持最原始状态，直接append进data最好
    //然后在这里转换，本次把单选展示选项占比，多选展示选项选择的次数，text展示答案字数分布情况
    let dataNew;
    if(type == 'radio'){
        let arrayLength = options.length;
        dataNew = new Array(arrayLength);
        for (let a = 0; a < arrayLength ;a++){
            dataNew[a] = 0;
        }//全部置0
        for(let a = 0; a < dataOld.length; a++){
            dataNew[dataOld[a]]++;
        }
        //计算每个选项的占比
        for(let a = 0; a < arrayLength ;a++){
            dataNew[a] = ( dataNew[a]/dataOld.length ).toFixed(2);
        }
    }
    else if(type == 'checkbox'){
        let arrayLength = options.length;
        dataNew = new Array(arrayLength);
        for (let x = 0; x < arrayLength ;x++){
            dataNew[x] = 0;
        }//全部置0
        for(let a = 0; a < dataOld.length; a++){
            for(let b = 0; b < dataOld[a].length; b++){
                dataNew[dataOld[a][b]]++;
            }
        }
    }
    else if(type == 'text'){
        dataNew = [0,0,0,0,0];//直接定死了，0-10个字，11-20个，21-50个，51-100个，101及以上
        for(let a = 0; a < dataOld.length; a++){
            let length = dataOld[a].length
            if(length <= 10){
                dataNew[0]++;
            }else if(length <= 20){
                dataNew[1]++;
            }else if(length <= 50){
                dataNew[2]++;
            }else if(length <= 100){
                dataNew[3]++;
            }else{
                dataNew[4]++;
            }
        }
    }
    return dataNew;
}

function newOption(data,options,type){
    let option = {
        toolbox:{
            feature: {
                magicType: {
                    type: ['line', 'bar']
                }
            }
        },
        tooltip:{},
        axisPointer:{
            show:true,
            type:"line",
            label:{

            }
        },
        xAxis: {
            type: 'category',
            data: options,
            name:'选项'
        },
        yAxis:{
            type:'value',
            name:'数量',
        },
        series:[{
            data:data,
            type:'bar'
        }]
    };
    switch (type){
        case 'radio':
            option.yAxis.name = '占比';
            break;
        case 'checkbox':
            break;
        case 'text':
            option.xAxis.data = ['0-10','11-20','21-50','51-100','> 101'];
            option.xAxis.name = '答案字数';
            option.yAxis.minInterval = 1;
            break;
    }
    return option
}