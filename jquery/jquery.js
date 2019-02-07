$(document).ready(function() {
    
    //to calculate the nav height 
    var navbarHeight = $('.navbar').outerHeight();
    
    $('.slide-section').click(function(e){
        var linkHref = $(this).attr('href');
        
        $('html, body').animate({
            scrollTop: $(linkHref).offset().top - navbarHeight
        });
        
        
        //to prevent the # to be added at the end of the the URL
        e.preventDefault(); 
    });
    
    
    // increasing the icons font zize when hovered
   $(".fa").mouseenter(function(){
       $(this).addClass("fa-font-size");
    });
    
    $(".fa").mouseleave(function(){
        $(this).removeClass("fa-font-size");
    });
    
    // to get the user selection and display on the map
    $('#hotel').click(function() {
        $('button').removeClass('selected');
        $(this).addClass('selected');
        $('#place').text('hotel'); //Adds the place type name to the #place and #placeCount placeholers in the info windows------------
          
    });
       
    $('#store').click(function() {
        $('button').removeClass('selected');
        $(this).addClass('selected');
        $('#place').text('stores');
          
    });
   
   $('#bar').click(function() {
      $('button').removeClass('selected');
      $(this).addClass('selected');
      $('#place').text('bars');
      
   });
   
   $('#restaurant').click(function() {
      $('button').removeClass('selected');
      $(this).addClass('selected');
      $('#place').text('restaurants');
    
   });
       
   $('#museum').click(function() {
      $('button').removeClass('selected');
      $(this).addClass('selected');
      $('#place').text('museum');
      
   });

    
    //   remove the old marker for each place selected
    $('.place-type').children().click(function() {
          clearMarkers();
    });
    
})