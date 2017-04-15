$(document).ready(function(){

    var seriesLabel = []

    setTimeout(function(){
        $.ajax({
            url: "/getAllZoos",
            type: "POST",
            contentType: "application/json",
            processData: false,
            complete: function (data) {
                var allZoos = JSON.parse(data.responseText)
                var description = allZoos[0]['Name'];
                seriesLabel.push(description);
                allZoos.forEach(function(element){
                    var id = {
                        'Zoo ID': element['Zoo ID']
                    };
                                //flip card
                                         document.getElementById("cardsContainer").innerHTML
                                            //back 
                                         += "<div class='flip3D'>"
                                            + "<div class='back'>"
                                                    +"<b>Information: </b><br>" + element['Street Address'] + "<br>"
                                                    + " " + element['City'] + ", " + element['State'] + " " + element['Zip Code']
                                                    + "<br>" + element["Phone"] 
                                                    + "<br>" + element['Operation Hours']
                                            + "</div>"
                                            
                                            //front
                                            + "<div class='front'><p>" 
                                                    + "Zoo ID: " + element['Zoo ID'] 
                                                    + "<br>" 
                                                    + "Zoo name: " + element['Name'] + "</p></div>"
                                         + "</div>"


                    console.log(element['Name'])
                }, this)
            }
        });
    }, 300);

});









//add new zoo
function insertZoo(){
    var enclosure = document.getElementById("enclosure");
    var shop = document.getElementById("shop");
    var today = new Date();

    var nullValue = null;


   
        entry = {
            'Zoo ID': 1,
            'First Name': $("#firstName").val(),
            'Last Name': $("#lastName").val(),
            'Enclosure ID': enclosure.options[enclosure.selectedIndex].id,
            'Shop ID': shop.options[shop.selectedIndex].id,            
            'Job Desciption': $("#jobDescription").val(),
            'Hire Date': today,
            'Shifts': $("#shift").val(),
            'Salary': salaryMinimum
        };
    

    $.ajax({
        url: "/addZoo",
        type: "POST",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(entry),
        complete: function (data) {
            $('#output').html(data.responseText);
            //reloadEmployeeTable();
        }
    });

    $("#dialog-form-insert").dialog("close");    
    document.getElementById('topPage').scrollIntoView();
}