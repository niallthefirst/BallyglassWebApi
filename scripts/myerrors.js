/// <reference path="jquery-1.9.0-vsdoc.js" />
/// <reference path="jquery-1.9.0.js" />

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