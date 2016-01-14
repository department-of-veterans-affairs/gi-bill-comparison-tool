(function( $ ){

  $(document).ready(function(){

    var current_width = $(window).width();

    if(current_width < 481)
      $('#panel-filters').removeClass("active");

    else if(current_width >= 481)
      $('#panel-filters').addClass("active");
  });

})( jQuery );