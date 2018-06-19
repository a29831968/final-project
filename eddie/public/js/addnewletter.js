var statusofupload=0;
$(document).ready(function()
{   
 $('.close').click(function()   //back to last page
  {
      window.location.assign('../letter/letter1.html') 
  });
 $('.next').click(function()   //back to the finish page
     {  
       
        window.location.assign('../letter/letter1.html')
     });
   $("#pictureupload").change(function(){   //for upload picture
      $('#form2').html('<h1 id="l">Loading...</h1>')
        readURL(this); 

   });
 function readURL(input){    //to translate the upload picture into fancybox and store it into array
   var img=new Array(input.files.length);  
   for(var i = 0; i < input.files.length; i ++){
     var reader = new FileReader();
      reader.onload = function (e) {
        img[i]=$("<img class='gallery' width='100%' height='100%'>").attr('src', e.target.result);
        $('#form2').append(img[i]);
        if(i==input.files.length)
        $('#l').hide(); 
      }
      reader.readAsDataURL(input.files[i]);
      
    }
  }   //end readurl


  
});
