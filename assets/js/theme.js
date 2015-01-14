/*global jQuery */

jQuery(function( $ ){

    // Image Section Height
    var windowHeight = $(window).height() - parseFloat(300);
    
        $('.image-section') .css({'height': windowHeight +'px'});
        
        $(window).resize(function(){
    
    var windowHeight = $(window).height() - parseFloat(300);
    
        $('.image-section') .css({'height': windowHeight +'px'});
    
    });

    // Enable parallax and fade effects on front page sections
    $(window).scroll(function(){

        scrolltop = $(window).scrollTop()
        scrollwindow = scrolltop + $(window).height();

        $(".front-page").css("backgroundPosition", "50% " + -(scrolltop/6) + "px");

    });

    // Add light class to site header after 50px
    $(document).on("scroll", function(){

        if($(document).scrollTop() > 50){
            $(".site-header").addClass("light");            

        } else {
            $(".site-header").removeClass("light");         
        }

    });

    $(".nav-primary .genesis-nav-menu").addClass("responsive-menu").before('<div class="responsive-menu-icon"></div>');

    $(".responsive-menu-icon").click(function(){
        $(this).next(".nav-primary .genesis-nav-menu").slideToggle();
    });

    $(window).resize(function(){
        if(window.innerWidth > 768) {
            $(".nav-primary .genesis-nav-menu").removeAttr("style");
            $(".responsive-menu > .menu-item").removeClass("menu-open");
        }
    });

});




