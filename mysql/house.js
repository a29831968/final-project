// needed info
var buildings_array=[];
var objects_array=[];
$(document).ready(function(){
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
      /*
      for(var i=0; i<data.length; i++){
        if(data[i]!=null){
          console.log((i+1)+": "+data[i]);
          buildings= "buildings/"+data[i]+".png";
          img="<img width='100%' src='"+buildings+"'/>";
          $("#block"+(i+1)).html(img);
          $("#block"+(i+1)).css("background-color","rgb(255, 255, 255, 0)");
        }
        $('#block' +(i+1)).click( createCallback( (i+1), data[i] ) );
      }
      */
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
      /*
      for(var i=0; i<data.length; i++){
        var object= "objects/"+data[i]+".png";
        console.log(object);
        img="<img width='100%' src='"+object+"'/>";
        $("#"+i).html(img);
        console.log(data[i]);
      }
      */
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
  })

  $("#flip").turn({
    width:"168vw", 
    height:"132vw"
  });
});
// function set building conditions
function setBuildings(build){
    for(var i=0; i<build.length; i++){
      if(build[i]!=null){
        console.log((i+1)+": "+build[i]);
        buildings= "buildings/"+build[i]+".png";
        img="<img width='100%' src='"+buildings+"'/>";
        $("#block"+(i+1)).html(img);
        $("#block"+(i+1)).css("background-color","rgb(255, 255, 255, 0)");
      }
      $('#block' +(i+1)).click( createCallback( (i+1), build[i] ) );
    }
}
// function set objects
function setobjects(obj){
    if(obj.length==0){
      var object= "asset/block.png";
      console.log(object);
      img="<img width='100%' src='"+object+"'/>";
      $("#0").html(img);
      console.log(obj[i]);
    }
    for(var i=0; i<obj.length; i++){
      if(obj[i]!=null){
        var object= "objects/"+obj[i]+".png";
        console.log(object);
        img="<img width='100%' src='"+object+"'/>";
        $("#"+i).html(img);
        console.log(obj[i]);
      }else{
        var object= "asset/block.png";
        console.log(object);
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
    console.log(i-1);
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

