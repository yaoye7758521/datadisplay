$(function () {
    var rowNum = 3;
    var barNum = 8;
    var area = 'china';
    var dzoom = 1.2;
    var minNum = 0;
    var maxNum = 5000;
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
        //左侧小导航图标
        visualMap: {
            min: 0,
            max: 5000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: [
                    //'#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    //'#a50026'
                ]
            },
            show: false
        },
        //配置属性
        series: [{
            name: '数据',
            type: 'map',
            map: 'china',
            zoom: dzoom,
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
        }]
    }

    optionChart1 = {
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

    optionChart2 = {
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

    optionChart3 = {
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

    function randomData() {
        return Math.round(Math.random() * 50000);
    }

    function chinaToProvince(params) {
        area = params.name;
        minNum = 0;
        maxNum = 1000;
        dzoom = 0.8;
        updateChinaMap();
    }

    function provinceToChina(params) {
        area = 'china';
        minNum = 0;
        maxNum = 5000;
        dzoom = 1.2;
        updateChinaMap();
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
                    series:
                        [{
                            map: area,
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
    updateTable();
    updateChinaChart2();
    updateChinaChart3();

    setInterval(function () {
        updateChinaMap();
        updateTable();
        updateChinaChart2();
        updateChinaChart3();
    }, 2000);


})
