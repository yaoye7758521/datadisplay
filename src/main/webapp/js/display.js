/**
 * Created by yaoye on 2018/8/20.
 */
$.get('/data/flights.json', function (data) {
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

            globeRadius: 70,
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


    var myChart1 = echarts.init(document.getElementById('chart1'));
    var myChart2 = echarts.init(document.getElementById('chart2'));
    var myChart3 = echarts.init(document.getElementById('chart3'));
    option1 = {
        title: {
            text: "发起攻击城市",
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
            data: ['北京', '上海', '深圳', '广州', '杭州', '成都', '香港']
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
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
    option2 = {
        title: {
            text: "受到攻击城市",
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

    option3 = {
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
    myChart1.setOption(option1)
    myChart2.setOption(option2)
    myChart3.setOption(option3)

    /*
        var i = 1
        setInterval(function () {

            data1 = [[[i, 40], [-i, -40]]]
            myChart.setOption({
                series: [{
                    type: 'lines3D',
                    data: data1
                }]
            });
            i += 5;
        }, 1000);
    */


});
