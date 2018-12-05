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
  var london = {lat: 51.507351, lng: -0.127758}
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: london
  });
  var marker = new google.maps.Marker({
    position: london, 
    map: map
  });
}

// var map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"),{
//     center: {lat: 51.507351, lng: -0.127758},
//     zoon: 8
//   });
// }

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
    
    



        