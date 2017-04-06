function displayAllOrdersWithDonations(date){
    var seriesData = [];
    var seriesLabel = [];

    var id = {
        'Time': date
    };

    $.ajax({
        url: "/getAllOrdersFromDateWithDonations",
        type: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(id),
        complete: function (data) {
            var jsonData = JSON.parse(data.responseText);   
            var obj = [];
            jsonData.forEach(function(item, index){
                seriesLabel.push(jsonData[index]["Customer Name"])
                seriesData.push(jsonData[index]["Donation Amount"])

            })
            seriesLabel.forEach(function(item, i) {
                var temp = {}
                temp["amount"] = item;
                temp["dollars"] = seriesData[i];
                obj.push(temp);
            }); 

            
            var chart = AmCharts.makeChart( "pieDiv", {
                "type": "pie",
                "theme": "light",
                "dataProvider": obj,
                "valueField": "dollars",
                "titleField": "amount",
                "balloon":{
                "fixedPosition":true
                },
                "export": {
                    "enabled": false
                }
            } );
        }
    });
}

$(document).ready(function(){
    displayAllOrdersWithDonations(60);    
    $(function(){
        $("#nav-placeholder").load("/navbar"); 
    });

    $.ajax({
          url: "/getRevenue",
          type: "POST",
          contentType: "application/json",
          processData: false,
          complete: function (data) {
              var jsonData = JSON.parse(data.responseText);   
              document.getElementById("zoo-revenue").innerHTML = "$" + jsonData[0]['Revenue']
          }
      });
      var id = {
          'Shop Type ID': 1 //hardcoded... for now
      };
    $.ajax({
          url: "/getTotalRevenueByShopTypeID",
          type: "POST",
          contentType: "application/json",
          processData: false,
          data: JSON.stringify(id),
          complete: function (data) {
              var jsonData = JSON.parse(data.responseText);   
              document.getElementById("zoo-visitors").innerHTML = (jsonData[0]['Revenue']/10)
          }
      });

    var dataSales = {
          labels: ['8:00AM', '10:00PM', '1:00PM', '3:00PM', '4:00PM'],
          series: [
             [287, 385, 490, 594, 512, 426],
            [67, 152, 313, 287, 343, 315],
            [23, 113, 130, 158, 240, 193]
          ]
        };

    var optionsSales = {
            lineSmooth: false,
            low: 0,
            high: 1000,
            showArea: true,
            height: "245px",
            axisX: {
            showGrid: false,
        },
            lineSmooth: Chartist.Interpolation.simple({
                divisor: 3
            }),
        showLine: true,
        showPoint: false,
    };

    var responsiveSales = [
        ['screen and (max-width: 640px)', {
        axisX: {
            labelInterpolationFnc: function (value) {
            return value[0];
            }
        }
        }]
    ];

    Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
    

    $('#pieDateSelect').on('change', function (e) {
        document.getElementById("pieDiv").innerHTML = "";
        displayAllOrdersWithDonations(this.value)        
    });        
});