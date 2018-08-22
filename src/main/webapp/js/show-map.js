//页面加载完成后加载
$(function() {

	var itemStyle = {
		normal: {},
		emphasis: {
			barBorderWidth: 1,
			shadowBlur: 10,
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowColor: 'rgba(0,0,0,0.5)'
		}
	};
	//地图所使用的series类
	function mapSeriesObj(columnName, mapData) {
		this.name = columnName;
		this.data = mapData;
		this.itemStyle = itemStyle,
			this.type = "map";
		this.mapType = "china";
		this.roam = true;
		this.zoom = 1.25;
		this.label = {
			normal: {
				show: true
			},
			emphasis: {
				show: true
			}
		}
	}

	//使图表自适应div大小
	function mapResize(myChartChina, myChartChinaBar) {
		setTimeout(function() {
			window.onresize = function() {
				echarts.getInstanceByDom(myChartChina.resize());
				echarts.getInstanceByDom(myChartChinaBar.resize());
			}
		}, 200)
	}

	//全局 参数
	//记录图例的编号 每次切换图例时更新该序号
	var columnIndexNum = 0;

	//绑定中国地图 切换图例事件
	function changeLegendAction(myChartChina, myChartChinaBar, columnData, mapSeriesArray, mapChinaBarY, mapChinaBarX) {
		myChartChina.on('legendselectchanged', function(params) {
			for(var i = 0; i < columnData.length; i++) {
				if(columnData[i].name == params.name) {
					columnIndexNum = i;
					break;
				}
			}
			myChartChina.setOption({
				visualMap: {
					max: mapSeriesArray[columnIndexNum].data[0].value,
				}
			});
			myChartChinaBar.setOption({
				title: {
					text: params.name
				},
				visualMap: {
					max: mapSeriesArray[columnIndexNum].data[0].value,
				},
				yAxis: {
					data: mapChinaBarY[columnIndexNum]
				},
				series: {
					data: mapChinaBarX[columnIndexNum]
				}
			});
		});
	}

	//由中国地图下钻到省地图
	function chinaToProvince(myChartChina, myChartChinaBar, columnData, mapSerieData) {
		myChartChina.on('click', chinaToProvinceCom);
		myChartChinaBar.on('click', chinaToProvinceCom);
		//由中国地图下钻到省地图 通用绑定方法
		function chinaToProvinceCom(params) {
			var columnName = columnData[columnIndexNum].column;
			var provinceURL = "/skpm/showchart/mapprovince";
			var areaId = "";
			for(var i = 0; i < mapSerieData.length; i++) {
				if(mapSerieData[i].name == params.name) {
					areaId = mapSerieData[i].id;
					break;
				}
			}
			homePageCountShow(areaId, params.name);
			$.get(provinceURL, {
				column: columnName,
				id: areaId
			}, function(dataProvince) {

				var provinceBarArea = new Array();
				var provinceBarNum = new Array();
				for(var i = 0; i < dataProvince.length; i++) {
					provinceBarArea[i] = dataProvince[i].name;
					provinceBarNum[i] = dataProvince[i].value;
				}

				var myChartProvince = showChinaMap("province");

				myChartProvince.setOption({
					title: {
						text: '' + params.name + '省统计',
					},
					legend: {
						data: [columnData[columnIndexNum].name]
					},
					visualMap: {
						min: 0,
						max: dataProvince[0].value,
						left: 'left',
						top: 'bottom',
						text: [
							'多',
							'少'
						],
						realtime: false,
						calculable: true,
						inRange: {
							color: [
								/*'#74add1',
								'#abd9e9',
								'#e0f3f8',
								'#ffffbf',
								'#fee090',
								'#fdae61',
								'#f46d43',
								'#d73027',
								'#a50026'*/
								'#4575b4',
								'#74add1',
								'#abd9e9',
								'#e0f3f8',
								'#ffffbf',
								'#fee090',
								'#fdae61',
								'#f46d43',
								'#d73027',
								'#a50026'
							]
						}
					},
					series: [{
						name: columnData[columnIndexNum].name,
						type: 'map',
						itemStyle: itemStyle,
						mapType: "" + params.name + "",
						roam: true,
						zoom: 1.10,
						label: {
							normal: {
								show: true
							},
							emphasis: {
								show: true
							}
						},
						data: dataProvince
					}]
				});
				myChartProvince.on('click', function(params) {
					homePageCountShow(params.data.id, params.name);
				})

				var myChartProvinceBar = showChinaMapBar("province");
				myChartProvinceBar.setOption({
					color: [params.color],
					title: {
						text: columnData[columnIndexNum].name
					},
					yAxis: {
						data: provinceBarArea
					},
					series: {
						data: provinceBarNum
					}
				})
				myChartProvinceBar.on('click', function(params) {
					var areaProvinceId = "";
					for(var i = 0; i < dataProvince.length; i++) {
						if(dataProvince[i].name == params.name) {
							areaProvinceId = dataProvince[i].id;
							break;
						}
					}
					homePageCountShow(areaProvinceId, params.name);
				})
			})

			$('#showChina').fadeOut(500);
			$('#showProvince').fadeIn(1000);
		}
	};

	//初始化中国地图 各省地图
	function showChinaMap(area) {
		if(area == "china") {
			var myChartMap = echarts.init(document.getElementById('showChinaMap'));
		}
		if(area == "province") {
			var myChartMap = echarts.init(document.getElementById('showProvinceMap'));
		}

		var optionChina = {
			title: {
				text: '',
				//subtext: '测试',
				left: 'center'
			},
			tooltip: {
				trigger: 'item'
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				selectedMode: 'single',
				data: []
			},
			toolbox: {
				show: true,
				orient: 'vertical',
				left: 'right',
				top: 'center',
				feature: {
					dataView: {
						readOnly: false
					},
					restore: {},
					saveAsImage: {}
				}
			},
			series: []
		};

		myChartMap.setOption(optionChina);

		return myChartMap;
	}

	//初始化中国地图条形图 各省条形图
	function showChinaMapBar(area) {

		if(area == "china") {
			var myChartBar = echarts.init(document.getElementById('showChinaMapBar'));
		}
		if(area == "province") {
			var myChartBar = echarts.init(document.getElementById('showProvinceMapBar'));
		}
		var itemStyle = {
			normal: {},
			emphasis: {
				barBorderWidth: 1,
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				shadowColor: 'rgba(0,0,0,0.5)'
			}
		};
		var optionChinaBar = {

			title: {
				text: "",
				//subtext: '测试',
				left: 'center'
			},
			tooltip: {
				trigger: 'item'
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				left: 'right',
				top: 'center',
				orient: 'vertical',
				show: true,
				feature: {
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: [
							'line',
							'bar'
						]
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			xAxis: {
				type: 'value',
			},
			yAxis: {
				//axisLabel:{'interval':0,'rotate':10},
				//offset: -100,
				inverse: true,
				type: 'category',
				data: []
			},
			series: {
				type: 'bar',
				itemStyle: itemStyle,
				data: [],
				/*markLine: {
					data: [{
						type: 'average',
						name: '平均值',
						
					}]
				}*/
			}
		}
		myChartBar.setOption(optionChinaBar);

		return myChartBar;
	}

	//更新中国地图 和 中国地图条形图
	function updateChinaMapAndBar(myChartChina, myChartChinaBar) {

		myChartChina.showLoading();
		myChartChinaBar.showLoading();

		var nameColumn = "/json/name-column.json";
		$.get(nameColumn, {}, function(columnData) {

			var mapXData = new Array();
			var mapSeriesArray = new Array();

			var mapChinaBarY = new Array();
			var mapChinaBarX = new Array();

			var mapChinaColumnUrl = "/skpm/showchart/map";
			for(var i = 0; i < columnData.length; i++) {
				mapXData[i] = columnData[i].name;
				mapChinaBarY[i] = new Array();
				mapChinaBarX[i] = new Array();
				var mapSeries = new mapSeriesObj();
				mapSeries.name = columnData[i].name;

				$.ajax({
					type: "get",
					url: mapChinaColumnUrl,
					data: {
						column: columnData[i].column
					},
					async: false,
					success: function(mapData) {
						mapSeries.data = mapData;
						for(var j = 0; j < mapData.length; j++) {
							mapChinaBarY[i][j] = mapData[j].name;
							mapChinaBarX[i][j] = mapData[j].value;
						}
					}
				});
				mapSeriesArray.push(mapSeries);
			};
			myChartChina.setOption({
				title: {
					text: '全国统计',
				},
				legend: {
					data: mapXData
				},
				visualMap: {
					min: 0,
					max: mapSeriesArray[0].data[0].value,
					left: 'left',
					top: 'bottom',
					text: [
						'多',
						'少'
					],
					realtime: false,
					calculable: true,
					inRange: {
						color: [
							'#4575b4',
							'#74add1',
							'#abd9e9',
							'#e0f3f8',
							'#ffffbf',
							'#fee090',
							'#fdae61',
							'#f46d43',
							'#d73027',
							'#a50026'

							/*'#24aa1d',
							'#42dd3f',
							'#bef663',
							'#f6ed44',
							'#f69833',
							'#ff614b',
							'#e61610'*/
						]
					}
				},
				series: mapSeriesArray
			});
			myChartChina.hideLoading();

			myChartChinaBar.setOption({
				visualMap: {
					type: 'continuous',
					dimension: 0,
					show: false,
					min: 0,
					max: mapSeriesArray[0].data[0].value,
					inRange: {
						color: [
							/*'#74add1',
							'#abd9e9',
							'#e0f3f8',
							'#ffffbf',
							'#fee090',
							'#fdae61',
							'#f46d43',
							'#d73027',
							'#a50026'*/
							'#4575b4',
							'#74add1',
							'#abd9e9',
							'#e0f3f8',
							'#ffffbf',
							'#fee090',
							'#fdae61',
							'#f46d43',
							'#d73027',
							'#a50026'
						],
					},
				},
				title: {
					text: '参与学校数'
				},
				yAxis: {
					data: mapChinaBarY[0]
				},
				series: {
					data: mapChinaBarX[0]
				}
			})
			myChartChinaBar.hideLoading();

			changeLegendAction(myChartChina, myChartChinaBar, columnData, mapSeriesArray, mapChinaBarY, mapChinaBarX);
			chinaToProvince(myChartChina, myChartChinaBar, columnData, mapSeriesArray[0].data);
		});
	}

	var myChartChina = showChinaMap("china");
	var myChartChinaBar = showChinaMapBar("china");
	updateChinaMapAndBar(myChartChina, myChartChinaBar);
	mapResize(myChartChina, myChartChinaBar);
	$('#mapButton').on("click", function() {
		$('#showProvince').fadeOut(500);
		$('#showChina').fadeIn(1000);
		homePageCountShow("1", "");
	})
})