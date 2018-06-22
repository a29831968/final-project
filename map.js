function initMap(){
  console.log("initMap");
  // initialize the map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 22.999728, lng: 120.227028}
  });
}
