var statusl=0;
var star=0
$('.star1').click(function()  //click star to give score
  { 
    if(statusl==1)   //unlight 
    {
      $('.star1').html('<img src="./picture/star_gray.png">')
       $('.star2').html('<img src="./picture/star_gray.png">')
      $('.star3').html('<img src="./picture/star_gray.png">')
      $('.star4').html('<img src="./picture/star_gray.png">')
      $('.star5').html('<img src="./picture/star_gray.png">')
       star=0;
        statusl=0;  
   }
    else if(statusl==0)    //light
    {
        $('.star1').html('<img src="./picture/star_yellow.png">')
         
       star=1;
       statusl=1;
    }
      });
$('.star2').click(function()  //click star to give score
  { 
    if(statusl==1)   //unlight 
    {
       $('.star1').html('<img src="./picture/star_gray.png">')
       $('.star2').html('<img src="./picture/star_gray.png">')
      $('.star3').html('<img src="./picture/star_gray.png">')
      $('.star4').html('<img src="./picture/star_gray.png">')
      $('.star5').html('<img src="./picture/star_gray.png">')
        star=0
      statusl=0;  
   }
    else if(statusl==0)    //light
    {
     $('.star1').html('<img src="./picture/star_yellow.png">')
       $('.star2').html('<img src="./picture/star_yellow.png">')
        star=2;
      statusl=1;
    }
      });
$('.star3').click(function()  //click star to give score
  { 
    if(statusl==1)   //unlight 
    {
       $('.star1').html('<img src="./picture/star_gray.png">')
       $('.star2').html('<img src="./picture/star_gray.png">')
      $('.star3').html('<img src="./picture/star_gray.png">')
      $('.star4').html('<img src="./picture/star_gray.png">')
      $('.star5').html('<img src="./picture/star_gray.png">')
      star=0;
      statusl=0;  
   }
    else if(statusl==0)    //light
    {
     $('.star1').html('<img src="./picture/star_yellow.png">')
       $('.star2').html('<img src="./picture/star_yellow.png">')
       $('.star3').html('<img src="./picture/star_yellow.png">')
       star=3;
      statusl=1;
    }
      });
$('.star4').click(function()  //click star to give score
  { 
    if(statusl==1)   //unlight 
    {
       $('.star1').html('<img src="./picture/star_gray.png">')
       $('.star2').html('<img src="./picture/star_gray.png">')
      $('.star3').html('<img src="./picture/star_gray.png">')
      $('.star4').html('<img src="./picture/star_gray.png">')
      $('.star5').html('<img src="./picture/star_gray.png">')
        star=0;
      statusl=0;  
   }
    else if(statusl==0)    //light
    {
     $('.star1').html('<img src="./picture/star_yellow.png">')
       $('.star2').html('<img src="./picture/star_yellow.png">')
       $('.star3').html('<img src="./picture/star_yellow.png">')
        $('.star4').html('<img src="./picture/star_yellow.png">')
     star=4;
      statusl=1;
    }
      });
$('.star5').click(function()  //click star to give score
  { 
    if(statusl==1)   //unlight 
    {
       $('.star1').html('<img src="./picture/star_gray.png">')
       $('.star2').html('<img src="./picture/star_gray.png">')
      $('.star3').html('<img src="./picture/star_gray.png">')
      $('.star4').html('<img src="./picture/star_gray.png">')
      $('.star5').html('<img src="./picture/star_gray.png">')
      star=0
      statusl=0;  
   }
    else if(statusl==0)    //light
    {
     $('.star1').html('<img src="./picture/star_yellow.png">')
       $('.star2').html('<img src="./picture/star_yellow.png">')
       $('.star3').html('<img src="./picture/star_yellow.png">')
        $('.star4').html('<img src="./picture/star_yellow.png">')
         $('.star5').html('<img src="./picture/star_yellow.png">')
          star=5
      statusl=1;
    }
      });










