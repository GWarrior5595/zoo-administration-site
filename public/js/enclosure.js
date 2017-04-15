function deleteEnclosure(enclosure){
    var id = {
        'Enclosure': enclosure.id
    };
    var confirmationPopup = confirm("Are you sure you want to delete this Enclosure?");
    //if user clicks "OK" when asked if they want to delete employee
    if (confirmationPopup)
    {
        $.ajax({
            url: "/deleteEnclosure",
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(id),
            complete: function (enclosure) {
                $('#output').html(enclosure.responseText);
                reloadEnclosureTable();
            }
        });
    }

}



function reloadEnclosureTable(){
    $.ajax({
        url: "/getAllEnclosure",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (enclosure) {
            CreateEnclosureJSONTable(JSON.parse(enclosure.responseText));
        }
    });
}

function initializeEditEnclosure(enclosure){
    var id = {
        'Enclosure': enclosure.id
    };
    $.ajax({
        url: "/searchEnclosureByID",
        type: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(id),
        complete: function (enclosure) {
            var enclosureInfo = JSON.parse(enclosure.responseText);
            //insert animal info into inputs so user can edit.
            $("#editedEnclosureID").val(enclosureInfo[0]['Enclosure'])
            $("#editEnclosureName").val(enclosureInfo[0]['Name']);
            $("#editEnclosureDescription").val(enclosureInfo[0]['Description']);
            $("#editEnclosureLocation").val(enclosureInfo[0]['Location']);
            $("#editEnclosureCapacity").val(enclosureInfo[0]['Capacity']);
            $("#editEnclosureFeeding").val(enclosureInfo[0]['Feeding Allowed']);



            var list = document.getElementById('editEnclosureExhibit');
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }




            $.ajax({
                url: "/getIDAndNameOfExhibit",
                type: "POST",
                contentType: "application/json",
                processData: false,
                complete: function (animal) {
                    exhibitData = JSON.parse(animal.responseText);

                    var sel = document.getElementById('editEnclosureExhibit');
                    for(var i = 0; i < exhibitData.length; i++) {
                        var opt = document.createElement('option');
                        opt.innerHTML = exhibitData[i].Description;
                        opt.value = exhibitData[i].Description;
                        opt.id = exhibitData[i]["Exhibit ID"]
                        sel.appendChild(opt);
                        if(enclosureInfo[0]['Exhibit ID'] !== null && enclosureInfo[0]['Exhibit ID'] === exhibitData[i]["Exhibit ID"]) {
                            $("#editEnclosureExhibit option:contains("+ exhibitData[i]['Description']+ ")").prop('selected',true);


                        }
                    }
                }
            });

        }
    });
    $("#enclosure-form-edit").dialog("open");
}



function initializeInsertEnclosureFields() {
    $("#enclosureName").val("");
    $("#enclosureDescription").val("");
    $("#enclosureLocation").val("");
    $("#enclosureCapacity").val("");
    $("#enclosureFeeding").val("");



    var list = document.getElementById('enclosureExhibit');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }


    $.ajax({
        url: "/getIDAndNameOfExhibit",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (enclosure) {
            var exhibitData = JSON.parse(enclosure.responseText);
            var sel = document.getElementById('enclosureExhibit');
            for (var i = 0; i < exhibitData.length; i++) {
                var opt = document.createElement('option');
                opt.innerHTML = exhibitData[i].Description;
                opt.value = exhibitData[i].Description;
                opt.id = exhibitData[i]["Exhibit ID"]
                sel.appendChild(opt);
            }
        }
    });




    $("#enclosure-form-insert").dialog("open");
    $("#enclosureTable").tablesorter();

}

    function CreateEnclosureJSONTable(oneData) {
    // EXTRACT VALUE FOR HTML HEADER.
    var col = [];
    for (var i = 0; i < oneData.length; i++) {
        for (var key in oneData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    col.push("Actions")

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.setAttribute("class", "table table-striped tablesorter");
    table.setAttribute('id', 'enclosureTable');

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
        tabcelldelete.innerHTML = "<span id='" + rowID +"' onclick='deleteEnclosure(this)' class='table-remove glyphicon glyphicon-remove'></span>"
        tabcelledit.innerHTML = "<span id='" + rowID +"' onclick='initializeEditEnclosure(this)' class='table-edit glyphicon glyphicon-edit'></span>"
    }


    //delete previous table
    $("#enclosureTable").remove();

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showEnclosure");
    divContainer.appendChild(table);


    $("#enclosureTable").tablesorter();
}

function insertEnclosure(){
    var exhibit = document.getElementById("enclosureExhibit");

    var entry;


    {
        entry = {
            'Name': $("#enclosureName").val(),
            'Description': $("#enclosureDescription").val(),
            'Exhibit ID': exhibit.options[exhibit.selectedIndex].id,
            'Location': $("#enclosureLocation").val(),
            'Capacity': $("#enclosureCapacity").val(),
            'Feeding Allowed': $("#enclosureFeeding").prop("checked") ? 1 : 0
        };
    }



    $.ajax({
        url: "/addEnclosure",
        type: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(entry),
        complete: function (enclosure) {
            $('#output').html(enclosure.responseText);
            reloadEnclosureTable();
        }
    });

    $("#enclosure-form-insert").dialog("close");

}



$(document).ready(function(){

    $("#enclosure-form-edit").dialog({
        autoOpen: false,
        height: 400,
        width: 300,
        modal: true,
        buttons: {
            "Submit": function () {

                var exhibit = document.getElementById("editEnclosureExhibit");

                var entry;



                {
                    entry = {
                        'Name': $("#editEnclosureName").val(),
                        'Description': $("#editEnclosureDescription").val(),
                        'Exhibit ID': exhibit.options[exhibit.selectedIndex].id,
                        'Location': $("#editEnclosureLocation").val(),
                        'Capacity': $("#editEnclosureCapacity").val(),
                        'Feeding Allowed': $("#editEnclosureFeeding").prop("checked") ? 1 : 0

                    };
                }


                $.ajax({
                    url: "/editEnclosureByID/" + $("#editedEnclosureID").val(),
                    type: "POST",
                    contentType: "application/json",
                    processData: false,
                    data: JSON.stringify(entry),
                    complete: function (enclosure) {
                        $('#output').html(enclosure.responseText);
                        console.log(entry)

                    }
                });

                reloadEnclosureTable();

                $(this).dialog("close");
                reloadEnclosureTable();
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () { }
    });

    $("#enclosure-form-insert").dialog({
        autoOpen: false,
        height: 400,
        width: 300,
        modal: true,
        buttons: {
            "Submit": function () {

                insertEnclosure();

                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () { }
    });

    setTimeout(function(){
        reloadEnclosureTable();
    },400);



    reloadEnclosureTable();

    $('#enclosure-name').keyup(function() {
        var $rows = $('#enclosureTable tbody  tr');

        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

        $rows.show().filter(function() {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });

    $('#getAllEnclosure').click(function () {
        reloadEnclosureTable();
    });
    $("#enclosureTable").tablesorter();
});