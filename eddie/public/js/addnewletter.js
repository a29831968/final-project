var set=0;
var put=0;
var star=0;
var img=new Array();
$()
$(document).ready(function()
{   
 $('.close').click(function()   //back to last page
  {
      window.location.assign('../letter/letter1.html') 
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
  $('.next').click(function(event)   //to translate picture
  {
    $.ajax({
      method:"post",
      url:"./get_picture",
      traditional:true,
      data:{img:img},
    }); // end ajax
  $.ajax({
    method:"post",
    url:"./get_textarea",
    data:{
      textarea:$('#txt1').val()

     }
    });
  });
});
