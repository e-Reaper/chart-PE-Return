var step = 0;
var player;
var category = [];
window.onload = function() {
    for (var i = 0; i < graphData.length; i++) {
        category.push(graphData[i].Date);
    }
	make_graph(category,[],[]);
    document.getElementById('report-time-span').setAttribute('max',graphData.length-61);
    document.getElementById('report-time-span').setAttribute('step',1);
    document.getElementById('report-time-span').setAttribute('value',0);
    document.getElementById('report-time-span').addEventListener('input',function(e) {
        var newStep = this.value;
        if (newStep > step) {
            if (newStep-step > 100) {
                e.stopPropogation();
            }
            for (var i = step; i <= newStep; i++) {
                animate();
                step++;
            }
            if (step+60 >= graphData.length-1)
                $('.controls .player').html('<i class="fa fa-play"></i><br>REPLAY');

        }else if (newStep == step) {
            //do nothing
        }else{
            for (var i = step-1 ; i >= newStep; i--) {
                $('#graph-2').highcharts().series[0].points[$('#graph-2').highcharts().series[0].data.length-1].remove(true);
                $('#graph-1').highcharts().series[0].points[$('#graph-1').highcharts().series[0].data.length-1].remove(true);
                step--;
                $('#return-value').val(graphData[step+60].f_year);
                $('#pe-value').val(graphData[step].PE);
            }            

        }
    });
}

function playGraph(e) {
    $('.controls .player').html('<i class="fa fa-play"></i><br>PLAY');
    if (step+60 >= graphData.length) {
        step = 0;
        make_graph(category,[],[]);
    }
    $('.controls .player').hide();
    $('.controls .pauser').show();
    player = setInterval(function() {
		var audio = new Audio('./sound/beep-'+ step%2 +'.mp3');
        audio.play();
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
    if (step+60>=graphData.length-1) {
        $('.controls .player').html('<i class="fa fa-play"></i><br>REPLAY');
        clearInterval(player);
        pauseGraph();
    }
    if (graphData[step+60]){
        $('#return-value').val(graphData[step+60].f_year);
        $('#graph-2').highcharts().series[0].addPoint([step,parseFloat(graphData[step+60].f_year)]);
    }
    if (graphData[step]){
        $('#pe-value').val(graphData[step].PE);
        $('#graph-1').highcharts().series[0].addPoint([step,graphData[step].PE]);
    }
    document.getElementById('report-time-span').value = step;
}


function make_graph(category,year_ret,pe_ret) {
	make_graph_1(category,year_ret);
	make_graph_2(category,pe_ret);
}

function make_graph_1(categoryX,data) {
    var x_Axis_cat = categoryX.slice(0,categoryX.length-60);
	$(function () {
    $('#graph-1').highcharts({
        chart: {
            type: 'column',
            animation: {
                duration: 1000
            }
        },
        title: {
            style: {
                fontSize: '25px'
            },
            text: 'PE'
        },
        xAxis: {
            min : 0,
            max : x_Axis_cat.length,
            categories: x_Axis_cat,
            crosshair: true
        },
        yAxis: {
            min: 10,
            max: 30,
            title: false
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
                animation: {
                    duration: 2000
                }
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

function make_graph_2(categoryX,ydata) {
    var x_Axis_cat = categoryX.slice(60,categoryX.length);
    $('#graph-2').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            style: {
                fontSize: '25px'
            },
            text: 'RETURN'
        },
        xAxis: {
            categories : x_Axis_cat,
            min : 0,
            max : x_Axis_cat.length
        },
        yAxis: {
        	min : -1,
            max : 45,
            title: false
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