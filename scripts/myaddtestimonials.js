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
        //http://localhost:20487/index.htm?niall%20fallon|nfallon2002@yahoo.com|2011
        var cypher = getQueryString();
        if (cypher == undefined) 
            errorModule.Write("Error, query string is required, none found.");


        var decrypted = decodeURI(cypher);//todo replace with real C# Decode.

        var userDetails = processQueryString(decrypted);

        if (userDetails == undefined || userDetails == null)
            errorModule.Write("Error, query string does not contain correct user details. " + userDetails);

        populateControls(userDetails);

    }
    function getQueryString() {
        var cypher = document.URL.split('?')[1];
        return cypher;
        
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
        Draw: draw,
        GetQueryString: getQueryString
     

    };


    
})();



