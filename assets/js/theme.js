/*global jQuery */

$(".menu_button").click(function() {
        $(".header").toggleClass("open")
    });

// $(window).scroll(function() {    
//     var scroll = $(window).scrollTop();
//     if (scroll >= 500) {
//         $(".navigation").addClass("down");
//     }
// }); 

    $(window).scroll(function(){
        /** Get the scroll position of the page */
        var scrollPos = $("body").scrollTop();
        /** Scroll and fade out the banner text */
        $('.introText').css({
            'margin-top' : -( scrollPos / 3 ) + "px",
            'opacity' : 1 - ( scrollPos / 200 ),
            '-ms-filter' : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + 1 - ( scrollPos / 300 ) + ')'
        });

    });
