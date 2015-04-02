$(document).ready(function () {


    $("#buttonLoadIndex").click(function (event) {
        event.preventDefault();
        loadContent('index.htm');
    });

    $("#buttonLoadTestimonials").click(function (event) {
        event.preventDefault();
        loadContent('testimonials.htm');
    });
    
    $("#buttonLoadCalendar").click(function (event) {
        event.preventDefault();
        loadContent('calendar.htm');
    });

    $("#buttonLoadBookings").click(function (event) {
        event.preventDefault();
        loadContent('bookings.htm');
    });
        


   

});


var loadContent = function (filename) {

    $("#main").load(filename + " #main > *",
        function () {
            getImages();
            getTestimonials();
        }
    );

};



