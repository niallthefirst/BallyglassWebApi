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
    function draw() {
        var cypher = getQueryString();

        var decrypted = decodeURI(cypher);

        var userDetails = processQueryString(decrypted);

        if (userDetails == undefined || userDetails == null)
            errorModule.Write("Error, query string does not contain correct user details. " + userDetails);

        populateControls(userDetails);

    }
    function getQueryString() {
        var cypher = document.URL.split('?')[1];
        if (cypher != undefined) {
            return cypher;
        }
        else
            errorModule.Write("Error, query string is required, none found.");
    }

    function processQueryString(decrypted) {
        var userEntries = decrypted.split('|');
        return userEntries;
    }

    function populateControls(qString) {
        var name = qString[0];
        var email = qString[1];
        var date = qString[2];

        var nameControl = $("#Name");
        var emailControl = $("#Email");
        var dateControl = $("#Date");

        nameControl.val(name);
        emailControl.val(email);
        dateControl.val(date);
    }

    return {
        //Publics
        Draw: draw
     

    };


    
})();



