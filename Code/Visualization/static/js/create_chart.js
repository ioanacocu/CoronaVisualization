var colors = Highcharts.getOptions().colors;
months=['jan', 'feb', 'mrt', 'apr','may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']
mapChart=[];
isfirstCall=true;
completeSeries=[]
completePlotlines=[]
Cyear=2020
Pyear=2019

function createCharts(categories, series, mes4countries, timeSeries){
    s = [];
    len = series.length;
    i = 0;
    cats=categories.length;
    j=0;
    today=new Date();
    cDay=today.getDate()
    cMonth=today.getMonth()
    cYear=today.getFullYear()
    todayUTC=Date.UTC(cYear,cMonth,cDay)
    sTime=[]
    plotLines=[]
    plotBands=[]
for(i;i<len;i++){
    sDataM=[]
    j=0;
    for (j;j<cats;j++){
        if(mes4countries[i][j][0].length>2){
        txtDate=mes4countries[i][j][0];
        yearDate=0;
        monthDate=-1;
        if(!txtDate.includes(Cyear)&&!txtDate.includes(Pyear)) {
            yearDate=Cyear;
        }
        m=0;
        for (m;m<12;m++){
            if (txtDate.includes(months[m])){
                    monthDate=m
            }
         }
         try{
         var numbers = txtDate.match(/\d+/g).map(Number);
         date=''
         if(yearDate!=0 && monthDate!=-1){
            dayDate=numbers[0];
            date=new Date(yearDate,monthDate,dayDate)}
         else {dateSplit=txtDate.split("-")
              yearDate=dateSplit[2];
              monthDate=dateSplit[1]-1;
              dayDate=dateSplit[0];}
        if(yearDate>2019){
        sDataM.push({
            x: Date.UTC(yearDate, monthDate, dayDate),//mes4countries[i][j]
            x2:todayUTC,
            showInLegend: true,
            color:colors[i],
            //x:mes4countries[i][j],
            y:j})
        }
        plotLines.push({
        color:colors[i],
        width: 2,
        code:series[i],
        value: Date.UTC(yearDate, monthDate, dayDate),//mes4countries[i][j]
        label: {
                text: categories[j]+", "+series[i], // Content of the label.
                align: 'left', // Positioning of the label.
                color:colors[i]

  }
    })}

        catch{}}
        }
    s.push({
        name: series[i],
        data:sDataM
    });
}
i=0
uniquets=[]
for(i;i<len;i++){
    if(timeSeries[series[i][1]]!='undefined' && !uniquets.includes(series[i][1])){
        sData=[]
        uniquets.push(series[i][1]);
        try{
        c=Object.keys(timeSeries[series[i][1]])[0]
        if(timeSeries[series[i][1]][c]!='undefined'){
        for (var year in timeSeries[series[i][1]][c]){

            for (var month in timeSeries[series[i][1]][c][year]){
                for (var day in timeSeries[series[i][1]][c][year][month])
                {
                sData.push([
                    Date.UTC(year, month-1, day),//mes4countries[i][j]
                    Number(timeSeries[series[i][1]][c][year][month][day][0])])
                }}

        }}
        if(sData.length>0){
        sTime.push({
        name: c,
        code:series[i][1],
        color:colors[i],
        data:sData
    })};}
        catch{}}
        }



Highcharts.chart('container2', {
    chart: {
        type: 'xrange',
        styledMode: true
    },
    title: {
        text: 'Measures taken by countries against COVID 19'
    },
    accessibility: {
        point: {
            descriptionFormatter: function (point) {
                var ix = point.index + 1,
                    category = point.yCategory,
                    from = new Date(point.x),
                    to = new Date(point.x2);
                return ix + '. ' + category + ', ' + from.toDateString() +
                    ' to ' + to.toDateString() + '.';
            }
        }
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: ''
        },
        categories: categories,
        reversed: true
    },
    series:s,
    responsive: {
        rules: [{
            condition: {
                maxWidth: 550
            },
            chartOptions: {
                legend: {
                    itemWidth: 150
                }

                }
        }]

}}
);

Highcharts.chart('container3', {
    chart: {
        type: 'line',
        styledMode: true
    },
    title: {
        text: 'Evolution of the number of cases/country'
    },
    accessibility: {

    },
    xAxis: {
        type: 'datetime',
        plotLines:plotLines
    },
    yAxis: {
        title: {
            text: ''

        },
        plotLines:plotLines


    },
    series:sTime,
    responsive: {
        rules: [{
            condition: {
                maxWidth: 550
            },
            chartOptions: {
                legend: {
                    itemWidth: 150
                }

                }
        }]

}}
);
if(isfirstCall){
completeSeries=sTime;
completePlotlines=plotLines
isfirstCall=false;
drawMap()
}
}

function drawMap(){



           var countries = {},
            mapChart,
            countryChart,

        d=completeSeries
        completeSeries.forEach(function(line){
            countries[line["code"]] = {
                name: line["name"],
                code3: line["code"],
                data: line["data"]
            };
        })
        // For each country, use the latest value for current population
        var data = [];value=0; date=0;
        for (var code3 in countries) {
            if (Object.hasOwnProperty.call(countries, code3)) {
                   if (typeof countries[code3]["data"][countries[code3]["data"].length-1][1] === 'number') {
                        value = countries[code3]["data"][countries[code3]["data"].length-1][1];
                        date = countries[code3]["data"][countries[code3]["data"].length-1][0];
                    }
                }
                data.push({
                    name: countries[code3].name,
                    code3: code3,
                    value: value
                   });
            }


        // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
        var mapData = Highcharts.geojson(Highcharts.maps['custom/world']);
        mapData.forEach(function (country) {
            country.id = country.properties['hc-key']; // for Chart.get()
            country.flag = country.id.replace('UK', 'GB').toLowerCase();
        });

        // Wrap point.select to get to the total selected points
        Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

            proceed.apply(this, Array.prototype.slice.call(arguments, 1));

            var points = mapChart.getSelectedPoints();
            if (points.length) {
                if (points.length === 1) {
                    document.querySelector('#info #flag')
                        .className = 'flag ' + points[0].flag;
                    document.querySelector('#info h2').innerHTML = points[0].name;
                } else {
                    document.querySelector('#info #flag')
                        .className = 'flag';
                    document.querySelector('#info h2').innerHTML = 'Comparing countries';

                }
                document.querySelector('#info .subheader')
                    .innerHTML = '<h4>Historical population</h4><small><em>Shift + Click on map to compare countries</em></small>';

                if (!countryChart) {
                    countryChart = Highcharts.chart('country-chart', {
                        chart: {
                            height: 250,
                            spacingLeft: 0
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            tickPixelInterval: 50,
                            type: 'datetime',
                            crosshair: true
                        },
                        yAxis: {
                            title: null,
                            opposite: true
                        },
                        tooltip: {
                            split: true
                        },
                        plotOptions: {
                            series: {
                                animation: {
                                    duration: 500
                                },
                                marker: {
                                    enabled: false
                                },
                                threshold: 0

                            }
                        }
                    });
                }

                countryChart.series.slice(0).forEach(function (s) {
                    s.remove(false);
                });

                points.forEach(function (p) {
                    countryChart.addSeries({
                        name: p.name,
                        data: countries[p.code3].data,
                        type: points.length > 1 ? 'line' : 'area'
                    }, false);
                });
                countryChart.redraw();

            } else {
                document.querySelector('#info #flag').className = '';
                document.querySelector('#info h2').innerHTML = '';
                document.querySelector('#info .subheader').innerHTML = '';
                if (countryChart) {
                    countryChart = countryChart.destroy();
                }
            }
        });

        // Initiate the map chart
        mapChart = Highcharts.mapChart('container1', {
            chart: {
                styledMode: true
                 },
            title: {
                text: 'Population history by country'
            },

            subtitle: {
                text: 'Source: <a href="http://data.worldbank.org/indicator/SP.POP.TOTL/countries/1W?display=default">The World Bank</a>'
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                //minColor: '#efecf3',
                //maxColor: '#990041',
            },

            tooltip: {
                footerFormat: '<span style="font-size: 10px">(Click for details)</span>'
            },

            series: [{
                data: data,
                mapData: mapData,
                joinBy: ['iso-a3', 'code3'],
                name: 'Current population',
                allowPointSelect: true,
                cursor: 'pointer',
                states: {
                    select: {
                        color: '#a4edba',
                        borderColor: 'black',
                        dashStyle: 'shortdot'
                    }
                },
                borderWidth: 0.5
            }]
        });

        // Pre-select a country
        //mapChart.get('us').select();

}