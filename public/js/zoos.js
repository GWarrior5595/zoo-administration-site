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
                   document.getElementById("cardsContainer").innerHTML += '<div class="flip3D"> <div class="back">Box 1 - Back</div><div class="front">Zoo Name</div> </div>'

                    console.log(element['Name'])
                }, this)
            }
        });
    }, 300);

});