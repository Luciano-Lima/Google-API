//  seach box

  (function() {
    var cx = '000839719132049059247:-xxothaal9a';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();



    
// search results

  (function() {
    var cx = '000839719132049059247:-xxothaal9a';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();




// map

function initMap() {
  var algarve = {lat: 37.017956, lng: 37.017956}
  var barbados = {lat: 13.193887, lng: -59.543198}
  var palawan = {lat: 9.834949, lng: -118.738358}
  var caynam = {lat: 10.128920, lng: 106.333740};
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 1,
    center: algarve,
    mapTypeControl : true,
    mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    mapTypeId: ['roadmap', 'terrain']}
   
  });
  
  var marker = new google.maps.Marker({position: algarve, map: map, title: 'Algarve'})
  var marker = new google.maps.Marker({position: barbados, map: map, title: 'Barbados'})
  var marker = new google.maps.Marker({position: palawan, map: map, title: 'Palawan'})
  var marker = new google.maps.Marker({position: caynam, map: map, title: 'Caynam'});
}







// google sign

function onSuccess(googleUser) {
      console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    }
    function onFailure(error) {
      console.log(error);
    }
    function renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
    }
    
    



        