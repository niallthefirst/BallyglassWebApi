$(document).ready(function () {
    displayChangingQuote();
});


var displayChangingQuote = function () {
    
    $.ajax("/resources/datajson.js",
            { dataType: "json" })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("fail " + errorThrown);
        })
        .done(function (data, textStatus, jqXHR) {

            showQuote(data.testimonials);
            setInterval(function () { showQuote(data.testimonials); }, 10000);

        }
    );

};

//var displayChangingQuote = function () {
//    $.ajax("/resources/dataraw.js",
//            { dataType: "script" })
//        .fail(function (jqXHR, textStatus, errorThrown) {
//            console.log("fail " + errorThrown);
//        })
//        .done(function (data, textStatus, jqXHR) {

//            var myarray = [];
//            var myJSONString = "";
//            var myJSONObject;
//            for (var i = 0; i < testimonialsArray.length; i++) {
//                var item = {
//                    "name": testimonialsArray[i][1],
//                    "comment": testimonialsArray[i][3],
//                    "date": testimonialsArray[i][0]
//                };

//                myarray.push(item);
//            }

//            myJSONString = JSON.stringify({ testimonials: myarray });
//            myJSONObject = JSON.parse(myJSONString);

//            showQuote(myJSONObject.testimonials);
//            setInterval(function () { showQuote(myJSONObject.testimonials); }, 10000);
//        }
//    );
//};


var showQuote = function (testimonials) {

 
    var quoteIndex = getQuoteIndex(testimonials.length);

    var value = testimonials[quoteIndex];

    var blockquoteP = $("blockquote > p");
    var footerdate = $("blockquote > footer > span");
    var footercite = $("blockquote > footer > cite");

    
    blockquoteP.text(value.comment);
    footerdate.text(value.date);
    footercite.text(value.name);
};

var getQuoteIndex = function (testimonialCount) {
    var randnumber = Math.random() * 1000;
    randnumber = parseInt(randnumber);

    return randnumber % testimonialCount;
    
};
