function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function CreateTableFromJSON(myData) {
    // EXTRACT VALUE FOR HTML HEADER. 
    var col = [];
    for (var i = 0; i < myData.length; i++) {
        for (var key in myData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.setAttribute("class", "table table-striped tablesorter");
    table.setAttribute('id', 'dataTable');

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var thead = document.createElement("thead");
    table.appendChild(thead);
    
    var trheader = thead.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.

        th.innerHTML = col[i];
        th.setAttribute('data-dynatable-column', col[i])
        trheader.appendChild(th);
    }
    var tbody = table.appendChild(document.createElement("tbody"));
    
    // ADD JSON DATA TO THE TABLE AS ROWS.
    // for (var i = 0; i < myData.length; i++) {
    //     var tr = tbody.appendChild(document.createElement("tr"))

    //     for (var j = 0; j < col.length; j++) {
    //         var tabCell = tr.insertCell(-1);
    //         tabCell.innerHTML = myData[i][col[j]];
    //     }
    // }

    

    //delete previous table
    $("#dataTable").remove();

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("ordersTable");
    divContainer.appendChild(table);

    $('#dataTable').dynatable({
        dataset: {
            records: myData
        }
    });

}

function displayRevenueForShopTypes(date){
    $.ajax({
        url: "/getAllShopTypes",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (data) {
            var allShopTypes = JSON.parse(data.responseText);  
            var seriesLabel = []
            var seriesRevenueData = []  
            allShopTypes.forEach(function(element) {
                var id = {
                    'Shop Type ID': element['Shop Type ID'],
                    'Time':date
                };
                setTimeout(function(){
                    $.ajax({
                        url: "/getTotalRevenueFromDateByShopTypeID", //from date
                        type: "POST",
                        contentType: "application/json",
                        processData: false,
                        data: JSON.stringify(id),
                        complete: function (revenueData) {
                            var jsonRevenueData = JSON.parse(revenueData.responseText);
                            var type = jsonRevenueData[0]['Type']
                            seriesLabel.push(type);
                            var revenue = jsonRevenueData[0]['Revenue'];
                            seriesRevenueData.push(Math.round(revenue*100)/100);
                            
                            var obj = [];
                            seriesLabel.forEach(function(item, i) {
                                var temp = {}
                                temp["type"] = item;
                                temp["dollars"] = seriesRevenueData[i];
                                obj.push(temp);
                            }); 
                            var chart;
                            chart = AmCharts.makeChart( "pieDiv", {
                                "type": "pie",
                                "theme": "light",
                                "dataProvider": obj,
                                "valueField": "dollars",
                                "titleField": "type",
                                "balloon":{
                                "fixedPosition":true
                                },
                                "export": {
                                    "enabled": false
                                }
                            } );
                        }
                    }, 400);
                });
            
            }, this);        
        }
    });
}

function displayOrderNumbersForShops(date){
    $.ajax({
        url: "/getAllShops",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (shopData) {
            var allShop = JSON.parse(shopData.responseText); 
            var seriesBarLabel = []
            var seriesOrderData = []   
            allShop.forEach(function(element) {
                var id = {
                    'Shop ID': element['Shop ID'],
                    'Time': date
                };
                setTimeout(function(){
                    $.ajax({
                        url: "/getTotalOrderNumberFromDateByShopID", //from date
                        type: "POST",
                        contentType: "application/json",
                        processData: false,
                        data: JSON.stringify(id),
                        complete: function (ordersData) {
                            var jsonOrdersData = JSON.parse(ordersData.responseText);
                            var name = jsonOrdersData[0]['Name']
                            seriesBarLabel.push(name);                                
                            var totalOrders = jsonOrdersData[0]['Total Orders'];
                            seriesOrderData.push(totalOrders);
                            var objBar = [];
                            seriesBarLabel.forEach(function(item, i) {
                                if(seriesOrderData[i] !== 0){
                                    var temp = {}
                                    temp["type"] = item;
                                    temp["order"] = seriesOrderData[i];
                                    temp['color'] = getRandomColor();
                                    objBar.push(temp);
                                }
                            });

                            chart = AmCharts.makeChart("barDiv", {
                                "type": "serial",
                                "theme": "patterns",
                                "marginRight": 70,
                                "dataProvider": objBar,
                                "valueAxes": [{
                                    "axisAlpha": 0,
                                    "position": "left",
                                    "title": "Orders from Shop"
                                }],
                                "startDuration": 1,
                                "graphs": [{
                                    "balloonText": "<b>[[category]]: [[value]]</b>",
                                    "fillColorsField": "color",
                                    "fillAlphas": 0.9,
                                    "lineAlpha": 0.2,
                                    "type": "column",
                                    "valueField": "order"
                                }],
                                "chartCursor": {
                                    "categoryBalloonEnabled": false,
                                    "cursorAlpha": 0,
                                    "zoomable": false
                                },
                                "categoryField": "type",
                                "categoryAxis": {
                                    "gridPosition": "start",
                                    "labelRotation": 45
                                },
                                "export": {
                                    "enabled": false
                                }

                            });
                        }
                    });
                },400);
            });
        }
    });
}

function displayAllOrders(date){
    var id = {
        'Time': date
    };
    $.ajax({
        url: "/getAllOrdersFromDate", //from date
        type: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(id),
        complete: function (data) {
            CreateTableFromJSON(JSON.parse(data.responseText));   
            //$("#dataTable").tablesorter();              
        }
    });
}

$(document).ready(function(){   
    $('#pieDateSelect').on('change', function (e) {
        displayRevenueForShopTypes(this.value)        
    });

    $('#barDateSelect').on('change', function (e) {
        displayOrderNumbersForShops(this.value)        
    });

    $('#tableDateSelect').on('change', function (e) {
        document.getElementById("ordersTable").innerHTML = "";
        displayAllOrders(this.value)        
    });

    setTimeout(function(){
        displayRevenueForShopTypes(30000)
    }, 400);

    setTimeout(function(){
        displayOrderNumbersForShops(30000);
    }, 400);

    setTimeout(function(){
        displayAllOrders(30000);
    },400);

    
});