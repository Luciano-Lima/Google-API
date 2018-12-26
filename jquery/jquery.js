$(document).ready(function() {
    
    var navbarHeight = $('.navbar').outerHeight();
    
    $('.slide-section').click(function(e){
        var linkHref = $(this).attr('href'); 
        
        // console.log(headerHeight);
        $('html, body').animate({
            scrollTop: $(linkHref).offset().top - navbarHeight
        });
        
        e.preventDefault(); 
    });
})