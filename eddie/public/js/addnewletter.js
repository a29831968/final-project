var statusofupload=0;
var input=0;
var img=new Array(10);
$(document).ready(function()
{   
 $('.close').click(function()   //back to last page
  {
      window.location.assign('../letter/letter1.html') 
  });
   $("#pictureupload").change(function(){   //for upload picture
      $('#form2').html('<h1 id="l">Loading...</h1>')
        readURL(this); 

   });
 function readURL(input){    //to translate the upload picture into fancybox and store it into array 
  
   for(var i = 0; i < input.files.length; i ++){
     var reader = new FileReader();
      reader.onload = function (e) {
        img[i]=e.target.result;
        // if(i==input.files.length)
       // $('#l').hide(); 
      
      }
      reader.readAsDataURL(input.files[i]);
    }
  }   //end readurl
  $('.next').click(function(event)
  {
     var data=JSON.stringify(img);
     console.log(data);
    $.ajax({
      method:"get",
      url:"./get_picture",
      data:data,
      datatype:json
    }); // end ajax
  });// end click
});
