var current=0;  
var index;
var initial=1;
if(initial==1)
{
  rightTocenter(1);
  current++;
  initial=0;
}
for(i=1; i<9 ; i++){
  $("div:nth-child("+i+")").click(function() {
            index = $(this).index()+1;
            if(current-1==index){
              leftTocenter(index); 
              centerToright(current);
              current--;
            }else if(current+1==index){
              rightTocenter(index);
              centerToleft(current);
              current++;
            }
            console.log(index);
  });
}

function leftTocenter(x){
        console.log("toCenter"+x); 
        $("div:nth-child("+x+")").animate({height:"1200px",width:"1600px",'top':'0','left':'0',"borderRadius":"0"});
        $("div:nth-child("+x+")").children('img').animate({"height":'100%',"width":"auto",'max-width':'100%','margin-left':"0",'margin-top':'0'});
        $("div:nth-child("+x+")").css({"z-index":"-=1"});
        $("div:nth-child("+(x-1)+")").css({"z-index":"+=1"});
         setTimeout(function(){
               wordsIn(x)},300); 

}
function rightTocenter(x){
        console.log("toCenter"+x); 
        $("div:nth-child("+x+")").animate({height:"1200px",width:"1600px",'top':'0','left':'0',"borderRadius":"0"});
        $("div:nth-child("+x+")").children('img').animate({"height":'100%',"width":"auto",'max-width':'100%','margin-left':"0",'margin-top':'0'});
        $("div:nth-child("+x+")").css({"z-index":"-=1"});
        $("div:nth-child("+(x+1)+")").css({"z-index":"+=1"});
        if(initial==0) 
        {setTimeout(function(){
               wordsIn(x)},300);} 

}

function centerToright(x){
        console.log("center to right "+current);
        $("div:nth-child("+x+")").animate({
          width:"120px",
          height:"120px",
          left:'1300px',
          top:'940px',
          borderRadius:"50%"
        });
        $("div:nth-child("+x+")").children('img').css({
          "height":"200%",
          "margin-left":'-100px',
          "margin-top":'-40px',
          "width":"auto",
          "max-width":'1000%'
        });
        $("div:nth-child("+(x+1)+")").css({"z-index":"-=1"});
        $("div:nth-child("+x+")").css({"z-index":"+=1"});
               wordsOut(x); 

}
function centerToleft(x){
        console.log("center to left "+current);
        $("div:nth-child("+x+")").animate({
          width:"120px",
          height:"120px",
          left:'180px',
          top:'940px',
          borderRadius:"50%"
        });
        $("div:nth-child("+x+")").children('img').css({
          "height":"200%",
          "margin-left":'-100px',
          "margin-top":'-40px',
          "width":"auto",
          "max-width":'1000%'
        });
        $("div:nth-child("+x+")").css({"z-index":"+=1"});
        $("div:nth-child("+(x-1)+")").css({"z-index":"-=1"});
        wordsOut(x);
}
function wordsIn(x){
  $("#text"+x+"1").animate(
  {
     'left':'270px',
     'opacity':'1'
  },500,
  function()
  {
   $("#text"+x+"2").animate(
      {
        'left':'170px',
        'opacity':'1'
      },500,
    function()
    {
      $('#line1').animate(
        {
           'left':'395px',
           'opacity':'1'
        },500,);
       $("#text"+x+"3").animate(  //let words in
      {
        'left':'270px',
        'opacity':'1'
      },500,);
     });})
  }
function wordsOut(x)    //let words out
{
 $("#text"+x+"1").animate(
  {
     'left':'50px',
     'opacity':'0'
  },80,
  function()
  {
   $("#text"+x+"2").animate(
      {
        'left':'50px',
        'opacity':'0'
      },80,
    function()
    {
      $('#line1').animate(
        {
           'left':'50px',
           'opacity':'0'
        },80,);
       $("#text"+x+"3").animate(
      {
        'left':'50px',
        'opacity':'0'
      },80,);
     });})
}
$(document).ready(function()
  {
    $('#box').click(function(){
     $('#aboutus').animate(
        {
            'top':'150px',
           'left':'200px',
          'width':'0px',
           'height':'0px',
            'z-index':'7'
        });
     $('#box').css(
         {
           'z-index':'-1',
           'opacity':'0'
          });
       });
    $('#button').click(function()
        {
              $('#box').animate(
            {     
               'display':'block',
               'opacity':'0.6',
               'z-index':'6'
            },100,);
          $('#aboutus').animate(
              {
               'top':'300px',
               'left':'400px',
               'width':'900px',
               'height':'600px',
             },500); 
        });
    $('#button').mouseover(function()
    {
      $('#button').css({
        'width':'80px',
        'height':'80px',
        'border':'3px red solid'
        })  
    });
    $('#button').mouseout(function()
    {
     $('#button').css({
        'width':'70px',
        'height':'70px',
        'border':'3px white solid'});

    })
   setTimeout(function()
   {  
    $('#insidemask').animate(
      {
        'height':'940px'   
       
      },800,
      function()
      {
        $('#insidesmall').animate(
       {
         'height':'940px'
       },800,
       function()
      {
      
        $('#initial').animate(
            {
              'background-color':'#FFCC66'
            },800,);
        $('#bigmask').animate(
        {
          'height':'1200px'
        },1000,
        function()
         {
            $('#back').css('z-index','10');
            $('#insidesmall').animate(
              { 
                'top':'1075px',
                'height':'0px'
              },1000,
         function()
         {
           $('#initial').css({'opacity':'0','z-index':'-1'});
            $('#insideblock').css({'opacity':'0','z-index':'-1'});
            $('#insidesmall').css({'opacity':'0','z-index':'-1'});
            $('#bigmask').css({'opacity':'0','z-index':'-1'});
            $('#insidemask').css({'opacity':'0','z-index':'-1'});
           setTimeout(function()
              {
                $('#back').css('z-index','0');
                wordsIn(1);
                $('.circular2').animate(
                  {
                      'top':'940px',
                      'left':'1300px',
                      'opacity':'1'
                   },500,
                function()   
                {
                  $('#back').hide();
                  $('#block').hide();
                });
              },1);}
          );}
        );}
       );
      });   //end animate1  
      },2500);  //settime for smartphone
    });  //end ready function
