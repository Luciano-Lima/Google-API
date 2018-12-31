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
    
    
   $(".fa").mouseenter(function(){
        $(this).addClass("fa-font-size");
    });
    
    $(".fa").mouseleave(function(){
        $(this).removeClass("fa-font-size");
    });
    
})