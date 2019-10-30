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
    
    // Get the user selection for hotel to display on the map
    $('#hotel').click(function() {
        $('button').removeClass('selected'); 
        $(this).addClass('selected');
        $('#place').text('hotel'); 
          
    });
    
    // Get the user selection for bar to display on the map
    $('#bar').click(function() {
      $('button').removeClass('selected');
      $(this).addClass('selected');
      $('#place').text('bars');
      
    });
    
       
   // Get the user selection for restaurant to display on the map
    $('#restaurant').click(function() {
      $('button').removeClass('selected');
      $(this).addClass('selected');
      $('#place').text('restaurants');
    
    });
    
   // Get the user selection for museum to display on the map
    $('#museum').click(function() {
      $('button').removeClass('selected');
      $(this).addClass('selected');
      $('#place').text('museum');
      
    });
    
   // Get the user selection for store to display on the map
    $('#store').click(function() {
        $('button').removeClass('selected');
        $(this).addClass('selected');
        $('#place').text('stores');
          
    });
   
   
    // Remove old marker for each place selected
    $('.place-type').children().click(function() {
          clearMarkers();
    });
    
    
    // Display signUp form
    $('#getSignUp').click(function() {
        $('#signUp').show();
    })
    
    // Display contact form   
    $('#getContactUsForm').click(function() {
        $('#getInTouch').show();
        
    });
    
    // Show alert box when submiting the contact form
    $('#contactUsForm').submit(function(event) {
        $('#contactUsForm').each(function() {
              
        });
        
        alert("We have received your enquire, Thanks");
    });
            
       
    // Show alert box when submiting the newslleter form
      $('#newsletter-form').submit(function(event) {
        alert("Thanks for your subscription:");  
        
    });
      
    
    // Show Booking form  
    $('.getholidayDestination').click(function() {
        $('#holidayDestination').show();
        
    });
    
    
    // DatePicker
    $('.datepicker').datepicker({
        weekStart: 1,
        daysOfWeekHighlighted: "6,0",
        autoclose: true,
        todayHighlight: true,
    });
    $('#datepicker').datepicker("setDate", new Date());
    

})