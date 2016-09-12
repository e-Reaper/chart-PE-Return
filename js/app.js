var step = 0;
var player;
window.onload = function() {
	animate();
}

function playGraph() {
	player = setInterval(function(argument) {
		animate();
	},1000)
}

function animate() {
	var data_category = [];
	var data_pe_return = [];
	var data_5_year = [];
	for(i=0;i<graphData.length;i++){
		data_category.push(graphData[i].Date);
		if (i>step) {
			break;
		}else{
			data_pe_return.push(parseFloat(graphData[i].PE));
			data_5_year.push(parseFloat(graphData[i].f_year));
		}
	}
	make_graph(data_category,data_5_year,data_pe_return);
	step++;
	if (step==graphData.length) {
		clearInterval(player);
	}
}


function make_graph(category,year_ret,pe_ret) {
	make_graph_1(category,year_ret);
	make_graph_2(category,pe_ret);
}

function make_graph_1(category,data) {
	$(function () {
    $('#graph-1').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'PE'
        },
        xAxis: {
            categories: category,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'PE'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
            series: {
                animation: false
            }
        },
        series: [{
            name: 'PE',
            data: data
        }]
    });
});
}

function make_graph_2(category,ydata) {
    $('#graph-2').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'RETURN'
        },
        xAxis: {
            categories : category
        },
        yAxis: {
        	min : 0,
            title: {
                text: 'Return'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            },
            series: {
                animation: false
            }
        },

        series: [{
            type: 'area',
            name: 'Return',
            data: ydata
        }]
    });
}