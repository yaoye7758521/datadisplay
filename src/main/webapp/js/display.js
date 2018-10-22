/**
 * Created by yaoye on 2018/8/20.
 */
$.get('/data/flights.json', function (data) {
    var rowNum = 3;
    var barNum = 10;
    var myChart1 = echarts.init(document.getElementById('chart1'));
    var myChart2 = echarts.init(document.getElementById('chart2'));
    var myChart3 = echarts.init(document.getElementById('chart3'));
    var a = window.innerWidth;
    var b = window.innerHeight;
    document.getElementById("earth").style.width = a + "px";
    document.getElementById("earth").style.height = b + "px";
    var myChart = echarts.init(document.getElementById('earth'));
    var airports = data.airports.map(function (item) {
        return {
            coord: [item[3], item[4]]
        }
    });

    function getAirportCoord(idx) {
        return [data.airports[idx][3], data.airports[idx][4]];
    }

    // Route: [airlineIndex, sourceAirportIndex, destinationAirportIndex]
    var routesGroupByAirline = {};
    data.routes.forEach(function (route) {
        var airline = data.airlines[route[0]];
        var airlineName = airline[0];
        if (!routesGroupByAirline[airlineName]) {
            routesGroupByAirline[airlineName] = [];
        }
        routesGroupByAirline[airlineName].push(route);
    });

    var pointsData = [];
    data.routes.forEach(function (airline) {
        pointsData.push(getAirportCoord(airline[1]));
        pointsData.push(getAirportCoord(airline[2]));
    });

    var series = data.airlines.map(function (airline) {
        var airlineName = airline[0];
        var routes = routesGroupByAirline[airlineName];
        if (!routes) {
            return null;
        }
        return {
            type: 'lines3D',
            name: airlineName,

            effect: {
                show: true,
                trailWidth: 1,
                trailLength: 0.2,
                trailOpacity: 4,
                trailColor: 'rgb(30, 30, 60)'
            },

            lineStyle: {
                width: 1,
                color: 'rgb(50, 50, 150)',
                //color: 'rgb(118, 233, 241)',
                opacity: 0
            },
            blendMode: 'lighter',

            /*data: [[[0, -40], [0, 40]]]*/
            data: routes.map(function (item) {
                return [airports[item[1]].coord, airports[item[2]].coord];
            })
        };
    }).filter(function (series) {
        return !!series;
    });
    series.push({
        type: 'scatter3D',
        coordinateSystem: 'globe',
        blendMode: 'lighter',
        symbolSize: 1.8,
        itemStyle: {
            color: 'rgb(200, 50, 80)',
            opacity: 4
        },
        data: pointsData
    });

    myChart.setOption({
        /*legend: {
         selectedMode: 'single',
         left: 'left',
         data: Object.keys(routesGroupByAirline),
         orient: 'vertical',
         textStyle: {
         color: '#fff'
         }
         },*/
        globe: {

            globeRadius: 68,
            environment: '/data/starfield.jpg',
            baseTexture: '/data/world.topo.bathy.200401.jpg',
            heightTexture: '/data/bathymetry_bw_composite_4k.jpg',

            displacementScale: 0.02,
            displacementQuality: 'high',
            shading: 'realistic',
            realisticMaterial: {
                roughness: 0.2,
                metalness: 0.2
            },

            postEffect: {
                enable: true,
            },
            temporalSuperSampling: {
                enable: true
            },
            light: {
                ambient: {
                    intensity: 1
                },
                main: {
                    intensity: 0.1,
                    shadow: true
                },
                ambientCubemap: {
                    texture: '/data/lake.hdr',
                    exposure: 1,
                    diffuseIntensity: 0.5,
                    specularIntensity: 2
                }
            },
            viewControl: {
                autoRotate: true
            },
            silent: true
        },
        series: series
    });
    window.addEventListener('keydown', function () {
        series.forEach(function (series, idx) {
            myChart.dispatchAction({
                type: 'lines3DToggleEffect',
                seriesIndex: idx
            });
        })
    });

    option1 = {
        title: {
            text: "我国受到攻击的次数",
            left: 'center',
            textStyle: {
                color: 'rgba(200,200,200,0.8)',
            },
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.8)',
                    width: 2
                }
            },
            splitLine: {show: false}
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval: 0,
                rotate: 0,
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.8)',
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
                    position: 'top',
                    color: 'rgba(220,220,220,0.8)'
                }
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'rgba(255,50,50,0.7)'},
                            {offset: 0.5, color: 'rgba(255,50,100,0.5)'},
                            {offset: 1, color: 'rgba(255,50,150,0.1)'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
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
    option2 = {
        title: {
            text: "对我国进行攻击的次数",
            left: 'center',
            textStyle: {
                color: 'rgba(200,200,200,0.8)',
            },
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.8)',
                    width: 2
                }
            },
            splitLine: {show: false}
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval: 'auto',
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
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    color: 'rgba(220,220,220,0.8)'
                }
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'rgba(80,141,255,0.7)'},
                            {offset: 0.5, color: 'rgba(56,155,255,0.5)'},
                            {offset: 1, color: 'rgba(38,197,254,0.1)'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
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

    option3 = {
        title: {
            text: "活跃木马病毒的数量",
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


 /*   function getArrayItems(arr, num) {
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
    }*/

    function getArrayItems(arr, num) {
        var temp_array = [];
        var return_array = [];
        for (var i in arr) {
            temp_array.push(arr[i])
        }
        for (var j in temp_array) {
            if (arr[j].name = '湖北') {
                arr[j].weight = Math.floor(Math.random() * 10) * 2
            } else {
                arr[j].weight = Math.floor(Math.random() * 10)
            }
        }
        bubbleSort(temp_array);
        for (var k = 0; k < num; k++) {
            return_array.push(temp_array[k])
        }
        return return_array;
    }

    function bubbleSort(arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j].weight < arr[j + 1].weight) { //相邻元素两两对比
                    var temp = arr[j + 1]; //元素交换
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
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

    function updatechart1() {
        var dataUrl = '/display/map/china';
        $.ajax({
            type: "get",
            url: dataUrl,
            async: true,
            success: function (cdata) {
                var data1 = getArrayItems(cdata, barNum);
                myChart1.setOption({
                    xAxis: {data: getNameArray(data1)},
                    series: [{
                        data: getValueArray(data1)
                    }]
                });
            }
        });
    }

    function updatechart2() {
        $.ajax({
            type: "get",
            url: '/display/map/chart2?barNum=' + barNum,
            async: true,
            success: function (cdata) {
                myChart2.setOption({
                    xAxis: {data: getNameArray(cdata)},
                    series: [{
                        data: getValueArray(cdata)
                    }]
                });
            }
        });
    }

    function updatechart3() {
        $.ajax({
            type: "get",
            url: '/display/map/chart3?barNum=' + barNum,
            async: true,
            success: function (cdata) {
                myChart3.setOption({
                    yAxis: {data: getNameArray(cdata)},
                    series: [{
                        data: getValueArray(cdata)
                    }]
                });
            }
        });
    }


    function inimap() {
        myChart1.setOption(option1);
        myChart2.setOption(option2);
        myChart3.setOption(option3);
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

    inimap();
    updateTable();
    updatechart1();
    updatechart2();
    updatechart3();

    setInterval(function () {
        updateTable();
        updatechart1();
        updatechart2();
        updatechart3();
    }, 6000);


});
