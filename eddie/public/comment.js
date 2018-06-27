$(document).ready(function(){
  var input='';
  $("#back").click(function(){
    window.location.assign('./B/B.html');
  })
  $.ajax({
    method:"get",
    url:"comment_show",
    success:function(data){
      for(var i=0; i<data.length;i++){
        $("#holder").append('<div class="comment"><img class="icon" src="'+data[i].user_url+'"/><div class="name">'+data[i].user_name+':</div><div class="content">'+data[i].comment+'</div>')
      }       
    }
  });
  $("#enter").click(function(){
    $.ajax({
      method:"get",
      url:'./get_comment',
      data:{
        message:$('#message').val()
      },
      success:function(data){
        console.log(data);
        $("#holder").append('<div class="comment"><img class="icon" src="'+data[0].user_url+'"/><div class="name">'+data[0].user_name+':</div><div class="content">'+data[0].comment+'</div>')
        $("#input").html('<textarea placeholder="留言..." id="message"></textarea><img src="./picture/input.png" id="enter"/>');
      }
    });
  })
})
