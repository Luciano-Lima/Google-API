// defining the global variables
var map;
var service;
var markers = [];
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var infoWindow;
var placeType;
// var preSetMarkers = [
  
//   {
//     coords: { lat: 37.019356, lng: -7.930440 },
//     icon: '/pictures/portugal-icon.png',
//     content: '<h3>Algarve PT</h3>' + '<p>The Algarve is the southernmost region of continental Portugal. It has an area of 4,997 km2 (1,929 sq mi) with 451,006 permanent inhabitants.</p>',
//   },
//   {
//     coords: { lat: -12.9704, lng: -38.5124 },
//     icon: '/pictures/brazil-icon.png',
//     content: '<h3>Bahia BR </h3>' +
//       '<p>Salvador is the capital of Bahia State, a place well known for its natural beauties, for the kindness of its people and for the strong influence of the African culture.</p>',
//   },
//   {
//     coords: { lat: 9.740696, lng: 118.730072 },
//     icon: '/pictures/palawan-icon.png',
//     content: '<h3>Palawan PH</h3>' +
//       '<p>Palawan officially the Province of Palawan is an archipelagic province of the Philippines that is located in the region of Mimaripa.</p>',
//   },

//   {
//     coords: { lat: 28.291565, lng: -16.629129 },
//     icon: '/pictures/spain-icon.png',
//     content: '<h3>Tenerife ES</h3>' +
//       '<p>Tenerife is the largest and most populated island of the seven Canary Islands. It is also the most populated island of Spain, with a land area of 2,034.38 square</p>',
//   },
// ];

// initializing the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    streetViewControl: true,
    center: {lat: 37.019356, lng: -7.930440 },
  });
  
  // map seach box
  var searchBox = new google.maps.places.SearchBox(document.getElementById('searchBar'));
  
  // capturing the user input, bounding it to the map and setting the zoom
  google.maps.event.addEventListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    var bounds = new google.maps.LatLngBounds();
    var i, place;
    
    for (i = 0; place = places[i]; i++) {
      bounds.extend(place.geometry.location);
    }
    
    map.fitBounds(bounds);
    map.setZoom(14);
  });
  
  // get the selected nearby place 
  service = new google.maps.places.PlacesService(map);
  google.maps.event.addListener(map, 'click', function(e) {
    
    if ($('button').hasClass('selected')) {
      map.panTo(e.latLng);
      map.setZoom(15);
      clearMarkers();
      checkPlaceType();
    }
    
  });
  //
  
}







    
    
    
    


  




// // seach bar

// (function () {
//   var cx = '000839719132049059247:-xxothaal9a';
//   var gcse = document.createElement('script');
//   gcse.type = 'text/javascript';
//   gcse.async = true;
//   gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(gcse, s);
// })();

// // search results
// (function () {
//   var cx = '000839719132049059247:-xxothaal9a';
//   var gcse = document.createElement('script');
//   gcse.type = 'text/javascript';
//   gcse.async = true;
//   gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
//   var s = document.getElementsByTagName('script')[0];
//   s.parentNode.insertBefore(gcse, s);
// })();


// // google sign

// function onSuccess(googleUser) {
//   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
// }
// function onFailure(error) {
//   console.log(error);
// }
// function renderButton() {
//   gapi.signin2.render('my-signin2', {
//     'scope': 'profile email',
//     'width': 210,
//     'height': 30,
//     'longtitle': true,
//     'theme': 'dark',
//     'onsuccess': onSuccess,
//     'onfailure': onFailure
//   });
// }
