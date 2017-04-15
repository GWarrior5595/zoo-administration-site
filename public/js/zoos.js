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

//samad's
//                   document.getElementById("cardsContainer").innerHTML += "<div class='col-lg-6 col-sm-6'> <div class='card'><a href='enclosure' class='fill-div'><div class='content'> <div class='row'> <div class='col-xs-5'> <div class='icon-big icon-warning text-center'> <i class='ti-linux'></i> </div> </div> <div class='col-xs-7'> <div class='exhibit'> <p>" + element['Description'] + "</p>  </div> </div> </div> </div> </div></a>

                    console.log(element['Name'])
                }, this)
            }
        });
    }, 300);

});