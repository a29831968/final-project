$(document).ready(function(){
  console.log("get ready");
  // .ajax get building condition
  $.ajax({
    method:"get",
    url: "./buildings",
    data:{
    },
    success: function(data){
      console.log("buidling condition: "+data);
    }
  })

  for(var i = 1; i <= 20; i++) {
    $('#block' + i).click( createCallback( i ) );
  }
  $("#testbtn").click(function(){
    $("#flip").css({display:"block"});
  })

  $("#flip").turn({
    width:"168vw", 
    height:"132vw"
  });
});

function createCallback( i ){
  
  return function(){
      alert('you clicked' + i);
    }
}
