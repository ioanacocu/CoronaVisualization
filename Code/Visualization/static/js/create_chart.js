var colors = Highcharts.getOptions().colors;
months=['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
year=2020

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
for(i;i<len;i++){
    sData=[]
    j=0;
    for (j;j<cats;j++){
        if(mes4countries[i][j][0].length>2){
        txtDate=mes4countries[i][j][0];
        yearDate=0;
        monthDate=-1;
        if(!txtDate.includes(year)) {
            yearDate=year;
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
         else {date=new Date(txtDate)
             yearDate=date.getFullYear();
             monthDate=date.getMonth();
              dayDate=date.getDay();}
        if(yearDate>2019){
        sData.push({
            x: Date.UTC(yearDate, monthDate, dayDate),//mes4countries[i][j]
            x2:todayUTC,
            showInLegend: true,
            color:colors[i],
            //x:mes4countries[i][j],
            y:j})
        }}
        catch{}}
        }
    s.push({
        name: series[i],
        data:sData
    });
}
i=0
for(i;i<len;i++){
    if(timeSeries[series[i]]!='undefined'){
        sData=[]
        for (var year in timeSeries[series[i]]){
            for (var month in timeSeries[series[i]][year]){
                for (var day in timeSeries[series[i]][year][month])
                {
                sData.push({
                    x: Date.UTC(year, month, day),//mes4countries[i][j]
                    y:[series[i]][year][month][day][0]})
                }}

        }
        sTime.push({
        name: series[i],
        color:color[i],
        data:sData
    });
        }
        }
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
        text: 'Measures taken by countries against COVID 19'
    },
    accessibility: {

    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: ''
        },


    },
    series:sData,
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
}
