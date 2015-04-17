/// <reference path="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"/>

var emailModule = (function () {

    //Privates
    var setup = function() {

        $("#emailForm").submit(function () {

            //var value = $("#Name").val() + "|" + $("#Email").val() + "|" + $("#Date").val();
            var testimonial = {
                "Name": $("#Name").val(),
                "Date": $("#Date").val(),
                "Email": $("#Email").val()
            };
            
            $.ajax({
                dataType: "json",
                url: '../api/Email',
                type: 'POST',
                data: testimonial

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                errorModule.Write("fail " + errorThrown);
            })
            .done(function (data, textStatus, jqXHR) {

                if (data == undefined || data == null)
                    errorModule.Write("Error, there's been a problem sending the email. " + data);

                $("#Name").prop('disabled', true);
                $("#Date").prop('disabled', true);
                $("#Email").prop('disabled', true);
                $("#success").text(data);
            });

            return false;
        });
        return false;
    }


    
    return {
        //Publics
        Setup: setup

    };


    
})();



