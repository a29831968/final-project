$(document).ready(function()
  {
     var input='';
    $.ajax({
         method:"get",
         url:"comment_show",
         success:function(data){
       

         }
     $.ajax({
      method:"get",
     url:'./get_comment',
     data:{
       message:$('#message').val()
     },
     success:function(data){
       console.log(data);
    
     }
  })






  });
