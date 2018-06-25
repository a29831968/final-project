// needed info
var buildings_array=[];
var objects_array=[];
var user_info={};
var friend_list;
$(document).ready(function(){
  xxx="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2157343054280629&height=50&width=50&ext=1530139180&hash=AeQCmh2vlkawCwsp";
  $("#mySidenav").append('<div class="friend_list"><div class="friend_cir"><img width="100vw" src="'+xxx+'"/></div> <p class="names" id="Tony Yang">Yang</p></div>');
  $.ajax({
    method:"get",
    url: "./user_all_info",
    data:{
    },
    success: function(data){
      user_info=data.user_info;
      friend_list=data.friend_list;
      // draw exp
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(255,228,196)";
        ctx.fillRect (0, 0, 200, 20);
        exp=parseInt(user_info.exp)*2; 
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (0, 0, exp, 20);
      }
      $("#self_name").html(user_info.name);
      $("#lv").html("Lv:"+user_info.lv);
    }
  })
  // click function for every users
  // navigate to other user's house
  $('.names').click(function () {
    var NameId;
    NameId = $(this).attr('id');
    console.log(NameId);
    window.location.assign("./friend.html");
  });
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
  });
  //
  console.log("get ready");
  console.log("get buildings");
  // .ajax get building condition
  // and set the buildings in every block
  $.ajax({
    method:"get",
    url: "./buildings",
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
    url: "./objects",
    data:{
    },
    success: function(data){
      console.log("final: "+data);
      objects_array=data;
      setobjects(objects_array);
    }
  })
  $("#testbtn").click(function(){
    $("#flip").css({display:"block"});
      for(var x=0; x<15; x++){
        $("#"+x).click(showInfo(x));
      }
  })
  //flip close
  $("#close").click(function(){
    $("#flip").css({display:"none"});
    // try solve bugs
    for(var x=0; x<15; x++){
      $("#"+x).unbind();
    }
    setBuildings(buildings_array);
  })

  $("#flip").turn({
    width:"168vw", 
    height:"132vw"
  });
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
// function set objects
function setobjects(obj){
  console.log("setobjects");
    if(obj.length==0){
      var object= "asset/block.png";
      console.log(object);
      img="<img width='100%' src='"+object+"'/>";
      $("#0").html(img);
      console.log(obj[i]);
    }
    for(var i=0; i<=25; i++){
      if(obj[i]!=null){
        var object= "objects/"+obj[i]+".png";
        //console.log(object);
        img="<img width='100%' src='"+object+"'/>";
        $("#"+i).html(img);
        console.log(obj[i]);
      }else{
        var object= "asset/block.png";
        //console.log(object);
        img="<img width='100%' src='"+object+"'/>";
        $("#"+i).html(img);
        console.log(obj[i]);
      }
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
      if(pic==null){
        $("#flip").css({display:"block"});
        for(var x=0; x<15; x++){
          $("#"+x).click(construct(x,i));
        }
      }else{
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
function construct(x, i){
  return function(){
    if(objects_array[x]!=null){
      console.log("x:"+x+" i:"+i);
      buildings= "buildings/"+objects_array[x]+".png";
      img="<img width='100%' src='"+buildings+"'/>";
      $("#block"+(i)).html(img);
      $("#block"+(i)).css("background-color","rgb(255, 255, 255, 0)");
      $("#flip").css({display:"none"});
      $("#"+x).unbind();
      // change the data in database
      $.ajax({
        method:'get',
        url:'./objANDbuild',
        data:{
          x:x,
          i:i,
        },
        success: function(data){
          console.log("buildings:"+data.buildings_info);
          console.log("objs:"+data.objs_info);
          buildings_array=data.buildings_info;
          setBuildings(buildings_array);
          objects_array=data.objs_info;
          setobjects(objects_array);
        }
      })
    }
  }
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
