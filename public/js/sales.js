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
  // Chartist.Pie('#chartPreferences', {
  //   labels: ['$3.2','$6.0','$0.8', 'jkhsdf'],
  //   series: [32, 40, 8, 20]
  // });
$('#search').keyup(function() { 
  var $rows = $('#dataTable tbody  tr');
  
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

    $rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
});
setTimeout(function(){
    $.ajax({
        url: "/getAllShopTypes",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (data) {
            var allShopTypes = JSON.parse(data.responseText);    
            allShopTypes.forEach(function(element) {
              var type = element['Type']
              var id = {
                  'Shop Type ID': element['Shop Type ID']
              };

              $.ajax({
                  url: "/getTotalRevenueByShopTypeID",
                  type: "POST",
                  contentType: "application/json",
                  processData: false,
                  data: JSON.stringify(id),
                  complete: function (revenueData) {
                    var jsonRevenueData = JSON.parse(revenueData.responseText);

                    setTimeout(function(){
                      $.ajax({
                          url: "/getTotalOrderNumberByShopTypeID",
                          type: "POST",
                          contentType: "application/json",
                          processData: false,
                          data: JSON.stringify(id),
                          complete: function (countData) {  
                            var jsonCountData = JSON.parse(countData.responseText);
                            var revenue = jsonRevenueData[0]['Revenue']
                              document.getElementById("cardsContainer").innerHTML += "<div class='row'><h3 style='text-align: center'>" + type + "</h3> <hr> <div class='col-lg-6 col-sm-6'> <div class='card'> <div class='content'> <div class='row'> <div class='col-xs-5'> <div class='icon-big icon-warning text-center'> <i class='ti-face-smile'></i> </div> </div> <div class='col-xs-7'> <div class='numbers'> <p>Number of Orders</p> <div id='zoo-ticket-number'>"+ jsonCountData[0]['Total Orders'] +"</div> </div> </div> </div> <div class='footer'> <hr /> <div class='stats'> <i class='ti-reload'></i> Updated now </div> </div> </div> </div> </div> <div class='col-lg-6 col-sm-6'> <div class='card'> <div class='content'> <div class='row'> <div class='col-xs-5'> <div class='icon-big icon-success text-center'> <i class='ti-wallet'></i> </div> </div> <div class='col-xs-7'> <div class='numbers'> <p>Revenue</p> <div id='zoo-ticket-sales'>$"+ Math.round(revenue*100)/100 +"</div> </div> </div> </div> <div class='footer'> <hr /> <div class='stats'> <i class='ti-reload'></i> Today </div> </div> </div> </div> </div> </div>"           
                          }
                      });
                    }, 200);
                  }
              });
              
            }, this);        
        }
    });
  }, 30);
  setTimeout(function(){
    $.ajax({
          url: "/allOrders",
          type: "POST",
          contentType: "application/json",
          processData: false,
          complete: function (data) {
              CreateTableFromJSON(JSON.parse(data.responseText));   
              document.getElementById('cardsContainer').scrollIntoView();
              //$("#dataTable").tablesorter();              
          }
      });
  },1000);
});