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


$(document).ready(function(){

    var seriesLabel = []
    var seriesRevenueData = []
    var seriesBarLabel = []
    var seriesOrderData = []    
    setTimeout(function(){   
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
        var objBar = [];
        seriesBarLabel.forEach(function(item, i) {
            var temp = {}
            temp["type"] = item;
            temp["order"] = seriesOrderData[i];
            temp['color'] = getRandomColor();
            objBar.push(temp);
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
    }, 2000);

    setTimeout(function(){
        $.ajax({
            url: "/getAllShopTypes",
            type: "POST",
            contentType: "application/json",
            processData: false,
            complete: function (data) {
                var allShopTypes = JSON.parse(data.responseText);    
                allShopTypes.forEach(function(element) {
                    var id = {
                        'Shop Type ID': element['Shop Type ID']
                    };
                    setTimeout(function(){
                        $.ajax({
                            url: "/getTotalRevenueByShopTypeID",
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
                                
                                setTimeout(function(){
                                //   $.ajax({
                                //       url: "/getTotalOrderNumberByShopTypeID",
                                //       type: "POST",
                                //       contentType: "application/json",
                                //       processData: false,
                                //       data: JSON.stringify(id),
                                //       complete: function (countData) {  
                                //         var jsonCountData = JSON.parse(countData.responseText);
                                //         var orderNumber = jsonCountData[0]['Total Orders']
                                //         seriesOrderData.push(orderNumber);
                                //         //   document.getElementById("cardsContainer").innerHTML += "<div class='row'><h3 style='text-align: center'>" + type + "</h3> <hr> <div class='col-lg-6 col-sm-6'> <div class='card'> <div class='content'> <div class='row'> <div class='col-xs-5'> <div class='icon-big icon-warning text-center'> <i class='ti-face-smile'></i> </div> </div> <div class='col-xs-7'> <div class='numbers'> <p>Number of Orders</p> <div id='zoo-ticket-number'>"+ jsonCountData[0]['Total Orders'] +"</div> </div> </div> </div> <div class='footer'> <hr /> <div class='stats'> <i class='ti-reload'></i> Updated now </div> </div> </div> </div> </div> <div class='col-lg-6 col-sm-6'> <div class='card'> <div class='content'> <div class='row'> <div class='col-xs-5'> <div class='icon-big icon-success text-center'> <i class='ti-wallet'></i> </div> </div> <div class='col-xs-7'> <div class='numbers'> <p>Revenue</p> <div id='zoo-ticket-sales'>$"+ Math.round(revenue*100)/100 +"</div> </div> </div> </div> <div class='footer'> <hr /> <div class='stats'> <i class='ti-reload'></i> Today </div> </div> </div> </div> </div> </div>"           
                                //       }
                                //   });
                                }, 200);
                            }
                        }, 200);
                    });
                
                }, this);        
            }
        });
    }, 300);
    setTimeout(function(){
        $.ajax({
            url: "/getAllShops",
            type: "POST",
            contentType: "application/json",
            processData: false,
            complete: function (shopData) {
                var allShop = JSON.parse(shopData.responseText);   
                allShop.forEach(function(element) {
                    var id = {
                        'Shop ID': element['Shop ID']
                    };
                    setTimeout(function(){
                        $.ajax({
                            url: "/getTotalOrderNumberByShopID",
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
                            }
                        });
                    },300);
                });
            }
        });
    }, 300);
    setTimeout(function(){
        $.ajax({
            url: "/allOrders",
            type: "POST",
            contentType: "application/json",
            processData: false,
            complete: function (data) {
                CreateTableFromJSON(JSON.parse(data.responseText));   
                document.getElementById('page-inner').scrollIntoView();
                //$("#dataTable").tablesorter();              
            }
        });
    },1000);
});