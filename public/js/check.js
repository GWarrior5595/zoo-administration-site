
$.ajax({
    url: "/getAllAnimal",
    type: "POST",
    contentType: "application/json",
    processData: false,
    complete: function (animalData) {
        var animalJSON = JSON.parse(animalData.responseText);
        console.log(animalJSON);
        //forEach, load exhibit card
    }
});
