/// <reference path="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"/>

var errorModule = (function () {

    //Privates
    function write(message) {

        console.log("Error thrown: " + message);
        
    }

    return {
        //Publics
        Write: write

    };



})();