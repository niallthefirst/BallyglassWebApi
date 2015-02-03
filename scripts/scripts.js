
var quoteIntervalId = 0;
var arrQuotes = [];
var arrCites = [];

var showQuote = function() {
    var randnumber = Math.random() * 1000;
    randnumber = parseInt(randnumber);
    var count_quotes = arrQuotes.length;
    var quoteindex = randnumber % count_quotes;
    var blockquotesText = $(".blockquoteText").get();
        var cites = $("cite").get();

        $.each(blockquotesText, function (index, value) {
            $(value).text(arrQuotes[quoteindex]);
            $(cites[index]).text(" - " + arrCites[quoteindex]);

            if (quoteindex < count_quotes - 1)
                quoteindex = quoteindex + 1;
            else
                quoteindex = 0;

        });

    }

var showQuoteInList = function () {
    $.each(arrQuotes, function (index, value) {
            $('#quotes').append( $('<li/>', {text: value }) );
        });
}


var displayChangingQuote = function () {

    loadTestimonials();
   
    quoteIntervalId = setInterval("showQuote()", 5000);
}

var displayQuoteInList = function () {
    loadTestimonials();
}

var loadTestimonials = function () {

    $.ajax({
        dataType: "json",
        url: 'resources/testimonials.js', //relative to the html file and not the script
        type: 'GET',
        success: function (data) {
            $.each(data, function (key, val) {
                arrQuotes.push(val[3]);
                
                var text = val[1];
                var name = val[2];
                var date = val[0];
                //arrCites.push(text + ", " + name + " (" + date + ")");
                arrCites.push(text + ", " + name);
            });

            showQuoteInList();
        },
        error: function (data) {
            alert('woops!');
        }
    });
}

var displayWebAlbum = function () {
    var settings = {
        username: 'ballyglasscottage',
        albumMaxResults: 6,
        maxResults: 6,
        mode: 'album',
        album: "BallyglassCalendar2013",
        authKey: "Gv1sRgCMOwmcjJlcWW7AE",
        thumbCss: { margin: '5px' },
        showAlbumDescription: false,
        albumsPerPage: 1,
        popupPlugin: "SlimBox",
        slimbox_config: {
            initialWidth: '500px',
            initialHeight: '50px'
        }
    };
    $("#gallerydiv").pwi(settings);

}