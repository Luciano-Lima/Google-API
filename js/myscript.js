// map

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:37.017956, lng: 37.017956},
    zoom: 1,
    mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    mapTypeId: ['roadmap', 'terrain']}
  });

 // Map search box
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // // Bias the SearchBox results towards current map's viewport.
        // map.addListener('bounds_changed', function() {
        //   searchBox.setBounds(map.getBounds());
        // });
  

// add marker to the map
  var markers = [
    {coords: {lat: 37.019356, lng: -7.930440},
      icon: '/pictures/portugal_flag.png',
      content: '<h3>Algarve PT</h3>' + '<p>The Algarve is the southernmost region of continental Portugal. It has an area of 4,997 km2 (1,929 sq mi) with 451,006 permanent inhabitants.</p>', 
    },
    
    {coords: {lat: 13.193887, lng: -59.543198},
      icon: '/pictures/barbados_flag.png',
      content: '<h3>Barbados </h3>' + 
      '<p>Barbados is an island country in the Caribbean Sea. The island has an area of about 430 kmÂ². Its capital and largest city is Bridgetown.</p>',
    },
    
    {coords: {lat: 9.740696, lng: 118.730072},
      icon: '/pictures/palawan_flag.png',
      content: '<h3>Palawan</h3>' + 
      '<p>Palawan officially the Province of Palawan is an archipelagic province of the Philippines that is located in the region of Mimaripa.</p>', 
    },
    
    {coords: {lat: 19.292997, lng: -81.366806},
      icon: '/pictures/caynam_flag.png',
      content: '<h3>Caynam</h3>' + 
      '<p>The Cayman Islands are a group of islands in the Caribbean Sea approximately ninety miles south of Cuba.</p>',
    }
  ];
  
    
  // loop trouhg the markers
  for (var i = 0; i < markers.length; i++) {
    addMarker(markers[i]);
  }
    
  // add marker function
  function addMarker(text) {
    var marker = new google.maps.Marker({
      position: text.coords,
      map:map,
  });
  
  // zoonm when clicking on the marker
  google.maps.event.addListener(marker,'click',function() {
    var pos = map.getZoom();
      map.setZoom(8);
      map.setCenter(marker.getPosition());
      window.setTimeout(function() {map.setZoom(pos);},6000);
  });
  
  // Check text content
  if(text.content){
    var infoWindow = new google.maps.InfoWindow({
      content:text.content
  });
          
  if(text.icon) {
    marker.setIcon(text.icon);
    }
  }
    
  marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
  }
  
 
  // add markers for the search box resultes 
  var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
  var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    
  // Clear out the old markers.
  markers.forEach(function(marker) {
  marker.setMap(null);
  });
  
  markers = [];

  // For each place, get the icon, name and location.
  var bounds = new google.maps.LatLngBounds();
  
    places.forEach(function(place) {
      if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
  var icon = {
    url: place.icon,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25),
    
  };

    // Create a marker for each place.
  markers.push(new google.maps.Marker({
    map: map,
    icon: icon,
    title: place.name,
    position: place.geometry.location,
    animation: google.maps.Animation.DROP
  }));
  
  if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
    });
    map.fitBounds(bounds);
});

}













  // seach box 
  
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

