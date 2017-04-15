$(document).ready(function(){

    var seriesLabel = []

    setTimeout(function(){
        $.ajax({
            url: "/getAllExhibit",
            type: "POST",
            contentType: "application/json",
            processData: false,
            complete: function (data) {
                var allExhibit = JSON.parse(data.responseText)
                var description = allExhibit[0]['Description'];
                seriesLabel.push(description);
                allExhibit.forEach(function(element){
                    var id = {
                        'Exhibit ID': element['Exhibit ID']
                    };
                   document.getElementById("cardsContainer").innerHTML += '<div class="flip3D"> <div class="back">Box 1 - Back</div><div class="front">Box 1 - Front</div> </div>'

                    console.log(element['Description'])
                }, this)
            }
        });
    }, 300);


});