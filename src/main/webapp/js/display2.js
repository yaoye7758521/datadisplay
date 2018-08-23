$(function () {
    var chinaMap = echarts.init(document.getElementById('china'));
    var chinaChart1 = echarts.init(document.getElementById('chart1'));
    var chinaChart2 = echarts.init(document.getElementById('chart2'));
    var chinaChart3 = echarts.init(document.getElementById('chart3'));

    var optionMap = {
        backgroundColor: '#1C1C1C',
        title: {
            text: '全国地图大数据',
            subtext: '',
            x: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        //左侧小导航图标
        visualMap: {
            min: 0,
            max: 5000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026']
            },
            show: false
        },
        //配置属性
        series: [{
            name: '数据',
            type: 'map',
            map: 'china',
            zoom: 1.2,
            roam: true,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: true
                },
            },
            data: []
        }]
    }

    optionChart1 = {
        title: {
            text: "木马病毒数量",
            left: 'center',
            textStyle: {
                color: 'rgba(200,200,200,0.8)',
            },
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        xAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.8)',
                    width: 2
                }
            },
            splitLine: {show: false}
        },
        yAxis: {
            type: 'category',
            axisLabel: {
                interval: 0,
                rotate: 0,
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.8)',
                    width: 2
                }
            },
            data: []
        },
        series: [{
            data: [],
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: 'rgba(255,50,50,0.7)'},
                            {offset: 0.5, color: 'rgba(255,50,100,0.5)'},
                            {offset: 1, color: 'rgba(255,50,150,0.1)'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: 'rgba(255,150,150,0.8)'},
                            {offset: 0.7, color: 'rgba(255,100,100,0.8)'},
                            {offset: 1, color: 'rgba(255,50,50,0.8)'}
                        ]
                    )
                }
            },
        }]
    };

    optionChart2 = {
        title: {
            text: "木马病毒数量",
            left: 'center',
            textStyle: {
                color: 'rgba(200,200,200,0.8)',
            },
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        xAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.8)',
                    width: 2
                }
            },
            splitLine: {show: false}
        },
        yAxis: {
            type: 'category',
            axisLabel: {
                interval: 0,
                rotate: 0,
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.8)',
                    width: 2
                }
            },
            data: ['北京', '上海', '深圳', '广州', '杭州', '成都', '香港']
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: 'rgba(80,141,255,0.7)'},
                            {offset: 0.5, color: 'rgba(56,155,255,0.5)'},
                            {offset: 1, color: 'rgba(38,197,254,0.1)'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
        }]
    };

    optionChart3 = {
        title: {
            text: "木马病毒数量",
            left: 'center',
            textStyle: {
                color: 'rgba(200,200,200,0.8)',
            },
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        xAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.8)',
                    width: 2
                }
            },
            splitLine: {show: false}
        },
        yAxis: {
            type: 'category',
            axisLabel: {
                interval: 0,
                rotate: 0,
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.8)',
                    width: 2
                }
            },
            data: ['北京', '上海', '深圳', '广州', '杭州', '成都', '香港']
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: 'rgba(50,255,50,0.7)'},
                            {offset: 0.5, color: 'rgba(50,255,100,0.5)'},
                            {offset: 1, color: 'rgba(50,255,150,0.1)'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        1, 0, 0, 0,
                        [
                            {offset: 0, color: 'rgba(50,255,50,0.8)'},
                            {offset: 0.7, color: 'rgba(50,255,100,0.8)'},
                            {offset: 1, color: 'rgba(50,255,150,0.8)'}
                        ]
                    )
                }
            },
        }]
    };

    function adaptScreen() {
        var a = window.innerWidth;
        var b = window.innerHeight;
        window.document.getElementById("background").style.width = a + "px";
        document.getElementById("background").style.height = b + "px";
    }

    function randomData() {
        return Math.round(Math.random() * 50000);
    }

    function iniChina() {
        chinaMap.setOption(optionMap);
        chinaChart1.setOption(optionChart1);
        chinaChart2.setOption(optionChart2);
        chinaChart3.setOption(optionChart3);
    }

    function getArrayItems(arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i < num; i++) {
            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {
                break;
            }
        }
        return return_array;
    }

    function getValueArray(sdata) {
        var valueArray = new Array;
        for (var i = 0; i < sdata.length; i++) {
            valueArray.push(sdata[i].value)
        }
        return valueArray;
    }

    function getNameArray(sdata) {
        var nameArray = new Array;
        for (var i = 0; i < sdata.length; i++) {
            nameArray.push(sdata[i].name)
        }
        return nameArray;
    }

    function updateChinaMap() {
        $.ajax({
            type: "get",
            url: "/display/map/china",
            async: true,
            success: function (cdata) {
                var data1 = getArrayItems(cdata, 8)
                var data2 = getArrayItems(cdata, 8)
                var data3 = getArrayItems(cdata, 8)
                chinaMap.setOption({
                    series: [{
                        data: cdata
                    }]
                });
                chinaChart1.setOption({
                    yAxis: {data: getNameArray(data1)},
                    series: [{
                        data: getValueArray(data1)
                    }]
                });
                chinaChart2.setOption({
                    yAxis: {data: getNameArray(data2)},
                    series: [{
                        data: getValueArray(data2)
                    }]
                });
                chinaChart3.setOption({
                    yAxis: {data: getNameArray(data3)},
                    series: [{
                        data: getValueArray(data3)
                    }]
                });
            }
        });
    }

    function initable() {
        $('#table1').DataTable({
            "ordering": false,
            "paging": false,
            "searching": false,
            "ajax": "...............",
            "columns": [
                {"data": "时间"},
                {"srcIP": "源IP"},
                {"srcLoc": "源地址"},
                {"disIP": "目的IP"},
                {"disLoc": "目的地址"},
                {"type": "攻击类型"}
            ]
        });
    }

    adaptScreen();
    iniChina();
    updateChinaMap();
    setInterval(function () {
        updateChinaMap();
    }, 2000);
    //initable();


})
