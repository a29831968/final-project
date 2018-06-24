var map;
// set the objects what user did not get yet
var mapObjsList=[];

// set the user location
// and set the location bound
var currentCircle;
var currentLocation;
// store the object marker into list
var objMarkerList=[];

// 1km
const distance = 2000;
function initMap() {
  console.log("initMap");
  // initialize the map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 22.999728, lng: 120.227028}
  });

  //set the click
  $("#taiwan").click(function(){
    window.location.assign("./homepage.html"); 
  });
 
  $.ajax({
    method:'get',
    url: './showObjs',
    data:{
    },
    success: function(data){
      mapObjsList=data.mapObjs;
      setObjs(mapObjsList, map);
    }
  })
  //
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
  //
  //getDeviceLocation();
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
}

// set objs on map
function setObjs(mapObjsList, map){
  var box = {
    url: 'maps/box.png',
    scaledSize : new google.maps.Size(20, 20),
  };
  objMarkerList.splice(0, objMarkerList.length);
  for(var i=0; i<mapObjsList.length; i++){
    if(mapObjsList[i]!=null){
      objMarkerList.push(new google.maps.Marker({
            position:new google.maps.LatLng(mapObjsList[i].lat, mapObjsList[i].lng),
            icon: box,
      }));
      var img = mapObjsList[i].filename;
      console.log("img:"+img);
      objMarkerList[i].addListener('click', setClick(img));
      objMarkerList[i].setMap(map);
    }else{
      objMarkerList.push(null);
    }
  }
}
// set click of objects
function setClick(img){
  return function(){
    console.log("<img width='100%' src='info/"+img +"' />");
    $("#info").html("<img width='100%' src='info/"+img +"' />");
    $("#info").css({display:"block"});
    $("#mask").css({display:"block"});
  }
}

// close info window
$("#mask").click(function(){
  $("#info").css({display:"none"});
  $("#mask").css({display:"none"});
  $(".getButtonG").css({display:"none"});
});

// get device location
function getDeviceLocation(){
  //console.log("get Device location.");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      if(currentLocation != null){
        console.log("none null");
        currentLocation.setMap(null);
        currentLocation = new google.maps.Marker({
          position: pos,
          icon: 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png',
        });
      }else{
        console.log("null");
        currentLocation = new google.maps.Marker({
          position: pos,
          title:"YOU ARE HERE",
          icon: 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png',
        });
      }
      //console.log("currentLocation:"+currentLocation);
      // calculate the bound and set the obj get button in the information
      distanceBound(currentLocation, objMarkerList);
      currentLocation.setMap(map);
      //map.setCenter(pos);
      if(currentCircle != null){
        currentCircle.setMap(null);
        currentCircle = new google.maps.Circle({
          strokeColor: '#000000',
          strockOpacity: 0.7,
          strokeWeight: 0.2,
          fillColor: '#000000',
          fillOpacity: 0.1,
          map:map,
          radius:distance,
          center:pos,
        });
      }else{
        currentCircle = new google.maps.Circle({
          strokeColor: '#000000',
          strockOpacity: 0.7,
          strokeWeight: 0.2,
          fillColor: '#000000',
          fillOpacity: 0.1,
          map:map,
          radius:distance,
          center:pos,
        });
      }
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
//window.setInterval(function(){getDeviceLocation();},5000);

// calculate the distance bound
function distanceBound(current, markerList){
  console.log("current lat,lng:"+current.position);
  for(var i=0; i<markerList.length; i++){
    // if obj exist on map
    if(markerList[i]!=null){
      var length = google.maps.geometry.spherical.computeDistanceBetween(current.position, markerList[i].position);
      // if obj also in the bound area
      // distance = 1000 m
      if(length <= distance){
        // in the bound, it will show the button(get objs)
        //google.maps.event.removeListener(markerList[i]);
        markerList[i].addListener('click', getObjClick((i+1), mapObjsList[i].filename));
      }
    }
  }
}
// getObjClick()
// set obj click
function getObjClick(x, boxfile){
  return function(){
    console.log("<img width='100%' src='info/"+boxfile +"' />");
    $("#info").html("<img width='100%' src='info/"+boxfile +"' />");
    $("#info").css({display:"block"});
    $("#mask").css({display:"block"});
    $("#getButton"+x).css({display:"block"});
    // x is the number need to put int the total
    $("#getButton"+x).click(addTobag(x));
  }
}

function addTobag(x){
  return function(){
    console.log("click get x: "+x);
    $("#info").css({display:"none"});
    $("#mask").css({display:"none"});
    $(".getButtonG").css({display:"none"});
    // database 
    $.ajax({
      method:'get',
      url:'./mapObjGet',
      data:{
        objNumber:x,  
      },
      success: function(data){
        console.log(data.mapObjs);
        mapObjsList=data.mapObjs;
        setObjs(mapObjsList, map);
      }
    })
    getDeviceLocation();
  }
}


function success(position)
{
  var googleLatLng = new google.maps.LatLng(position.coords.latitude, 
      position.coords.longitude);
  
  //
  if(currentLocation != null){
        console.log("none null");
        currentLocation.setMap(null);
        currentLocation = new google.maps.Marker({
          position: pos,
          icon: 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png',
          zoom:14,
          center:googleLatLng,
          mapTypeId:google.maps.MapTypeId.ROAD,
        });
      }else{
        console.log("null");
        currentLocation = new google.maps.Marker({
          position: pos,
          icon: 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png',
          zoom:14,
          center:googleLatLng,
          mapTypeId:google.maps.MapTypeId.ROAD
        });
      }
  
  console.log(position.coords.latitude.toString());
  console.log(position.coords.longitude.toString());
  //var Pmap=document.getElementById("map");
  
  //var map=new google.maps.Map(Pmap, mapOtn);
  
  //
  //console.log("currentLocation:"+currentLocation);
      // calculate the bound and set the obj get button in the information
      distanceBound(currentLocation, objMarkerList);
      currentLocation.setMap(map);
      //map.setCenter(pos);
      if(currentCircle != null){
        currentCircle.setMap(null);
        currentCircle = new google.maps.Circle({
          strokeColor: '#000000',
          strockOpacity: 0.7,
          strokeWeight: 0.2,
          fillColor: '#000000',
          fillOpacity: 0.1,
          map:map,
          radius:distance,
          center:pos,
        });
      }else{
        currentCircle = new google.maps.Circle({
          strokeColor: '#000000',
          strockOpacity: 0.7,
          strokeWeight: 0.2,
          fillColor: '#000000',
          fillOpacity: 0.1,
          map:map,
          radius:distance,
          center:pos,
        });
      }
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
