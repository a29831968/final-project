function initMap() {
  console.log("initMap");
  // initialize the map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 22.999728, lng: 120.227028}});
  
  if (navigator.geolocation) {
    getGeolocation().then(pos => {
      map.setCenter(pos)
    }).catch(msg => {
      console.log(msg)
    })
  } else{
    consol.log('Geolocation is not supported by your browser')
  }

  // tracking the user location
  /*
  var infoWindow = new google.maps.InfoWindow({map: map});
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  */
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
}
/*
function handlePermission() {
  navigator.permissions.query({name:'geolocation'}).then(function(result) {
    if (result.state == 'granted') {
      report(result.state);
      geoBtn.style.display = 'none';
    } else if (result.state == 'prompt') {
      report(result.state);
      geoBtn.style.display = 'none';
      navigator.geolocation.getCurrentPosition(revealPosition,positionDenied,geoSettings);
    } else if (result.state == 'denied') {
      report(result.state);
      geoBtn.style.display = 'inline';
    }
    result.onchange = function() {
      report(result.state);
    }
  });
}
*/
let getGeolocation = () => {
  return new Promise((resolve) =>{
    navigator.geolocation.getCurrentPosition((position)=>{
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      resolve(pos)
    })
  })
}
