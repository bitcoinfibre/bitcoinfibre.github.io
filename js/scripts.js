var mr_firstSectionHeight,
    mr_nav,
    mr_fixedAt,
    mr_navOuterHeight,
    mr_navScrolled = false,
    mr_navFixed = false,
    mr_outOfSight = false,
    mr_floatingProjectSections,
    mr_scrollTop = 0;

function handleScroll() {
	if ($(this).scrollTop() >= $(".section:not(.page-title)")[0].offsetTop) {
		$("nav.fixed").removeClass("outOfSight");
		$("nav.fixed").addClass("scrolled");
	} else {
		$("nav.fixed").removeClass("scrolled");
		$("nav.fixed").addClass("outOfSight");
	}
}

$(document).ready(function() { 
    "use strict";

    // Smooth scroll to inner links
    
    $('.inner-link').each(function(){
        var href = $(this).attr('href');
        if(href.charAt(0) !== "#"){
            $(this).removeClass('inner-link');
        }
    });

	if($('.inner-link').length){
		$('.inner-link').smoothScroll({
			offset: -55,
			speed: 800
		});
    }

    // Update scroll variable for scrolling functions

    addEventListener('scroll', function() {
        mr_scrollTop = window.pageYOffset;
    }, false);

    // Append .background-image-holder <img>'s as CSS backgrounds

    $('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', 'initial');
    });

    // Fade in background images

    setTimeout(function() {
        $('.background-image-holder').each(function() {
            $(this).addClass('fadeIn');
        });
    }, 200);

    // Icon bulleted lists

    $('ul[data-bullet]').each(function(){
        var bullet = $(this).attr('data-bullet');
        $(this).find('li').prepend('<i class="'+bullet+'"></i>');
    });

    // Progress Bars

    $('.progress-bar').each(function() {
        $(this).css('width', $(this).attr('data-progress') + '%');
    });

    // Fix nav to top while scrolling

	$(".main-container").scroll(handleScroll);
	$(document).scroll(handleScroll);
	handleScroll();

    // Menu dropdown positioning

    $('.menu > li > ul').each(function() {
        var menu = $(this).offset();
        var farRight = menu.left + $(this).outerWidth(true);
        if (farRight > $(window).width() && !$(this).hasClass('mega-menu')) {
            $(this).addClass('make-right');
        } else if (farRight > $(window).width() && $(this).hasClass('mega-menu')) {
            var isOnScreen = $(window).width() - menu.left;
            var difference = $(this).outerWidth(true) - isOnScreen;
            $(this).css('margin-left', -(difference));
        }
    });

    // Mobile Menu

    $('.mobile-toggle').click(function() {
        $('.nav-bar').toggleClass('nav-open');
        $(this).toggleClass('active');
    });

    $('.menu li').click(function(e) {
        if (!e) e = window.event;
        e.stopPropagation();
        if ($(this).find('ul').length) {
            $(this).toggleClass('toggle-sub');
        } else {
            $(this).parents('.toggle-sub').removeClass('toggle-sub');
        }
    });

    $('.menu li a').click(function() {
        if ($(this).hasClass('inner-link')){
            $(this).closest('.nav-bar').removeClass('nav-open');
        }
    });

    $('.module.widget-handle').click(function() {
        $(this).toggleClass('toggle-widget-handle');
    });

    $('.search-widget-handle .search-form input').click(function(e){
        if (!e) e = window.event;
        e.stopPropagation();
    });

    // Accordions

    $('.accordion li').click(function() {
        if ($(this).closest('.accordion').hasClass('one-open')) {
            $(this).closest('.accordion').find('li').removeClass('active');
            $(this).addClass('active');
        } else {
            $(this).toggleClass('active');
        }
        if(typeof window.mr_parallax !== "undefined"){
            setTimeout(mr_parallax.windowLoad, 500);
        }
    });

    // Disable parallax on mobile

    if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        $('section').removeClass('parallax');
        $('div').removeClass('parallax');
    }
}); 

$(window).load(function() { 
    "use strict";

    mr_firstSectionHeight = $('.main-container section:nth-of-type(1)').outerHeight(true);
}); 
