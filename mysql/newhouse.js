$(document).ready(function() { 
  $("#flip").turn({
    width:1720,
    height:1270
  });
  // trigger the modal
  $("#btn").click(function(){
    $(".jquery-modal blocker current").css({height:"1270px", width:"860px"});
    $("#flip").modal({left:"-860px", height:"1270px", width:"860px"}).modal('show');
  })
  
  // get bag objects from table: objs
  $.ajax({
    method: "get",
    url: "./objs",
    data:{
    },
    success: function(data){
      console.log("final: "+data); 
      for(var i=0; i<data.length; i++){
        var object= "asset/"+data[i]+".png";
        console.log(object);
        img="<img width='100%' src='"+object+"'/>";
        console.log(img);
        $("#"+i).html(img);
        console.log(data[i]);
      }
    }
  })
})
