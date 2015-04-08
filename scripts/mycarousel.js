/// <reference path="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"/>

//$(document).ready(function () {

//    console.log("images ready");

//    carouselModule.Draw();
//});

var carouselModule = (function () {

    //privates

    var drawImage = function (imageUrl) {
        $("#image").attr("src", imageUrl);
    }
    function drawCarousel(arrayOfURIs) {
        //var indicator = $("ol.carousel-indicators");
        var inner = $("div.carousel-inner");

        //add a li for each image.
        //indicator.append("<li data-target='#myCarousel' data-slide-to='0' class='active'></li>");

        var url = arrayOfURIs[0];
        var altText = "Ballyglass Irish Thatched Cottage " + url.substr(("images/carousel").length + 1);
        //add each image to the inner
        inner.append("<div class='item active'><img src='" + url + "' class='img-responsive' alt='" + altText + "' ></div>");

        //Delay loading of individual images.
        var index = 1;
        var interval = setInterval(function () {
            url = window.location.origin + "//" + arrayOfURIs[index];
            drawImageInCarousel(inner, index, url);
            if (index >= arrayOfURIs.length - 1) {
                clearInterval(interval);
            }
            index++;
        }, 2000);
    }
    function drawImageInCarousel(inner, index, url) {
        var altText = "Ballyglass Irish Thatched Cottage " + url.substr(("Images").length + 1);
        //indicator.append("<li data-target='#myCarousel' data-slide-to='" + index + "'></li>");
        inner.append("<div class='item'><img src='" + url + "' class='img-responsive' alt='" + altText + "' ></div>");
    }

    function draw() {

        console.log("Draw Carousel");

        $.ajax({
            dataType: "json",
            url: 'api/Images',
            type: 'GET'
        })
                .fail(function (jqXHR, textStatus, errorThrown) {
                     errorModule.Write("fail " + errorThrown);
                })
                .done(function (data, textStatus, jqXHR) {
                    drawCarousel(data);
                }
            );
    }

    return {
        //publics
        Draw: draw
    };

})();



