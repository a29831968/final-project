// needed info
var buildings_array=[];
var objects_array=[];
var friend_info;
$(document).ready(function(){
  //profile information
  $.ajax({
    method:"get",
    url: "./profile_profile",
    data:{
    },
    success: function(data){
      total=data.total;
      percent=Math.round((total/35)*100);
      user_profile=data.user_profile;
      $("#cir").append('<p id="dis_name">'+percent+'%</p>');
      $(".profile_profile").append('<p class="profile_name">'+user_profile.name+'</p><br><p class="profile_name">Lv:'+user_profile.lv+'</p><br>')
      $(".profile_profile").append('<canvas id="canvas1" width="300" height="20"></canvas>'); 
      $(".profile_profile").append('<p class="saying">說說你對旅行的看法...</p>');
      $(".pro_cir").append('<img width="100vw" src="'+user_profile.url+'"/>')
      // draw exp
      var canvas = document.getElementById("canvas1");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(255,228,196)";
        ctx.fillRect (0, 0, 300, 20);
        exp=parseInt(user_profile.exp)*3; 
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (0, 0, exp, 20);
      }
    }
  })
  $.ajax({
    method:"get",
    url: "./friend_own_info",
    data:{
    },
    success: function(data){
      friend_info=data;
      $(".circular").append('<img width="100vw" src="'+friend_info[0].url+'"/>')
      // draw exp
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(255,228,196)";
        ctx.fillRect (0, 0, 200, 20);
        exp=parseInt(friend_info[0].exp)*2; 
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (0, 0, exp, 20);
      }
      $("#self_name").html(friend_info[0].name);
      $("#lv").html("Lv:"+friend_info[0].lv);
    }
  })
  $("#taiwan").click(function(){
    window.location.assign("./homepage.html");
  })
  //
  $("#map").click(function(){
    window.location.assign("./map.html");
  })
  //
  $('.entrance').click(function(){
    $('.switchscreen').animate(
        {
              'left':'0px',
              'top':'0px',
              'width':'100%',
              'height':'100%'
        }, 100,
        function(){
          window.location.assign("./letter/letter1.html");
        });
  });

  // switch profile 
  $('.small_person').click(function(){
    $('.change_to_profile').animate(
        {
          'left':'0px',
          'top':'0px',
          'width':'100vw',
          'height':'100vh',
          'z-index':'2'
        }, 100,
        );
    $('.profile_bottom').css({'display':'block'});
  });
  //
  console.log("get ready");
  console.log("get buildings");
  // .ajax get building condition
  // and set the buildings in every block
  $.ajax({
    method:"get",
    url: "./friend_buildings",
    data:{
    },
    success: function(data){
      buildings_array=data;
      setBuildings(buildings_array);
    }
  })
  // .ajax get objects
  // and set all the objects into the bag
  console.log("get objects");
  $.ajax({
    method: "get",
    url: "./friend_objects",
    data:{
    },
    success: function(data){
      console.log("final: "+data);
      objects_array=data;
    }
  })

});
// function set building conditions
function setBuildings(build){
  console.log("setBuildings");
    for(var i=0; i<20; i++){
      if(build[i]!=null){
        console.log((i+1)+": "+build[i]);
        buildings= "buildings/"+build[i]+".png";
        img="<img width='100%' src='"+buildings+"'/>";
        $("#block"+(i+1)).html(img);
        $("#block"+(i+1)).css("background-color","rgb(255, 255, 255, 0)");
      }
      $('#block' +(i+1)).unbind();
      console.log("set buildings click:"+ (i+1));
      $('#block' +(i+1)).click( createCallback( (i+1), build[i] ) );
    }
}
// show information
function showInfo(x){
  return function(){
    if(objects_array[x]!=null){
      console.log("x:"+x);
      infopic= "info/info"+objects_array[x]+".png";
      img="<img width='100%' src='"+infopic+"'/>";
      console.log(img);
      $(".information").html(img);
      $(".information").css({display:"block"});
      $("#mask").css({display:"block"});
      $("#"+x).unbind();
    }
  }
}
function createCallback( i , pic){
  return function(){
    //alert(i);
    console.log("buildings:"+ pic);
      if(pic!=null){
        buildingShowInfo(pic);
      }
    }
    
}
function buildingShowInfo(pic){
    infopic= "info/info"+pic+".png";
    img="<img width='100%' src='"+infopic+"'/>";
    $(".information").html(img);
    $(".information").css({display:"block"});
    $("#mask").css({display:"block"});
}

$("#mask").click(function(){
    if($(".information").css('display') == 'block'){
      $(".information").css({display:"none"});
      $("#mask").css({display:"none"});
    }
})

// user list navigation open and close
function openNav() {
      document.getElementById("mySidenav").style.width = "40vw";
}

function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
}
