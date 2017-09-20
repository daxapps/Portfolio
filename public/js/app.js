$(document).ready(function(){
  
  // declaring jquery selectors
  var $window = $(window);
  var $logo = $('#logo');
  var $row = $('.row');
  var $contact = $('#contact-section');
  var $footer = $('#footer');
  var $overlay = $('.overlay-container');
  var $masthead = $('#masthead');
  
  $window.on('load', function(){
    $('#loader-wrapper').fadeOut('slow');
  });
  
  // scrolling effects
  $window.scroll(function(){
    // declaring windowscroll
    var windowScroll = $(this).scrollTop();
    
    // masthead parallax effect
    $logo.css({
      'transform': 'translate(0px, ' + windowScroll/2 + '%)'
    });
   
    // project section parallax effect
    $row.each(function(i){
      // won't trigger until the rows are within 50% of the browser
      if(windowScroll > $row.eq(i).offset().top - ($window.height() / 1.3)) {
        if(i % 2 === 0) {
          $row.eq(i).addClass('evenshow');
        } else {
          $row.eq(i).addClass('oddshow');
        }
      }
    });
    
    // form fade effect
    if(windowScroll > $contact.offset().top - ($window.height() / 1.4)) {
      $('form').css('opacity', '1');
    }
    
    // footer fade effect
    window.requestAnimationFrame(function(){
      if(windowScroll > 0) {
        $footer.fadeIn('slow');
      } else {
        $footer.fadeOut('slow');
      }
    });
    
  });
  
  // footer hover animation 
  $footer.on('mouseenter', function(){
    $(this).animate({'opacity': '1'}, 500);
  }).on('mouseleave', function(){
    // $(this).animate({'opacity': '0.5'}, 500);
  });
  
  // footer link for scrolling to contact form
  $('#scroll-to-contact').click(function(e){
    e.preventDefault();
    $('body').animate({scrollTop: $('#contact-section').offset().top}, 1000);
  });
  
  // project section overlay
  $overlay.on('mouseenter', function(){
    $(this).children('img').addClass('zoom-in');
    $(this).children('.overlay').fadeToggle('slow');
  }).on('mouseleave', function(){
    $(this).children('img').removeClass('zoom-in');
    $(this).children('.overlay').fadeToggle('slow');
  });
});