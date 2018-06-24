function initMap(){
  console.log("initMap");
  // initialize the map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 22.999728, lng: 120.227028},
  });
  if (navigator.geolocation){
    console.log("navigator.geolocation");
    var optn={
      enableHighAccuracy: true,
      timeout : Infinity,
      maximumAge: 0,
      frequency:100,
    };
    var watchID = navigator.geolocation.watchPosition(success, fail, optn);
  }else{
    console.log("Not supported");
  }
}
function success(position)
{
  var googleLatLng = new google.maps.LatLng(position.coords.latitude, 
      position.coords.longitude);
  var mapOtn={
    zoom:14,
    center:googleLatLng,
    mapTypeId:google.maps.MapTypeId.ROAD
  };
  console.log(position.coords.latitude.toString());
  console.log(position.coords.longitude.toString());
  var Pmap=document.getElementById("map");

  var map=new google.maps.Map(Pmap, mapOtn);
  addMarker(map, googleLatLng, "You");
}

function fail(error)
{
  var errorType={
    0:"Unknown Error",
    1:"Permission denied by the user",
    2:"Position of the user not available",
    3:"Request timed out"
  };

  var errMsg = errorType[error.code];

  if(error.code == 0 || error.code == 2){
    errMsg = errMsg+" - "+error.message;
  }

}

function addMarker(map, googleLatLng, title){
  var markerOptn={
    position:googleLatLng,
    map:map,
    title:title,
    animation:google.maps.Animation.DROP
  };

  var marker=new google.maps.Marker(markerOptn);
}
