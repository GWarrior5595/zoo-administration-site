$(document).ready(function(){
    $(function(){
        $("#nav-placeholder").load("/navbar"); 
    });


    $('#allEmployees').click(function () {
        $.ajax({
            url: "/allEmployees",
            type: "POST",
            contentType: "application/json",
            processData: false,
            complete: function (data) {
                $('#output').html(data.responseText);
            }
        });
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
                $('#output').html(data.responseText);
            }
        });
    });
});