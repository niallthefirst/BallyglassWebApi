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

var testimonialModule = (function () {

    //Privates
    var showQuote = function (testimonials) {
        if (testimonials == null)
        {
            testimonials = new Array();
            var defaultTestimonial = { Name: "Default - Noel & Michelle", Comment: "We had and amazing stay, the cottage is stunning and we will most certainly be back again!", Date: "2011", };
            testimonials.push(defaultTestimonial);
            
        }

        var quoteIndex = getQuoteIndex(testimonials.length);
        var value = testimonials[quoteIndex];
        var blockquoteP = $("blockquote > p");
        var footerdate = $("blockquote > footer > span");
        var footercite = $("blockquote > footer > cite");


        blockquoteP.text(value.Comment);
        footerdate.text(value.Date);
        footercite.text(value.Name);
    };
    var getQuoteIndex = function (testimonialCount) {
        var randnumber = Math.random() * 1000;
        randnumber = parseInt(randnumber);
        return randnumber % testimonialCount;
    };

    var drawAllQuotes = function (testimonials) {

        if (testimonials == null) {
            testimonials = new Array();
            var defaultTestimonial = { Name: "Noel & Michelle", Comment: "We had and amazing stay, the cottage is stunning and we will most certainly be back again!", Date: "2011", };
            testimonials.push(defaultTestimonial);

        }

        $.each(testimonials, function (index, value) {
            var article = $("#alltestimonials");
            var blockquote = "<blockquote><p>" + value.Comment + "</p><footer><span>" + value.Date + "</span><cite>" + value.Name + "</cite></footer></blockquote>";
            article.append(blockquote);
        })
       
    };

    var addTestimonial = function (dataJSON) {
        $.ajax({
            dataType: "json",
            url: 'api/Testimonials',
            type: 'POST',
            data: dataJSON
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
                errorModule.Write("fail " + errorThrown);
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
                errorModule.Write("fail " + errorThrown);
            })
            .done(function (data, textStatus, jqXHR) {
                //var message = JSON.stringify(data);
                //console.log(message);
                var testimonials = new Array();
                testimonials.push(data);
                showQuote(testimonials);
            }
        );
    };

    var showQuoteInterval;
    function drawOneAtATime() {

        console.log("Draw Testimonials One At A Time ");
        $.ajax({
            dataType: "json",
            url: 'api/Testimonials',
            type: 'GET'
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
                errorModule.Write("fail " + errorThrown);
            })
            .done(function (data, textStatus, jqXHR) {
                showQuote(data);
                showQuoteInterval = setInterval(function () { showQuote(data); }, 10000);
            });

    }

    function drawAllAtOnce() {

        console.log("Draw Testimonials All At Once ");

        clearInterval(showQuoteInterval);

        $.ajax({
            dataType: "json",
            url: 'api/Testimonials',
            type: 'GET'
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
                errorModule.Write("fail " + errorThrown);
            })
            .done(function (data, textStatus, jqXHR) {
                drawAllQuotes(data);
                
            });

    }

    return {
        //Publics
        DrawOneAtATime: drawOneAtATime,
        DrawAllAtOnce: drawAllAtOnce

    };


    
})();



