var step = 0;
var player;
var category = [];
window.onload = function() {
    for (var i = 0; i < graphData.length; i++) {
        category.push(graphData[i].Date);
    }
	make_graph(category,[],[]);
    document.getElementById('report-time-span').setAttribute('max',graphData.length-1);
    document.getElementById('report-time-span').setAttribute('step',1);
    document.getElementById('report-time-span').setAttribute('value',0);
    document.getElementById('report-time-span').addEventListener('input',function(e) {
        var newStep = this.value;
        if (newStep > step) {
            if (newStep-step > 20) {
                e.stopPropogation();
            }
            for (var i = step; i <= newStep; i++) {
                animate();
                step++;
            }
            if (step >= graphData.length-1)
                $('.controls .player').html('<i class="fa fa-play"></i><br>REPLAY');

        }else if (newStep == step) {
            //do nothing
        }else{
            // redraw
        }
    });
}

function playGraph(e) {
    $('.controls .player').html('<i class="fa fa-play"></i><br>PLAY');
    if (step == graphData.length) {
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
    },2000)
}

function pauseGraph(){
    $('.controls .pauser').hide();
    $('.controls .player').show();
    clearInterval(player);
}

function animate() {
    if (step>=graphData.length-1) {
        $('.controls .player').html('<i class="fa fa-play"></i><br>REPLAY');
        clearInterval(player);
    }
    $('#pe-value').val(graphData[step].PE);
    $('#return-value').val(graphData[step].f_year);
    $('#graph-2').highcharts().series[0].addPoint(parseFloat(graphData[step].f_year));
    $('#graph-1').highcharts().series[0].addPoint(graphData[step].PE);
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