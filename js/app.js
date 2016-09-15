var step = 0;
var player;
window.onload = function() {
	animate();
    document.getElementById('report-time-span').setAttribute('max',graphData.length);
    document.getElementById('report-time-span').addEventListener('change',function() {
        step = this.value;
        animate();
    });
}

function playGraph(e) {
    $('.controls .player').hide();
    $('.controls .pauser').show();
    player = setInterval(function(argument) {
		animate();
	    step++;
    },1000)
}

function pauseGraph(){
    $('.controls .pauser').hide();
    $('.controls .player').show();
    clearInterval(player);
}

function animate() {
    if (step==graphData.length) {
        clearInterval(player);
    }
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
    document.getElementById('report-time-span').value = step;
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
            min : 0,
            max : graphData.length,
            categories: category,
            crosshair: true
        },
        yAxis: {
            min: 10,
            max: 30,
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
        exporting: { 
            enabled: false 
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
            categories : category,
            min : 0,
            max : graphData.length
        },
        yAxis: {
        	min : -1,
            max : 45,
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
        exporting: { 
            enabled: false 
        },
        series: [{
            type: 'area',
            name: 'Return',
            data: ydata
        }]
    });
}