/*global jQuery */

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {

      var div = document.createElement('div'),
          ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0],
          cssStyles = '&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>';

      div.className = 'fit-vids-style';
      div.id = 'fit-vids-style';
      div.style.display = 'none';
      div.innerHTML = cssStyles;

      ref.parentNode.insertBefore(div,ref);

    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='google.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

;(function ($, window, document, undefined) {
  
  var pluginName = "readingTime";
  
  var defaults = {
    bubble: '#scrollbubble'
  };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.scroll_timer = null;
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      $(window).scroll($.proxy(this.updateTime, this));
      $('<div id="scrollbubble"></div>').appendTo("body");
      $('<style>#scrollbubble{display:none;position:fixed;bottom:20px;right:20px;z-index:500;background-color:#F0F0F0;color:#808080;border-radius:3px;font-family:Georgia;font-size:12px;text-transform:uppercase;letter-spacing:1px;padding:10px 20px}#scrollbubble:after{content:" ";position:absolute;top:50%;right:-8px;height:0;width:0;margin-top:-4px;border:4px solid transparent;border-left-color:#F0F0F0}</style>').appendTo('body');
    },
    updateTime: function () {
      var total_reading_time = 0,
        bubble = $(this.options.bubble),
        post_content = $(this.element);
      var viewportHeight = $(window).height(),
       scrollbarHeight = viewportHeight / $(document).height() * viewportHeight,
       progress = $(window).scrollTop() / ($(document).height() - viewportHeight),
       distance = progress * (viewportHeight - scrollbarHeight) + scrollbarHeight / 2 - bubble.height() / 2;
      var total_reading_time = this.calculate_total_time_words(post_content, this.element) / 60;
      var total_reading_time_remaining = Math.ceil(total_reading_time - (total_reading_time * progress));
      var text = '';

      if(total_reading_time_remaining > 1) {
        text = total_reading_time_remaining + ' minutes left';
      } else if(progress >= 1) {
        text = 'Thanks for reading';
      } else if (total_reading_time_remaining <= 1) {
        text = '1 minute left';
      }

      bubble
        .text(text)
        .fadeIn(500);

      // Fade out the annotation after 1 second of no scrolling.
      if (this.scroll_timer !== null) {
        clearTimeout(this.scroll_timer);
      }

      this.scroll_timer = setTimeout(function() {
        bubble.fadeOut();
      }, 1500);
    },
    calculate_total_time_words: function(post_content, element){
      var total = 0;
      post_content.each(function() {
        total += Math.round(60*$(element).text().split(' ').length/200); // 200 = number of words per minute
      });

      return total;
    }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);

jQuery(function( $ ){

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
jQuery(function( $ ){

    // Enable parallax and fade effects on front page sections
    $(window).scroll(function(){

        scrolltop = $(window).scrollTop()
        scrollwindow = scrolltop + $(window).height();

        $(".front-page").css("backgroundPosition", "50% " + -(scrolltop/6) + "px");

    });

    // Image Section Height
    var windowHeight = $(window).height() - parseFloat(300);
    
    $('.image-section') .css({'height': windowHeight +'px'});
        
    $(window).resize(function(){
    
    var windowHeight = $(window).height() - parseFloat(300);
    
        $('.image-section') .css({'height': windowHeight +'px'});
    
    });


	// FITVIDS
	jQuery(".postbody").fitVids();
    jQuery(".excerpt").fitVids();
	
	// READING TIME
	if(config.readingtime == true){
		$(".postbody").readingTime();
	}

    // FEATURE SCROLL
    $(".movedown").click(function(){
    $("html, body").animate({scrollTop: $('.cover').height()}, 1000);
    }); 
    
});