/// <reference path="jquery-2.1.3.js" />
/// <reference path="jquery-2.1.3.intellisense.js" />

$(document).ready(function () {
    console.log("testimonials ready");

    getTestimonials();

    //$("#Add").click(function () {
    //    var data = {
    //        "Name": "name",
    //        "Comment": "comment",
    //        "Date": "2014"
    //    };

    //    addTestimonial(data);
    //});

    //$("#GetAll").click(function () {
    //    getTestimonials();
    //});


    //$("#Get").click(function () {
    //    var value = $("#id").val();
    //    getSingleTestimonial(value);
    //});


});


var addTestimonial = function (dataJSON) {

    $.ajax({
        dataType: "json",
        url: 'api/Testimonials',
        type: 'POST',
        data: dataJSON
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("fail " + errorThrown);
        })
        .done(function (data, textStatus, jqXHR) {
            console.log(data);

        });


};

var getSingleTestimonial = function (id) {

    $.ajax({
        dataType: "json",
        url: 'api/Testimonials/' + id,
        type: 'GET',

    })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("fail " + errorThrown);
        })
        .done(function (data, textStatus, jqXHR) {
            //var jsonData = JSON.stringify(data);
            var message = JSON.stringify(data);

            console.log(message);
        }
    );

};

var getTestimonials = function () {

    $.ajax({
        dataType: "json",
        url: 'api/Testimonials',
        type: 'GET'
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("fail " + errorThrown);
        })
        .done(function (data, textStatus, jqXHR) {
            //var jsonData = JSON.stringify(data);
            var message;
            $.each(data, function (index, value) {
                message += " | " + JSON.stringify(value);
            });
            console.log(message);
        }
    );

};

