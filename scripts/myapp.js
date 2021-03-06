﻿$(function () {
    var default_view = 'grid';
    if ($.cookie('view') !== 'undefined') {
        $.cookie('view', default_view, { expires: 7, path: '/' });
    }
    function get_grid() {
        $('.list').removeClass('list-active');
        $('.grid').addClass('grid-active');
        $('.prod-cnt').animate({ opacity: 0 }, function () {
            $('.prod-cnt').removeClass('dbox-list');
            $('.prod-cnt').addClass('dbox');
            $('.prod-cnt').stop().animate({ opacity: 1 });
        });
    }
    function get_list() {
        $('.grid').removeClass('grid-active');
        $('.list').addClass('list-active');
        $('.prod-cnt').animate({ opacity: 0 }, function () {
            $('.prod-cnt').removeClass('dbox');
            $('.prod-cnt').addClass('dbox-list');
            $('.prod-cnt').stop().animate({ opacity: 1 });
        });
    }
    if ($.cookie('view') == 'list') {
        $('.grid').removeClass('grid-active');
        $('.list').addClass('list-active');
        $('.prod-cnt').animate({ opacity: 0 });
        $('.prod-cnt').removeClass('dbox');
        $('.prod-cnt').addClass('dbox-list');
        $('.prod-cnt').stop().animate({ opacity: 1 });
    }

    if ($.cookie('view') == 'grid') {
        $('.list').removeClass('list-active');
        $('.grid').addClass('grid-active');
        $('.prod-cnt').animate({ opacity: 0 });
        $('.prod-cnt').removeClass('dboxlist');
        $('.prod-cnt').addClass('dbox');
        $('.prod-cnt').stop().animate({ opacity: 1 });
    }

    $('#list').click(function () {
        $.cookie('view', 'list');
        get_list()
    });

    $('#grid').click(function () {
        $.cookie('view', 'grid');
        get_grid();
    });

    /* filter */
    $('.menuSwitch ul li').click(function () {
        var CategoryID = $(this).attr('category');
        $('.menuSwitch ul li').removeClass('cat-active');
        $(this).addClass('cat-active');

        $('.prod-cnt').each(function () {
            if (($(this).hasClass(CategoryID)) == false) {
                $(this).css({ 'display': 'none' });
            };
        });
        $('.' + CategoryID).fadeIn();

    });
});


$(window).load(function () {
    $('#slider').nivoSlider({
        prevText: '',
        nextText: '',
        controlNav: false,
    });
});

var testimonialsAlreadyDrawn = false;

$(document).ready(function () {

    // hide #back-top first
    $("#back-top").hide();

    
    $("#testimonials").hide();
    $("#calendar").hide();
    $("#gallery").hide();

    // fade in #back-top
    $(function () {
        $(window).scroll(ScrollHandlerTopFade);

        // Bind to scroll
        $(window).scroll(ScrollHandlerHideShow);


        // scroll body to 0px on click
        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

    });

});

function ScrollHandlerTopFade() {
    if ($(this).scrollTop() > 100) {
        $('#back-top').fadeIn();
    } else {
        $('#back-top').fadeOut();
    }
}
function ScrollHandlerHideShow() {
    
    var topMenuHeight = topMenu.outerHeight() + 15;
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Anchors corresponding to menu items
    var scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });
    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          .parent().removeClass("active")
          .end().filter("[href=#" + id + "]").parent().addClass("active");
    }

    if (id == "templatemo_testimonials") {
        $("#testimonials").show();
        if (testimonialsAlreadyDrawn == false) {
            testimonialsAlreadyDrawn = true;
            testimonialModule.DrawAllAtOnce();
        }
    }
    if (id == "templatemo_calendar") {
        $("#calendar").show();
    }
    if (id == "templatemo_gallery") {
        $("#gallery").show();
    }
}

function toggle_visibility(id) {
    var e = document.getElementById(id);
    if(e.style.display == 'block'){
        e.style.display = 'none';
        $('#togg').text('show footer');
    }
    else {
        e.style.display = 'block';
        $('#togg').text('hide footer');
    }
}

$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

//initiating jQuery
jQuery(function ($) {
    $(document).ready(function () {
        //enabling stickUp on the '.navbar-wrapper' class
        $('.mWrapper').stickUp();
    });
});

//scroll to specific id when click on menu
// Cache selectors
var lastId;
var topMenu = $("#top-menu");
// All list items
var menuItems = topMenu.find("a");


// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});


$('a.menu').click(function(){
    $('a.menu').removeClass("active");
    $(this).addClass("active");
});
 