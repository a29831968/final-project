var set=0;
var put=0;
var star=0;
var friend='';
var img=new Array();
$(document).ready(function()
{   
    $.ajax({    //pass picture
      method:"post",
      url:"./user",
      traditional:true,
      data:{},
      success:function(data){
        user_info_name=data.user_info_name;    
        user_info_url=data.user_info_url;    
        $('#head').attr('src',user_info_url); 
        $('.user_name').text(user_info_name);
      }
    });
 $('.close').click(function()   //back to last page
  {
      window.location.assign('../timeline/timeline.html') 
  });
  
      $("#pictureupload").change(function(){   //for upload picture
       $('#form2').html('')
       readURL(this); 
      set=put-1;       
      }) 
       function readURL(input){    //to translate the upload picture into fancybox and store it into array 
   for(var i = 0; i < input.files.length; i++){
     put=input.files.length;
       var reader = new FileReader();
      reader.onload = function (e) { 
       if(e.target.result.search("data:image/jpeg;base64,")==0)
        img.push(e.target.result.replace("data:image/jpeg;base64,",''));    //delete the title of data/image...
       if(e.target.result.search("data:image/png;base64,")==0)
       img.push(e.target.result.replace("data:image/png;base64,",''));   
       var image = $("<img width='100%' height='100%'>").attr('src', e.target.result);
        $("#form2").html(image); 

      }
      
      reader.readAsDataURL(input.files[i]);
    }
       $('#button_left').show();
       $('#button_right').show();
  }   //end readurl
 
   $('#button_left').click(function()   //to preview the picture
{
    set--;
    if(set<0)
     set+=put;
   console.log(set);
    $("#form2>img").attr('src',"data:image/png;base64,"+img[set]);
   
        
});
 $('#button_right').click(function()
{
  set++;
  if(set>=put)
  set-=put;
  $("#form2>img").attr('src',"data:image/png;base64,"+img[set]);
      

});    //end slider
$('.date_tag').click(function()
    {
      $('#choose').show();
    });                                 //choose the date
$('#sure').click(function()
  {
      $('#choose').hide();
      
  });
  $('.people_tag').click(function()
  {
     friend=prompt('與誰再一起:','朋友姓名');
  })
  $('.place_tag').click(function()
{
    $('.googlemap').show();

});
  $('.next').click(function(event)   
  {
    $('#load').show();
    $.ajax({    //pass picture
      method:"post",
      url:"./get_picture",
      traditional:true,
      data:{"img":img},
      success:function(data){
        window.location.assign('../B/B.html');
      }
    });
    console.log("topic:"+$('#topic').val());
    $.ajax({
      method:"post",
     url:'./get_somedata',
     data:{
       "img":img,
       textarea:$('#txt1').val(),
       topic:$('#topic').val(),
       x:x.value,  //date
      getplace:getplace,    //location
      star:star,   //star
      friend:friend  //friend
     },
     success:function(data){
       console.log(data);
    
     }
  })
  });  //  clicl next
});   //ready function
