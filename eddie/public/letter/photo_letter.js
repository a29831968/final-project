
var on=0;
$(document).ready(function()
{

  $('.next').click(function()     //to the next page
      {
        window.location.assign('../letter/output.html');
    });
  $('.close').click(function()     //to last page
      {
        window.location.assign('../letter/letter1.html')
 
     });
   $(".star1").click(
  function(){
     $('.star1').attr("src","./picture1/star_yellow.png");

    });
 $('.star2').click(function()    //to light the star
  {
      $('.star2').attr("src","./picture1/star_yellow.png");
      
   });
 $('.star3').click(function()    //to light the star
  {
      $('.star3').attr("src","./picture1/star_yellow.png");
      
   });
 $('.star4').click(function()    //to light the star
  {
      $('.star4').attr("src","./picture1/star_yellow.png");
      
   });
 $('.star5').click(function()    //to light the star
  {
      $('.star5').attr("src","./picture1/star_yellow.png");
      
   });

});  






