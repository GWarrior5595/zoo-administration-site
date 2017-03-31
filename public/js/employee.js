function deleteEntry(element){
    var id = {
            'Employee ID': element.id
        };
    var confirmationPopup = confirm("Are you sure you want to delete this employee?");
        //if user clicks "OK" when asked if they want to delete employee
        if (confirmationPopup) 
        {   
            $.ajax({
                url: "/deleteEmployee",
                type: "POST",
                contentType: "application/json",
                processData: false,
                data: JSON.stringify(id),
                complete: function (data) {
            $('#output').html(data.responseText);    
            reloadEmployeeTable();        
             }
            });
        } 

}

//this will get called when the edit submit button is pressed.
function editEmployeeEntry(){
    //initialize variable based on input. Make if else statement if enclosure is null or shop ID is null
    var info = {

    }

    //once have information, make ajax request to /editEmployeeByID
    //then reload the html table like before
}

function initializeEditEntry(element){
    var id = {
          'Employee ID': element.id
      };
    $.ajax({
        url: "/searchEmployeeByID",
        type: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(id),
        complete: function (data) {
            var employeeInfo = data.responseText;

            //insert employee info into inputs so user can edit.

        }
    });
}

function reloadEmployeeTable(){
    $.ajax({
          url: "/allEmployees",
          type: "POST",
          contentType: "application/json",
          processData: false,
          complete: function (data) {
              CreateTableFromJSON(JSON.parse(data.responseText));
              initializeInsertEmployeeFields();             
          }
      });
}

function initializeInsertEmployeeFields(){
    var divContainer = document.getElementById("showData");      
    divContainer.innerHTML += "<h3 id='addEmployee'>Add New Employee</h3><br/><form id='submit' method='post' action='/addEmployee'><input type='text' name='first' id='firstNameEntry' placeholder='First Name'><input type='text' id='lastNameEntry' name='last' placeholder='Last Name'><input type='text' id='jobDescriptionEntry' name='job-description' placeholder='Job Description'><input type='text' id='shiftEntry' name='shift' placeholder='Shifts'><input type='number' id='salaryEntry' name='salary' placeholder='Salary'>"
    //<input type='text' name='hiredate' placeholder='Hire-Date (YYYY-MM-DD)'>
    divContainer.innerHTML += "What Shop do they work at?  <select id='shop'></select></br>";
    divContainer.innerHTML += "What Enclosure do they work at?  <select id='enclosure'></select><br/>";        
    divContainer.innerHTML += "<input type='submit' onclick='insertEmployee(this)' value='Submit'></form>"

    $.ajax({
        url: "/getIDAndNameOfShops",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (data) {
            var shopsData = JSON.parse(data.responseText);

            var sel = document.getElementById('shop');
            var optnull = document.createElement('option');
            optnull.innerHTML = ""
            optnull.value = null;
            sel.appendChild(optnull);
            for(var i = 0; i < shopsData.length; i++) {
                var opt = document.createElement('option');
                opt.innerHTML = shopsData[i].Name;
                opt.value = shopsData[i].Name;
                opt.id = shopsData[i]["Shop ID"]
                sel.appendChild(opt);
            }
        }
    });

    $.ajax({
        url: "/getIDAndNameOfEnclosures",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (data) {
            enclosureData = JSON.parse(data.responseText);

            var sel = document.getElementById('enclosure');
            var optnull = document.createElement('option');
            optnull.innerHTML = ""
            optnull.value = null;
            sel.appendChild(optnull);
            for(var i = 0; i < enclosureData.length; i++) {
                var opt = document.createElement('option');
                opt.innerHTML = enclosureData[i].Name;
                opt.value = enclosureData[i].Name;
                opt.id = enclosureData[i]["Enclosure"]
                sel.appendChild(opt);
            }
        }
    });
    $("#dataTable").tablesorter();
    
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
    col.push("Actions")

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
        var tabcelledit = tr.insertCell(-1);
        //tabcelldelete.innerHTML = "<button type='button' id='" + rowID + "' onclick='deleteEntry(this)' style='color: red'> X </button><br>";
        tabcelldelete.innerHTML = "<span id='" + rowID +"' onclick='deleteEntry(this)' class='table-remove glyphicon glyphicon-remove'></span>"
        tabcelledit.innerHTML = "<span id='" + rowID +"' onclick='initializeEditEntry(this)' class='table-edit glyphicon glyphicon-edit'></span>"        
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    $("#dataTable").tablesorter();
}

function insertEmployee(element){
    var enclosure = document.getElementById("enclosure");
    var shop = document.getElementById("shop");
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = yyyy+"-"+mm+"-"+dd;
    var entry;

    if(enclosure.options[enclosure.selectedIndex].id == ''){
        entry = {
            'Zoo ID': 1,
            'First Name': $("#firstNameEntry").val(),
            'Last Name': $("#lastNameEntry").val(),
            'Shop ID': shop.options[shop.selectedIndex].id,
            'Job Desciption': $("#jobDescriptionEntry").val(),
            'Hire Date': write(today),
            'Shifts': $("#shiftEntry").val(),
            'Salary': $("#salaryEntry").val()
        };
    }
    else if (enclosure.options[enclosure.selectedIndex].id != '' && shop.options[shop.selectedIndex].id != ''){
        entry = {
            'Zoo ID': 1,
            'First Name': $("#firstNameEntry").val(),
            'Last Name': $("#lastNameEntry").val(),
            'Shop ID': shop.options[shop.selectedIndex].id,            
            'Enclosure ID': enclosure.options[enclosure.selectedIndex].id,
            'Job Desciption': $("#jobDescriptionEntry").val(),
            'Hire Date': today,
            'Shifts': $("#shiftEntry").val(),
            'Salary': $("#salaryEntry").val()
        };
    }
    else{
        entry = {
            'Zoo ID': 1,
            'First Name': $("#firstNameEntry").val(),
            'Last Name': $("#lastNameEntry").val(),
            'Enclosure ID': enclosure.options[enclosure.selectedIndex].id,
            'Job Desciption': $("#jobDescriptionEntry").val(),
            'Hire Date': today - 6,
            'Shifts': $("#shiftEntry").val(),
            'Salary': $("#salaryEntry").val()
        };
    }

    $.ajax({
        url: "/addEmployee",
        type: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(entry),
        complete: function (data) {
            $('#output').html(data.responseText);
            reloadEmployeeTable();
        }
    });
    document.getElementById('topPage').scrollIntoView();
}

$(document).ready(function(){
  $.ajax({
      url: "/allEmployees",
      type: "POST",
      contentType: "application/json",
      processData: false,
      complete: function (data) {
          CreateTableFromJSON(JSON.parse(data.responseText));
          initializeInsertEmployeeFields();
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
      reloadEmployeeTable();
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
    $("#dataTable").tablesorter();  
});