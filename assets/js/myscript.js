// defining the global variables
var map;
var service;
var markers = [];
var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
var infoWindow;
var placeType;
var preSetMarkers = [
    {
      coords: { lat: 37.019356, lng: -7.930440 },
      icon: '/pictures/portugal-icon.png',
      content: '<h3>Algarve PT</h3>' + '<p>The Algarve is the southernmost region of continental Portugal. It has an area of 4,997 km2 (1,929 sq mi) with 451,006 permanent inhabitants.</p>',
    },
    {
      coords: { lat: -12.9704, lng: -38.5124 },
      icon: '/pictures/brazil-icon.png',
      content: '<h3>Bahia BR </h3>' +
        '<p>Salvador is the capital of Bahia State, a place well known for its natural beauties, for the kindness of its people and for the strong influence of the African culture.</p>',
    },
    {
      coords: { lat: 9.740696, lng: 118.730072 },
      icon: '/pictures/palawan-icon.png',
      content: '<h3>Palawan PH</h3>' +
        '<p>Palawan officially the Province of Palawan is an archipelagic province of the Philippines that is located in the region of Mimaripa.</p>',
    },

    {
      coords: { lat: 28.291565, lng: -16.629129 },
      icon: '/pictures/spain-icon.png',
      content: '<h3>Tenerife ES</h3>' +
        '<p>Tenerife is the largest and most populated island of the seven Canary Islands. It is also the most populated island of Spain, with a land area of 2,034.38 square</p>',
    },
];

// initializing the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: .4,
    mapTypeId: 'roadmap',
    mapTypeControl: false,
    streetViewControl: true,
    center: {lat: 37.019356, lng: -7.930440 },
  });
  
  // map seach box
  var searchBox = new google.maps.places.SearchBox(document.getElementById('searchBar'));
  
  // capturing the user input, bounding it to the map and setting the zoom
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();
    var bounds = new google.maps.LatLngBounds();
    var i, place;
    
    for (i = 0; place = places[i]; i++) {
      bounds.extend(place.geometry.location);
    }
    
    map.fitBounds(bounds);
    map.setZoom(13);
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
  
  //sets the info widow to display the places information
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });
  
  // loop trough the pre set markers
  for (var i = 0; i < preSetMarkers.length; i++) {
    addpreSetMarker(preSetMarkers[i]);
  }
  
  // add the pre set markers to the map
  function addpreSetMarker(text) {
    var marker = new google.maps.Marker({
      position: text.coords,
      map: map,
    });
    
    // zooming when the marker is clicked with a time out.
     google.maps.event.addListener(marker, 'click', function () {
       
       var pos = map.getZoom();
       map.setZoom(7);
       map.setCenter(marker.getPosition());//center the marker to the map view
       window.setTimeout(function () { map.setZoom(pos); }, 6000);
     });
     
    // set the text content and the icons
    if(text.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: text.content
      });
      
      if(text.icon) {
          marker.setIcon(text.icon);
        }
      }
     
    // listener to call the info window
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
        });
  } 
  
}
  
  
  // check to see if place has been selected
  function checkPlaceType() {
    
    if ($('#hotel').hasClass('selected')) {
        placeType = ['lodging'];
    }
    else if ($('#store').hasClass('selected')) {
        placeType = ['store'];
    }
    else if ($('#bar').hasClass('selected')) {
        placeType = ['bar'];
    }
    else if ($('#restaurant').hasClass('selected')) {
        placeType = ['restaurant'];
    }
    else if ($('#museum').hasClass('selected')) {
        placeType = ['museum'];
    }
    
    // calling the search place function
    searchPlace();
  }
  
  // get the selected place and bounds it to the map
  function searchPlace() {
    var search = {
      bounds: map.getBounds(),
      types: placeType
    };
    
    service.nearbySearch(search, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        clearMarkers();
        //Create markers and assign a letter for each one.
        for (var i = 0; i < results.length; i++) {
          var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
          var markerIcon = MARKER_PATH + markerLetter + '.png';
          // animation drop for the marker
          markers[i] = new google.maps.Marker({
            position: results[i].geometry.location,
            animation: google.maps.Animation.DROP,
             icon: markerIcon
          });
          
          // shows a info window with the places information
          markers[i].placeResult = results[i];
          google.maps.event.addListener(markers[i], 'click', showInfoWindow);
          setTimeout(placeMarkers(i), i * 110);
          
        }
      }
      else{
        $('#noNearbyPlaces').show();
      }
      
    });  
  }   
      
  // clear preview markers
  function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i]) {
        markers[i].setMap(null);
      }
    }
    markers = [];
  }
  
  // add marker to the map
  function placeMarkers(i) {
    return function() {
      markers[i].setMap(map);
    };
  }
  
  //get the place details
  function showInfoWindow() {
    var marker = this;
    service.getDetails({ placeId: marker.placeResult.place_id },
    function(place, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      }
      infoWindow.open(map, marker);
      setPlaceDetails(place);
    });
  }
  
  // add place details to the info window
  function setPlaceDetails(place) {
    document.getElementById('place-name').innerHTML = place.name + '<img class="hotelIcon" ' + 'src="' + place.icon + '"/>';
    document.getElementById('address').textContent = place.formatted_address;
    document.getElementById('phoneNum').textContent = place.formatted_phone_number;
    document.getElementById('url').innerHTML = '<a href="' + place.website + '" target="_blank">' + 'Website ' + '</a>';
  }
     
   
  

   //sign up form variable declaration
  var modal = document.getElementById('signUp');
  
  // getting the user event click to close the form
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  
  
  
  
  
  
  


    
    
    // google seach bar

(function () {
  var cx = '000839719132049059247:-xxothaal9a';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
})();

// search results
(function () {
  var cx = '000839719132049059247:-xxothaal9a';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
})();


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
    'width': 210,
    'height': 30,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}


