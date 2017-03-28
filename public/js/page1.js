$(document).ready(function(){
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
        // ('Book ID', 'Book Name', 'Category' and 'Price')
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
        table.setAttribute("class", "table table-striped")

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.

            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myData.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myData[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }
});