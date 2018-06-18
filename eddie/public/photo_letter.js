 
$(document).ready(function()
{
 var on=1;
  $('.next').click(function()     //to the next page
      {
        window.location.assign('../letter/output.html');
    });
  $('.close').click(function()     //to last page
      {
        window.location.assign('../letter/letter1.html')
 
     });
   $('.star1').click(function()
  {  
    if((on%2)==1)
    {
      $('.star1').attr("src","./picture1/star_yellow.png");
      on++;
    }
    else if((on%2)==0)
    {
 $('.star1').attr("src","./picture1/star_gray.png");
      on++;
    
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






