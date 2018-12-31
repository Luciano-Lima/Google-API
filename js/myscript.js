    //declaring the variables to initialising the map
    var markers = [];
    var places;
    var autocomplete;
    var countryRestrict = {'country': 'pt'};
    var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
    var hostnameRegexp = new RegExp('^https?://.+?/');
    var countries = {
      'pt': {
        center: {lat: 37.019356, lng: -7.930440},
        zoom: 7
      },
      'es': {
        center: {lat: 28.291565, lng: -16.629129},
        zoom: 5
      },
      'ph': {
        center: {lat: 9.740696, lng: 118.730072},
        zoom: 5
      },
      'ca': {
        center: {lat: 13.193887, lng: -59.543198},
        zoom: 5
      },
      
    };
    
    // initialising the map function
    function initAutocomplete() {
      var map =  new google.maps.Map(document.getElementById('map'), {
        // center: {lat: 37.019356, lng: -7.930440},
        center: countries['pt'].center,
        zoom: 2,
        mapTypeId: 'roadmap',
        mapTypeControl: false
        
      });
      
      //infowindow to display the DOM hotel content  
      infoWindow = new google.maps.InfoWindow({
      content: document.getElementById('info-content')
     });
    
      // autocomplete the search querie restrict to the city
      autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ 
            (document.getElementById('autocomplete')), {
          types: ['(cities)'],
          componentRestrictions: countryRestrict
        });
        places = new google.maps.places.PlacesService(map);
     
      autocomplete.addListener('place_changed', onPlaceChanged);
    
      //DOM event listener when the user selected a contry
      document.getElementById('country').addEventListener('change', setAutocompleteCountry);
    
    
      // function to get user country selection and zooming into the city
      function onPlaceChanged(){
        var place = autocomplete.getPlace();
          if(place.geometry) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            search();
          }else {
            document.getElementById('autocomplete').placeholder = 'Enter a city';
          }
      }
    
    // search in the selected city
      function search() {
        var search = {
          bounds: map.getBounds(),
          types: ['lodging']
        };
        
        //get the nearby hotels and place a marker for each
        places.nearbySearch(search, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          clearResults();
          clearMarkers();
          
        // Create a marker and assing a letter for each one founded
        for (var i = 0; i < results.length; i++) {
         var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
         var markerIcon = MARKER_PATH + markerLetter + '.png';
            
          // animation drop for the marker
          markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon
          });
            
          //displayng a winfowindow on marker click
          markers[i].placeResult = results[i];
          google.maps.event.addListener(markers[i], 'click', showInfoWindow);
          setTimeout(dropMarker(i), i * 100);
           addResult(results[i], i);
        }
      }
      });
    }
    
    function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i]) {
        markers[i].setMap(null);
      }
    }
    markers = [];
    }
    
  // Set the country restriction based on user input and zooming into the city
  
    function setAutocompleteCountry() {
    var country = document.getElementById('country').value;
      autocomplete.setComponentRestrictions({'country': country});
      map.setCenter(countries[country].center);
      map.setZoom(countries[country].zoom);
    
    clearResults();
    clearMarkers();
  }
  
  function dropMarker(i) {
    return function() {
      markers[i].setMap(map);
    };
  }
  // to get the information to display on each marker 
  function addResult(result, i) {
    var results = document.getElementById('results');
    var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
    var markerIcon = MARKER_PATH + markerLetter + '.png';
  
    var tr = document.createElement('tr');
    tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
    tr.onclick = function() {
      google.maps.event.trigger(markers[i], 'click');
    };
  
    var iconTd = document.createElement('td');
    var nameTd = document.createElement('td');
    var icon = document.createElement('img');
    icon.src = markerIcon;
    icon.setAttribute('class', 'placeIcon');
    icon.setAttribute('className', 'placeIcon');
    var name = document.createTextNode(result.name);
    iconTd.appendChild(icon);
    nameTd.appendChild(name);
    tr.appendChild(iconTd);
    tr.appendChild(nameTd);
    results.appendChild(tr);
  }
  
  function clearResults() {
    var results = document.getElementById('results');
    while (results.childNodes[0]) {
      results.removeChild(results.childNodes[0]);
    }
  }
  
  // show the information for each hotel on a infowindow 
  function showInfoWindow() {
    var marker = this;
    places.getDetails({placeId: marker.placeResult.place_id},
        function(place, status) {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
          }
          infoWindow.open(map, marker);
          buildIWContent(place);
        });
  }
  
  // Load the place information into the HTML elements used by the info window.
  function buildIWContent(place) {
    document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
        'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
        '">' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.vicinity;
  
    if (place.formatted_phone_number) {
      document.getElementById('iw-phone-row').style.display = '';
      document.getElementById('iw-phone').textContent =
          place.formatted_phone_number;
    } else {
      document.getElementById('iw-phone-row').style.display = 'none';
    }
  
    // Assign a five-star rating to the hotel, using a black star ('&#10029;')
    // to indicate the rating the hotel has earned, and a white star ('&#10025;')
    // for the rating points not achieved.
    if (place.rating) {
      var ratingHtml = '';
      for (var i = 0; i < 5; i++) {
        if (place.rating < (i + 0.5)) {
          ratingHtml += '&#10025;';
        } else {
          ratingHtml += '&#10029;';
        }
      document.getElementById('iw-rating-row').style.display = '';
      document.getElementById('iw-rating').innerHTML = ratingHtml;
      }
    } else {
      document.getElementById('iw-rating-row').style.display = 'none';
    }
  
    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window.
    if (place.website) {
      var fullUrl = place.website;
      var website = hostnameRegexp.exec(place.website);
      if (website === null) {
        website = 'http://' + place.website + '/';
        fullUrl = website;
      }
      document.getElementById('iw-website-row').style.display = '';
      document.getElementById('iw-website').textContent = website;
    } else {
      document.getElementById('iw-website-row').style.display = 'none';
    }
  }
    
      
    // defining the popular destination markers with infowindow content
    var preSetMarkers = [
      { coords: {lat: 37.019356, lng: -7.930440},
        icon: '/pictures/portugal_flag.png',  
        content: '<h3>Algarve PT</h3>' + '<p>The Algarve is the southernmost region of continental Portugal. It has an area of 4,997 km2 (1,929 sq mi) with 451,006 permanent inhabitants.</p>',
      },
      { coords: {lat: 13.193887, lng: -59.543198},
        icon: '/pictures/barbados_flag.png',
        content: '<h3>Barbados BB </h3>' + 
        '<p>Barbados is an island country in the Caribbean Sea. The island has an area of about 430 kmÂ². Its capital and largest city is Bridgetown.</p>',
      },
      { coords: {lat: 9.740696, lng: 118.730072},
        icon: '/pictures/palawan_flag.png',
        content: '<h3>Palawan PH</h3>' + 
        '<p>Palawan officially the Province of Palawan is an archipelagic province of the Philippines that is located in the region of Mimaripa.</p>', 
      },
    
    { coords: {lat: 28.291565, lng: -16.629129},
      icon: '/pictures/spain-flag.png',
      content: '<h3>Tenerife ES</h3>' + 
      '<p>Tenerife is the largest and most populated island of the seven Canary Islands. It is also the most populated island of Spain, with a land area of 2,034.38 square</p>',
    },
      ];
      
      //loop trough the preSetMarkeres
      for (var i = 0; i < preSetMarkers.length; i++) {
        addpreSetMarker(preSetMarkers[i]);
      }
      
      
      //function to add the preSetMarkers to the map
      function addpreSetMarker(text) {
        var marker = new google.maps.Marker({
          position: text.coords,
          map: map,
        });
        
        //zoom when clicking on each marker
        google.maps.event.addListener(marker,'click',function() {
          var pos = map.getZoom();
          map.setZoom(9);
          map.setCenter(marker.getPosition());
          window.setTimeout(function() {map.setZoom(pos);},6000);
        });
        
        //to set the text content and icons
        if (text.content) {
          var infoWindow = new google.maps.InfoWindow({
            content:text.content
          });
          
          if (text.icon) {
            marker.setIcon(text.icon);
          }
        }
        //listener to call the infowindow 
        marker.addListener('click', function() {
          infoWindow.open(map,marker);
        });
      }
  }


// seach bar
  
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
        'backgroundColor': '#acdbff7a',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
    }
