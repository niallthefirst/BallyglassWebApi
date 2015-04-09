/// <reference path="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"/>
//$(document).ready(function () {
//    //console.log("ready");

//    testimonialModule.DrawAllAtOnce();

//    //$("#Add").click(function () {
//    //    var data = {
//    //        "Name": "name",
//    //        "Comment": "comment",
//    //        "Date": "2014"
//    //    };

//    //    addTestimonial(data);
//    //});

//    //$("#GetAll").click(function () {
//    //    testimonialModule.DrawOneAtATime();
//    //});


//    //$("#Get").click(function () {
//    //    var value = $("#id").val();
//    //    getSingleTestimonial(value);
//    //});


//});

var addTestimonialModule = (function () {

    //Privates
    function decrypt(cypher) {
        $.ajax({
            dataType: "json",
            url: 'api/EncryptDecrypt/?cypher=' + cypher,
            type: 'GET',

        })
            .fail(function (jqXHR, textStatus, errorThrown) {
                errorModule.Write("fail " + errorThrown);
            })
            .done(function (data, textStatus, jqXHR) {
    
                if (data == undefined || data == null)
                    errorModule.Write("Error, query string does not contain correct user details. " + data);

                populateControls(data);
            }
        );
    }


    function draw() {
        //http://localhost:20487/index.htm?oi3O2UZtGo3VjfKW9w7NHB1i35o5M6PmmwJn9NkOamxdCBkNHwC1687mBUPf46bn
        var cypher = getQueryString();
        if (cypher == undefined) 
            errorModule.Write("Error, query string is required, none found.");


        decrypt(cypher);//todo replace with real C# Decode.

        

    }

    function getQueryString() {
        var cypher = document.URL.split('?')[1];
        return cypher;
        
    }

    function populateControls(testimonial) {
        
        var nameControl = $("#Name");
        var emailControl = $("#Email");
        var dateControl = $("#Date");

        nameControl.val(testimonial.Name);
        //emailControl.val(email);
        dateControl.val(testimonial.Date);
    }

    return {
        //Publics
        Draw: draw,
        GetQueryString: getQueryString
     

    };


    
})();



