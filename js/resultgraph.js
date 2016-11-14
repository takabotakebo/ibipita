console.log("start")
var graphXCategory = [],graphWSteps = [],graphTCal = [];

for (var i = 0; i < results.length; i++) {
  graphXCategory.push("2016090"+i);
}

DrawGraph(graphXCategory,graphWSteps,graphTCal);

//function drawGraph(xCategory, wSteps, tCal) {
  $('div#graph').highcharts({
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: 'いびき率といびき数'
    },
    xAxis: [{
      categories: xCategory,
      crosshair: true
    }],


    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}%',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },

      title: {
        text: 'いびき率',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      }
    }, { // Secondary yAxis
      title: {
        text: 'いびき数',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      labels: {
        format: '{value} 回',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 120,
      verticalAlign: 'top',
      y: 100,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
      name: 'いびき数',
      type: 'column',
      yAxis: 1,
      data: wSteps,
      tooltip: {
        valueSuffix: ' 回'
      }

    }, {
      name: 'いびき率',
      type: 'spline',
      data: tCal,
      tooltip: {
        valueSuffix: ' %'
      }
    }]
  });
}
