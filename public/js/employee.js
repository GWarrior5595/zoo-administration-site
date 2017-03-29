function deleteEntry(element){
    console.log(element.id);
  }

$(document).ready(function(){
  $.ajax({
      url: "/allEmployees",
      type: "POST",
      contentType: "application/json",
      processData: false,
      complete: function (data) {
          CreateTableFromJSON(JSON.parse(data.responseText));
      }
  });

  $('#user-first-name').keyup(function() { 
    var $rows = $('#dataTable tbody  tr');
    
      var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

      $rows.show().filter(function() {
          var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
          return !~text.indexOf(val);
      }).hide();
  });
  
  $('#allEmployees').click(function () {
      $.ajax({
          url: "/allEmployees",
          type: "POST",
          contentType: "application/json",
          processData: false,
          complete: function (data) {
              CreateTableFromJSON(JSON.parse(data.responseText));
          }
      });
  });

  $('#searchEmployees').click(function () {
      var id = {
          'First Name': $('#user-first-name').val()
      };
      
      $.ajax({
          url: "/searchEmployees",
          type: "POST",
          contentType: "application/json",
          processData: false,
          data: JSON.stringify(id),
          complete: function (data) {
              CreateTableFromJSON(JSON.parse(data.responseText));
          }
      });
  });

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
        col.push("Delete")

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
            trheader.appendChild(th);
        }
        var tbody = table.appendChild(document.createElement("tbody"));
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myData.length; i++) {

            //var tr = table.insertRow(-1);
            var tr = tbody.appendChild(document.createElement("tr"))

            for (var j = 0; j < col.length-1; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myData[i][col[j]];
            }
            var rowID = myData[i][col[0]];
            var tabcelldelete = tr.insertCell(-1);
            tabcelldelete.innerHTML = "<br><button type='button' id='" + rowID + "' onclick='deleteEntry(this)' style='color: red'> X </button><br>";
            
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

        $("#dataTable").tablesorter({
          sortList: [[0,0]],
        });
    }
});