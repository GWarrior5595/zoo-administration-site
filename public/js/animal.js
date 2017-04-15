
function deleteAnimal(animal){
    var id = {
        'Animal ID': animal.id
    };
    var confirmationPopup = confirm("Are you sure you want to delete this Animal?");
    //if user clicks "OK" when asked if they want to delete employee
    if (confirmationPopup)
    {
        $.ajax({
            url: "/deleteAnimal",
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(id),
            complete: function (animal) {
                $('#output').html(animal.responseText);
                reloadAnimalTable();

            }
        });
    }

}

function initializeEditAnimal(animal){
    var id = {
        'Animal ID': animal.id
    };
    $.ajax({
        url: "/searchAnimalByID",
        type: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(id),
        complete: function (animal) {
            var animalInfo = JSON.parse(animal.responseText);
            //insert animal info into inputs so user can edit.
            $("#editedAnimalID").val(animalInfo[0]['Animal ID'])
            $("#editAnimalName").val(animalInfo[0]['Name']);
            $("#editDescription").val(animalInfo[0]['Description']);
            $("#editAge").val(animalInfo[0]['Age']);
            $("#editWeight").val(animalInfo[0]['Weight']);
            $("#editHeight").val(animalInfo[0]['Height']);
            $("#editGender").val(animalInfo[0]['Gender']);

            var list = document.getElementById('editExhibit');
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            var list = document.getElementById('editDietType');
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }

            var list = document.getElementById('editAnimalType');
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }


//Need Animal Type Diet Type and Exhibit like Enclosure


            $.ajax({
                url: "/getIDAndNameOfExhibit",
                type: "POST",
                contentType: "application/json",
                processData: false,
                complete: function (animal) {
                    exhibitData = JSON.parse(animal.responseText);

                    var sel = document.getElementById('editExhibit');
                    for(var i = 0; i < exhibitData.length; i++) {
                        var opt = document.createElement('option');
                        opt.innerHTML = exhibitData[i].Description;
                        opt.value = exhibitData[i].Description;
                        opt.id = exhibitData[i]["Exhibit ID"]
                        sel.appendChild(opt);
                        if(animalInfo[0]['Exhibit ID'] !== null && animalInfo[0]['Exhibit ID'] === exhibitData[i]["Exhibit ID"]) {
                            $("#editExhibit option:contains("+ exhibitData[i]['Description']+ ")").prop('selected',true);


                        }
                    }
                }
            });


            $.ajax({
                url: "/getIDAndNameOfDietType",
                type: "POST",
                contentType: "application/json",
                processData: false,
                complete: function (animal) {
                    dietData = JSON.parse(animal.responseText);

                    var sel = document.getElementById('editDietType');
                    sel.appendChild(optnull);
                    for(var i = 0; i < dietData.length; i++) {
                        var opt = document.createElement('option');
                        opt.innerHTML = dietData[i].Name;
                        opt.value = dietData[i].Name;
                        opt.id = dietData[i]["Diet Type ID"]
                        sel.appendChild(opt);
                        if(animalInfo[0]['Diet Type ID'] !== null && animalInfo[0]['Diet Type ID'] === dietData[i]["Diet Type ID"]) {
                            $("#editDietType option:contains("+ dietData[i]['Name']+ ")").prop('selected',true);


                        }
                    }
                }
            });

            $.ajax({
                url: "/getIDAndNameOfAnimalType",
                type: "POST",
                contentType: "application/json",
                processData: false,
                complete: function (animal) {
                    animalsData = JSON.parse(animal.responseText);

                    var sel = document.getElementById('editAnimalType');
                    sel.appendChild(optnull);
                    for(var i = 0; i < animalsData.length; i++) {
                        var opt = document.createElement('option');
                        opt.innerHTML = animalsData[i].Name;
                        opt.value = animalsData[i].Name;
                        opt.id = animalsData[i]["Animal Type ID"]
                        sel.appendChild(opt);
                        if(animalInfo[0]['Animal Type ID'] !== null && animalInfo[0]['Animal Type ID'] === animalsData[i]["Animal Type ID"]) {
                            $("#editAnimalType option:contains("+ animalsData[i]['Name']+ ")").prop('selected',true);


                        }
                    }
                }
            });
        }
    });
    $("#dialog-form-edit").dialog("open");
}






function reloadAnimalTable(){
    $.ajax({
        url: "/getAllAnimal",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (animal) {
            CreateAnimalTableFromJSON(JSON.parse(animal.responseText));
        }
    });
}

function initializeInsertAnimalFields(){
    $("#animalName").val("");
    $("#description").val("");
    $("#age").val("");
    $("#weight").val("");
    $("#height").val("");
    $("#gender").val("");



    var list = document.getElementById('exhibit');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    var list = document.getElementById('dietType');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    var list = document.getElementById('animalType');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    $.ajax({
        url: "/getIDAndNameOfExhibit",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (animal) {
            var exhibitData = JSON.parse(animal.responseText);
            var sel = document.getElementById('exhibit');
            for(var i = 0; i < exhibitData.length; i++) {
                var opt = document.createElement('option');
                opt.innerHTML = exhibitData[i].Description;
                opt.value = exhibitData[i].Description;
                opt.id = exhibitData[i]["Exhibit ID"]
                sel.appendChild(opt);
            }
        }
    });


    $.ajax({
        url: "/getIDAndNameOfDietType",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (animal) {
            dietData = JSON.parse(animal.responseText);

            var sel = document.getElementById('dietType');
            for(var i = 0; i < dietData.length; i++) {
                var opt = document.createElement('option');
                opt.innerHTML = dietData[i].Name;
                opt.value = dietData[i].Name;
                opt.id = dietData[i]["Diet Type ID"]
                sel.appendChild(opt);
            }
        }
    });


    $.ajax({
        url: "/getIDAndNameOfAnimalType",
        type: "POST",
        contentType: "application/json",
        processData: false,
        complete: function (animal) {
            animalsData = JSON.parse(animal.responseText);

            var sel = document.getElementById('animalType');
            for(var i = 0; i < animalsData.length; i++) {
                var opt = document.createElement('option');
                opt.innerHTML = animalsData[i].Name;
                opt.value = animalsData[i].Name;
                opt.id = animalsData[i]["Animal Type ID"]
                sel.appendChild(opt);
            }
        }
    });

    $("#dialog-form-insert").dialog("open");
    $("#dataTable").tablesorter();

}



function CreateAnimalTableFromJSON(myData) {
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
    table.setAttribute('id', 'animalTable');

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
        tabcelldelete.innerHTML = "<span id='" + rowID +"' onclick='deleteAnimal(this)' class='table-remove glyphicon glyphicon-remove'></span>"
        tabcelledit.innerHTML = "<span id='" + rowID +"' onclick='initializeEditAnimal(this)' class='table-edit glyphicon glyphicon-edit'></span>"

    }

    //delete previous table
    $("#animalTable").remove();

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showAnimal");
    divContainer.appendChild(table);

    $("#animalTable").tablesorter();
}

function insertAnimal(){
    var exhibit = document.getElementById("exhibit");
    var dietType = document.getElementById("dietType");
    var animalType = document.getElementById("animalType");

    var entry;



    {
        entry = {
            'Name': $("#name").val(),
            'Description': $("#description").val(),
            'Exhibit ID': exhibit.options[exhibit.selectedIndex].id,
            'Diet Type ID': dietType.options[dietType.selectedIndex].id,
            'Animal Type ID': animalType.options[animalType.selectedIndex].id,
            'Age': $("#age").val(),
            'Weight': $("#weight").val(),
            'Height': $("#height").val(),
            'Gender': $("#gender").val()
        };
    }

    $.ajax({
        url: "/addAnimal",
        type: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(entry),
        complete: function (animal) {
            $('#output').html(animal.responseText);
            reloadAnimalTable();
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

                var exhibit = document.getElementById("editExhibit");
                var dietType = document.getElementById("editDietType");
                var animalType = document.getElementById("editAnimalType");
                var entry;



                {
                    entry = {
                        'Name': $("#editAnimalName").val(),
                        'Description': $("#editDescription").val(),
                        'Exhibit ID': exhibit.options[exhibit.selectedIndex].id,
                        'Diet Type ID': dietType.options[dietType.selectedIndex].id,
                        'Animal Type ID': animalType.options[animalType.selectedIndex].id,
                        'Age': $("#editAge").val(),
                        'Weight': $("#editWeight").val(),
                        'Height': $("#editHeight").val(),
                        'Gender': $("#editGender").val()
                    };
                }


               $.ajax({
                    url: "/editAnimalByID/" + $("#editedAnimalID").val(),
                    type: "POST",
                    contentType: "application/json",
                    processData: false,
                    data: JSON.stringify(entry),
                    complete: function (animal) {
                        $('#output').html(animal.responseText);

                    }
                });

                reloadAnimalTable();

                $(this).dialog("close");
                reloadAnimalTable();
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

                insertAnimal();

                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () { }
    });

    setTimeout(function(){
        reloadAnimalTable();
    },400);

    $('#animal-name').keyup(function() {
        var $rows = $('#animalTable tbody  tr');

        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

        $rows.show().filter(function() {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });

    $('#getAllAnimal').click(function () {
        reloadAnimalTable();
    });
    $("#animalTable").tablesorter();
});


