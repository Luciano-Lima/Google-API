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
    
    // Displays the selection for hotel on the map
    $('#hotel').click(function() {
        $('button').removeClass('selected'); 
        $(this).addClass('selected');
        $('#place').text('hotel'); 
          
    });
    
    // Displays the selection for bar on the map
    $('#bar').click(function() {
      $('button').removeClass('selected');
      $(this).addClass('selected');
      $('#place').text('bars');
      
    });
    
       
   // Displays the selection for restaurant on the map
    $('#restaurant').click(function() {
      $('button').removeClass('selected');
      $(this).addClass('selected');
      $('#place').text('restaurants');
    
    });
    
   // Displays the selection for museum on the map
    $('#museum').click(function() {
      $('button').removeClass('selected');
      $(this).addClass('selected');
      $('#place').text('museum');
      
    });
    
   // Displays the selection for store on the map
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
    
    });
    
    // Show alert box when submiting the newslleter form
    $('#newsletterForm').submit(function() {
        alert("Thanks for your subscription:");  
            
    });
    
    
    // Display contact form   
    $('#getContactUsForm').click(function() {
        $('#getInTouch').show();
        
    });
    
    // Show alert box when submiting the contact form
    $('#contactUsForm').submit(function() {
        alert("We have received your enquire, Thanks");
       
    });
       
    // Show Booking form  
    $('.getholidayDestination').click(function() {
        $('#holidayDestination').show();
        
    });
    
     // Show alert box when submiting the booking form
    $('#holidayDestination').submit(function() {
         alert("We have received your booking. Thanks"); 
        
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