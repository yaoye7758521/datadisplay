$(function () {
    setTimeout("pause()", 1000);
    var maxScaNum = 50;
    var minScaNum = 30;
    var rowNum = 3;
    var barNum = 8;
    var area = 'china';
    var dzoom = 1.2;
    var minNum = 0;
    var maxNum = 5000;
    var scatterMax = 2000;
    var updateFlag = 0;
    var linesData = [];
    var chinaMap = echarts.init(document.getElementById('china'));
    var chinaChart1 = echarts.init(document.getElementById('chart1'));
    var chinaChart2 = echarts.init(document.getElementById('chart2'));
    var chinaChart3 = echarts.init(document.getElementById('chart3'));

    var optionMap = {
        backgroundColor: '#1C1C1C',
        title: {
            text: '全国地图大数据',
            left: 'center',
            textStyle: {
                color: 'rgba(200,200,200,0.8)'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: [{
            min: minNum,
            max: maxNum,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            seriesIndex: 0,
            inRange: {
                color: [
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    /*'#e0f3f8',
                     '#ffffbf',
                     '#fee090',
                     '#fdae61',
                     '#f46d43',
                     '#d73027',
                     '#a50026'*/
                    /*'rgba(100, 100, 120, 0.8)',
                     'rgba(208, 208, 228, 0.8)'*/
                ]
            },
            show: false
        }],
        geo: {
            map: area,
            zoom: dzoom,
            label: {
                emphasis: {
                    show: true
                }
            },
            roam: false,

        },
        series: [
            {
                id: 'map',
                name: '地区',
                type: 'map',
                //map: area,
                //zoom: dzoom,
                geoIndex: 0,
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: []
            },
            {
                id: 'effectScatter',
                name: '被攻击',
                type: 'effectScatter',
                symbol: 'circle',
                showEffectOn: 'render',
                coordinateSystem: 'geo',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                symbolSize: function (val) {
                    return val[2] / 200;
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255, 0, 0, 0.8)',
                        opacity: 0.5,
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                zlevel: 1,
                data: []
            },
            {
                id: 'lines',
                name: '攻击路径',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 2,
                    trailLength: 0.3,
                    color: ['#9933CC'],
                    symbol: ['circle', 'none'],
                    symbolSize: 2
                },
                lineStyle: {
                    normal: {
                        color: '#0099CC',
                        type: 'dashed',
                        width: 0,
                        curveness: 0.3,
                        opacity: 1
                    }
                },
                data: []
            },
        ]
    }

    var optionChart1 = {
        title: {
            text: "我国受到攻击的次数",
            left: 'center',
            textStyle: {
                color: 'rgba(200,200,200,0.8)'
            }
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
                rotate: 0
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
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    color: 'rgba(220,220,220,0.8)'
                }
            },
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
            }
        }]
    };

    var optionChart2 = {
        title: {
            text: "对我国进行攻击的次数",
            left: 'center',
            textStyle: {
                color: 'rgba(200,200,200,0.8)'
            }
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
                rotate: 0
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
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    color: 'rgba(220,220,220,0.8)'
                }
            },
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

    var optionChart3 = {
        title: {
            text: "活跃木马病毒的数量",
            left: 'center',
            textStyle: {
                color: 'rgba(200,200,200,0.8)'
            }
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
                rotate: 0
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
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    color: 'rgba(220,220,220,0.8)'
                }
            },
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

    function chinaToProvince(params) {
        area = params.name;
        minNum = 0;
        maxNum = 1000;
        dzoom = 0.8;
        updateFlag = 0;
        updateChinaMap();
        updateLines();
    }

    function provinceToChina(params) {
        area = 'china';
        minNum = 0;
        maxNum = 5000;
        dzoom = 1.2;
        updateFlag = 0;
        updateChinaMap();
        updateLines();
    }

    function changeMap(params) {
        if (area === 'china') {
            chinaToProvince(params);
        } else {
            provinceToChina(params);
        }
    }

    function iniChina() {
        chinaMap.setOption(optionMap);
        chinaMap.on('click', changeMap);
        chinaChart1.setOption(optionChart1);
        chinaChart2.setOption(optionChart2);
        chinaChart3.setOption(optionChart3);
    }

    function getArrayItems(arr, num) {
        var temp_array = [];
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = [];
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
        var valueArray = [];
        for (var i = 0; i < sdata.length; i++) {
            valueArray.push(sdata[i].value)
        }
        return valueArray;
    }

    function getNameArray(sdata) {
        var nameArray = [];
        for (var i = 0; i < sdata.length; i++) {
            nameArray.push(sdata[i].name)
        }
        return nameArray;
    }

    function getScatterData(data) {
        var scatterArray = [];
        for (var i = 0; i < data.length; i++) {
            var Obj = {}
            scatterArray.push({
                name: data[i].name,
                value: [data[i].lng, data[i].lat, data[i].value]
            });
        }
        return scatterArray;
    }

    function getLinesData(data) {
        var gdaga = [];
        for (i = 0; i < data.length * 2; i++) {
            var coped = getArrayItems(data, 2)
            gdaga.push({
                fromName: coped[0].name,
                toName: coped[1].name,
                coords: [[coped[0].lng, coped[0].lat], [coped[1].lng, coped[1].lat]]
            })
        }
        return gdaga;
    }

    function updateChinaMap() {
        var dataUrl;
        if (area === 'china') {
            dataUrl = '/display/map/china';
        } else {
            dataUrl = '/display/map/province?area=' + encodeURI(encodeURI(area));
        }
        $.ajax({
            type: "get",
            url: dataUrl,
            async: true,
            success: function (cdata) {
                var data1 = getArrayItems(cdata, barNum);
                chinaMap.setOption({
                    visualMap: {
                        min: minNum,
                        max: maxNum
                    },
                    geo: {
                        map: area,
                    },
                    series: [{
                        //map: area,
                        id: 'map',
                        zoom: dzoom,
                        data: cdata
                    }]
                });
                chinaChart1.setOption({
                    yAxis: {data: getNameArray(data1)},
                    series: [{
                        data: getValueArray(data1)
                    }]
                });
            }
        });
    }

    function updateLines() {
        var dataUrl;
        if (area === 'china') {
            if (updateFlag === 0) {
                dataUrl = '/display/map/scatterChina?maxScaNum=' + maxScaNum + '&minScaNum=' + minScaNum;
            } else {
                dataUrl = '/display/map/scatterChina?maxScaNum=' + 5 + '&minScaNum=' + 4;
            }
        } else {
            dataUrl = '/display/map/scatterProvince?province=' + encodeURI(encodeURI(area));
        }
        $.ajax({
            type: "get",
            url: dataUrl,
            async: true,
            success: function (ldata) {
                if (updateFlag === 0) {
                    linesData = ldata;
                } else {
                    var cdata = getArrayItems(ldata, 4)
                    for (var i = 0; i < 4; i++) {
                        linesData.shift();
                        linesData.push(cdata[i])
                    }
                }
                chinaMap.setOption({
                    series: [
                        {
                            id: 'effectScatter',
                            data: getScatterData(linesData)
                        },
                        {
                            id: 'lines',
                            data: getLinesData(linesData)
                        }
                    ]
                });
            }
        });
    }

    function updateChinaChart1() {
        var dataUrl = '/display/map/china';
        $.ajax({
            type: "get",
            url: dataUrl,
            async: true,
            success: function (cdata) {
                var data1 = getArrayItems(cdata, barNum);
                chinaChart1.setOption({
                    yAxis: {data: getNameArray(data1)},
                    series: [{
                        data: getValueArray(data1)
                    }]
                });
            }
        });
    }

    function updateChinaChart2() {
        $.ajax({
            type: "get",
            url: '/display/map/chart2?barNum=' + barNum,
            async: true,
            success: function (cdata) {
                chinaChart2.setOption({
                    yAxis: {data: getNameArray(cdata)},
                    series: [{
                        data: getValueArray(cdata)
                    }]
                });
            }
        });
    }

    function updateChinaChart3() {
        $.ajax({
            type: "get",
            url: '/display/map/chart3?barNum=' + barNum,
            async: true,
            success: function (cdata) {
                chinaChart3.setOption({
                    yAxis: {data: getNameArray(cdata)},
                    series: [{
                        data: getValueArray(cdata)
                    }]
                });
            }
        });
    }

    function updateTable() {
        $("#cityTable").empty();
        var dataUrl = '/display/map/city?rowNum=' + rowNum;
        $.ajax({
            type: "get",
            url: dataUrl,
            async: true,
            success: function (cdata) {
                $('#cityTable').append('<tr><th>时间</th><th>源IP</th><th>源地址</th>' +
                    '<th>目标IP</th><th>目标地址</th><th>攻击类型</th></tr>')
                for (var i = 0; i < cdata.length; i++) {
                    $('#cityTable').append('<tr><th>' + cdata[i].date + '</th><th>' +
                        cdata[i].srcIP + '</th><th>' + cdata[i].srcAdd + '</th>' +
                        '<th>' + cdata[i].disIP + '</th><th>' + cdata[i].disAdd +
                        '</th><th>' + cdata[i].type + '</th></tr>')
                }
            }
        });

    }

    adaptScreen();
    iniChina();
    updateChinaMap();
    updateLines();
    updateTable();
    updateChinaChart2();
    updateChinaChart3();

    setInterval(function () {
        //updateFlag = 1;
        //updateChinaMap();
        //updateLines();
        updateTable();
        updateChinaChart1();
        updateChinaChart2();
        updateChinaChart3();
    }, 6000);
    setInterval(function () {
        updateFlag = 1;
        //updateChinaMap();
        updateLines();
        //updateTable();
        //updateChinaChart2();
        //updateChinaChart3();
    }, 60000);


})
