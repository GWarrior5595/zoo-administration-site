function deleteExhibit(exhibit){
    var id = {
        'Exhibit ID': exhibit.id
    };
    var confirmationPopup = confirm("Are you sure you want to delete this Exhibit?");
    //if user clicks "OK" when asked if they want to delete employee
    if (confirmationPopup)
    {
        $.ajax({
            url: "/deleteExhibit",
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(id),
            complete: function (exhibit) {
                $('#output').html(exhibit.responseText);
                reloadExhibitTable();
            }
        });
    }

}




function reloadExhibitTable(){
    $.ajax({
        url: "/getAllExhibit",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (exhibit) {
            CreateExhibitTableFromJSON(JSON.parse(exhibit.responseText));
        }
    });
}

function initializeInsertExhibitFields(){
    $("#exhibitDescription").val("");





    $("#exhibit-form-insert").dialog("open");
    $("#exhibitTable").tablesorter();

}

function CreateExhibitTableFromJSON(oneData) {
    // EXTRACT VALUE FOR HTML HEADER.
    var col = [];
    for (var i = 0; i < oneData.length; i++) {
        for (var key in oneData[i]) {
           if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    col.push("")

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.setAttribute("class", "table table-striped tablesorter");
    table.setAttribute('id', 'exhibitTable');

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
    for (var i = 0; i < oneData.length; i++) {

        //var tr = table.insertRow(-1);
        var tr = tbody.appendChild(document.createElement("tr"))

        for (var j = 0; j < col.length-1; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = oneData[i][col[j]];
        }
        var rowID = oneData[i][col[0]];
        var tabcelldelete = tr.insertCell(-1);
        var tabcelledit = tr.insertCell(-1);
        //tabcelldelete.innerHTML = "<button type='button' id='" + rowID + "' onclick='deleteEntry(this)' style='color: red'> X </button><br>";
       // tabcelldelete.innerHTML = "<span id='" + rowID +"' onclick='deleteExhibit(this)' class='table-remove glyphicon glyphicon-remove'></span>"
    }

    //delete previous table
    $("#exhibitTable").remove();


    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showExhibit");
    divContainer.appendChild(table);



    $("#exhibitTable").tablesorter();
}

function insertExhibit(){

    var entry;



    {
        entry = {
            'Zoo ID': 1,
            'Description': $("#exhibitDescription").val(),
        };
    }

    $.ajax({
        url: "/addExhibit",
        type: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(entry),
        complete: function (exhibit) {
            $('#output').html(exhibit.responseText);
            reloadExhibitTable();
        }
    });

    $("#exhibit-form-insert").dialog("close");

}



$(document).ready(function(){

    $("#exhibit-form-insert").dialog({
        autoOpen: false,
        height: 400,
        width: 300,
        modal: true,
        buttons: {
            "Submit": function () {

                insertExhibit();

                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () { }
    });

    setTimeout(function(){
        reloadExhibitTable();
    },400);

    $('#exhibit-name').keyup(function() {
        var $rows = $('#exhibitTable tbody  tr');

        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

        $rows.show().filter(function() {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });

    $('#getAllExhibit').click(function () {
        reloadExhibitTable();
    });
    $("#exhibitTable").tablesorter();
});