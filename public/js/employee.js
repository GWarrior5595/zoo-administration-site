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
            var employeeInfo = JSON.parse(data.responseText);
            //insert employee info into inputs so user can edit.
            $("#editedUserID").val(employeeInfo[0]['Employee ID'])           
            $("#editFirstName").val(employeeInfo[0]['First Name']);
            $("#editLastName").val(employeeInfo[0]['Last Name']);
            $("#editJobDescription").val(employeeInfo[0]['Job Desciption']);
            $("#editShift").val(employeeInfo[0]['Shifts']);
            $("#editSalary").val(employeeInfo[0]['Salary']);

            var list = document.getElementById('editShop');
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            var list = document.getElementById('editEnclosure');
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }


            $.ajax({
                url: "/getIDAndNameOfShops",
                type: "POST",
                contentType: "application/json",
                processData: false,
                complete: function (data) {
                    var shopsData = JSON.parse(data.responseText);

                    var sel = document.getElementById('editShop');
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
                        if(employeeInfo[0]['Shop ID'] !== null && employeeInfo[0]['Shop ID'] === shopsData[i]["Shop ID"]) {
                            
                            $("#editShop option:contains("+ shopsData[i]['Name']+ ")").prop('selected',true);
                                                      
                        }
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

                    var sel = document.getElementById('editEnclosure');
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
                        if(employeeInfo[0]['Enclosure ID'] !== null && employeeInfo[0]['Enclosure ID'] === enclosureData[i]["Enclosure"]) {
                            $("#editEnclosure option:contains("+ enclosureData[i]['Name']+ ")").prop('selected',true);
                            
                                                                                   
                        }
                    }
                }
            });
                      
        }
    });
    $("#dialog-form-edit").dialog("open");
}


function reloadEmployeeTable(){
    $.ajax({
          url: "/allEmployees",
          type: "POST",
          contentType: "application/json",
          processData: false,
          complete: function (data) {
              CreateTableFromJSON(JSON.parse(data.responseText));            
          }
      });
}

function initializeInsertEmployeeFields(){         
    $("#firstName").val("");
    $("#lastName").val("");
    $("#jobDescription").val("");
    $("#shift").val("");
    $("#salary").val("");

    var list = document.getElementById('shop');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    var list = document.getElementById('enclosure');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }


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
                    
    $("#dialog-form-insert").dialog("open");
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

    //delete previous table
    $("#dataTable").remove();

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.appendChild(table);

    $("#dataTable").tablesorter();
}

function insertEmployee(){
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

    var nullValue = null;


    if(shop.options[shop.selectedIndex].id === '' && enclosure.options[enclosure.selectedIndex].id === ''){
        entry = {
            'Zoo ID': 1,
            'First Name': $("#firstName").val(),
            'Last Name': $("#lastName").val(),
            'Enclosure ID': nullValue,
            'Shop ID': nullValue,                                    
            'Job Desciption': $("#jobDescription").val(),
            'Hire Date': today,
            'Shifts': $("#shift").val(),
            'Salary': $("#salary").val()
        };
    }
    else if (shop.options[shop.selectedIndex].id === ''){
        entry = {
            'Zoo ID': 1,
            'First Name': $("#firstName").val(),
            'Last Name': $("#lastName").val(),
            'Enclosure ID': enclosure.options[enclosure.selectedIndex].id,
            'Shop ID': nullValue,            
            'Job Desciption': $("#jobDescription").val(),
            'Hire Date': today,
            'Shifts': $("#shift").val(),
            'Salary': $("#salary").val()
        };
    }
    else if(enclosure.options[enclosure.selectedIndex].id === ''){
        entry = {
            'Zoo ID': 1,
            'First Name': $("#firstName").val(),
            'Last Name': $("#lastName").val(),
            'Shop ID': shop.options[shop.selectedIndex].id,
            'Enclosure ID': nullValue,            
            'Job Desciption': $("#jobDescription").val(),
            'Hire Date': today,
            'Shifts': $("#shift").val(),
            'Salary': $("#salary").val()
        };
    }
    else{
        entry = {
            'Zoo ID': 1,
            'First Name': $("#firstName").val(),
            'Last Name': $("#lastName").val(),
            'Enclosure ID': enclosure.options[enclosure.selectedIndex].id,
            'Shop ID': shop.options[shop.selectedIndex].id,            
            'Job Desciption': $("#jobDescription").val(),
            'Hire Date': today,
            'Shifts': $("#shift").val(),
            'Salary': $("#salary").val()
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

    $("#dialog-form-insert").dialog("close");    
    document.getElementById('output').scrollIntoView();
}

$(document).ready(function(){
    $("#dialog-form-edit").dialog({
        autoOpen: false,
        height: 400,
        width: 300,
        modal: true,
        buttons: {
            "Submit": function () {

                var enclosure = document.getElementById("editEnclosure");
                var shop = document.getElementById("editShop");
                var entry;

                var nullValue = null;

                if(shop.options[shop.selectedIndex].id === '' && enclosure.options[enclosure.selectedIndex].id === ''){
                    entry = {
                        'First Name': $("#editFirstName").val(),
                        'Last Name': $("#editLastName").val(),
                        'Enclosure ID': nullValue,
                        'Shop ID': nullValue,                                    
                        'Job Desciption': $("#editJobDescription").val(),
                        'Shifts': $("#editShift").val(),
                        'Salary': $("#editSalary").val()
                    };
                }
                else if (shop.options[shop.selectedIndex].id === ''){
                    entry = {
                        'First Name': $("#editFirstName").val(),
                        'Last Name': $("#editLastName").val(),
                        'Enclosure ID': enclosure.options[enclosure.selectedIndex].id,
                        'Shop ID': nullValue,                                    
                        'Job Desciption': $("#editJobDescription").val(),
                        'Shifts': $("#editShift").val(),
                        'Salary': $("#editSalary").val()
                    };
                }
                else if(enclosure.options[enclosure.selectedIndex].id === ''){                    
                    entry = {
                        'First Name': $("#editFirstName").val(),
                        'Last Name': $("#editLastName").val(),
                        'Shop ID': shop.options[shop.selectedIndex].id,
                        'Enclosure ID': nullValue,                                    
                        'Job Desciption': $("#editJobDescription").val(),
                        'Shifts': $("#editShift").val(),
                        'Salary': $("#editSalary").val()
                    };
                }
                else{
                    entry = {
                        'First Name': $("#editFirstName").val(),
                        'Last Name': $("#editLastName").val(),
                        'Shop ID': shop.options[shop.selectedIndex].id,                        
                        'Enclosure ID': enclosure.options[enclosure.selectedIndex].id,
                        'Job Desciption': $("#editJobDescription").val(),
                        'Shifts': $("#editShift").val(),
                        'Salary': $("#editSalary").val()
                    };
                }
                $.ajax({
                    url: "/editEmployeeByID/" + $("#editedUserID").val(),
                    type: "POST",
                    contentType: "application/json",
                    processData: false,
                    data: JSON.stringify(entry),
                    complete: function (data) {
                        $('#output').html(data.responseText);
                    }
                });
                
                reloadEmployeeTable(); 

                $(this).dialog("close");
                reloadEmployeeTable();                 
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () { }
    });

    $("#dialog-form-insert").dialog({
        autoOpen: false,
        height: 400,
        width: 300,
        modal: true,
        buttons: {
            "Submit": function () {

                insertEmployee();    

                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () { }
    });
    
    setTimeout(function(){
        reloadEmployeeTable();
    },400);

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
    $("#dataTable").tablesorter();  
});