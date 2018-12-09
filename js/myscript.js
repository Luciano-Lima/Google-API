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
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 1,
    center: {lat:37.017956, lng: 37.017956},
    mapTypeControl : true,
    mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    mapTypeId: ['roadmap', 'terrain']}
   
  });
  
  // add marker to the map
  var markers = [
    {coords: {lat: 37.019356, lng: -7.930440},
      icon: '/pictures/portugal_flag.png',
      content: '<h3>Algarve PT</h3>' + '<p>The Algarve is the southernmost region of continental Portugal. It has an area of 4,997 km2 (1,929 sq mi) with 451,006 permanent inhabitants.</p>', 
    },
    
    {coords: {lat: 13.193887, lng: -59.543198},
      icon: '/pictures/barbados_flag.png',
      content: '<h3>Barbados </h3>' + 
      '<p>Barbados is an island country in the Caribbean Sea. The island has an area of about 430 km². Its capital and largest city is Bridgetown.</p>',
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
