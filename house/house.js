$(document).ready(function()
    {
       $('.entrance').click(function()     //switch the page
          {
            $('.switchscreen').animate(
                {
                  'left':'0px', 
                  'top':'0px',
                   'width':'100%',
                   'height':'100%'
                },
                100,
               function()
               {
                 window.location.assign("./letter/letter1.html"); 
                });
          });
           $(".box").click(function(){      //the animate of open the box
         $("#chgicon").attr("src","picture/box_open.png");
       });
    });
