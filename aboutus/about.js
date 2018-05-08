
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
    if($(window).width()>"480"){
        $("div:nth-child("+x+")").animate({height:"100vh",width:"133vh",'top':'0%','left':'40vh',"borderRadius":"0"});
        $("div:nth-child("+x+")").children('img').animate({"height":'100vh',"width":"auto",'max-width':'100%','margin-left':"0%",'margin-top':'0%'});
        $("div:nth-child("+x+")").css({"z-index":"-=1"});
        $("div:nth-child("+(x-1)+")").css({"z-index":"+=1"});
         setTimeout(function(){
               wordsIn(x)},300); 
    }else{
    
        $("div:nth-child("+x+")").animate({height:"80vw",width:"100vw",'top':'35vw','left':'0vw',"borderRadius":"0"});
        $("div:nth-child("+x+")").children('img').animate({"height":'100%',"width":"100vw",'max-width':'100%','margin-left':"0%",'margin-top':'0%'});
        $("div:nth-child("+x+")").css({"z-index":"-=1"});
        $("div:nth-child("+(x-1)+")").css({"z-index":"+=1"});
         setTimeout(function(){
               wordsIn(x)},300); 
    }

}
function rightTocenter(x){
        console.log("toCenter"+x); 
    if($(window).width()>"480"){
        $("div:nth-child("+x+")").animate({height:"100vh",width:"133vh",'top':'0%','left':'40vh',"borderRadius":"0"});
        $("div:nth-child("+x+")").children('img').animate({"height":'100%',"width":"auto",'max-width':'100%','margin-left':"0%",'margin-top':'0%'});
        $("div:nth-child("+x+")").css({"z-index":"3"});
        $("div:nth-child("+(x+1)+")").css({"z-index":"4"});
        if(initial==0) 
        {setTimeout(function(){
               wordsIn(x)},300);} 
    }else{
    
        $("div:nth-child("+x+")").animate({height:"80vw",width:"100vw",'top':'35vw','left':'0vw',"borderRadius":"0"});
        $("div:nth-child("+x+")").children('img').animate({"height":'100%',"width":"100vw",'max-width':'100%','margin-left':"0%",'margin-top':'0%'}); 
        $("div:nth-child("+x+")").css({"z-index":"3"});
        $("div:nth-child("+(x+1)+")").css({"z-index":"4"});
        if(initial==0) 
        {setTimeout(function(){
               wordsIn(x)},300);} 
    }
}

function centerToright(x){
        console.log("center to right "+current);
    if($(window).width()>"480"){
        $("div:nth-child("+x+")").animate({
          width:"16vh",
          height:"16vh",
          left:'143vh',
          top:'72vh',
          borderRadius:"50%"
        });
        $("div:nth-child("+x+")").children('img').css({
          "height":"42vh",
          "margin-left":'-120%',
          "margin-top":'-45%',
          "width":"auto",
          "max-width":'none'
        });
        $("div:nth-child("+(x+1)+")").css({"z-index":"3"});
        $("div:nth-child("+x+")").css({"z-index":"4"});
               wordsOut(x); 
    }else{
    
        $("div:nth-child("+x+")").animate({
          width:"11vw",
          height:"11vw",
          left:'80vw',
          top:'95vw',
          borderRadius:"50%"
        });
        $("div:nth-child("+x+")").children('img').css({
          "height":"30vw",
          "margin-left":'-140%',
          "margin-top":'-55%',
          "width":"auto",
          "max-width":'none'
        });
        $("div:nth-child("+(x+1)+")").css({"z-index":"3"});
        $("div:nth-child("+x+")").css({"z-index":"4"});
               wordsOut(x); 
    
    
    }

}
function centerToleft(x){
        console.log("center to left "+current);
    if($(window).width()>"480"){
    
        $("div:nth-child("+x+")").animate({
          width:"16vh",
          height:"16vh",
          left:'53vh',
          top:'72vh',
          borderRadius:"50%"
        });
        $("div:nth-child("+x+")").children('img').css({
          "height":"42vh",
          "margin-left":'-120%',
          "margin-top":'-45%',
          "width":"auto",
          "max-width":'none'
        });
        $("div:nth-child("+(x+1)+")").css({"z-index":"3"});
        $("div:nth-child("+x+")").css({"z-index":"4"});
               wordsOut(x); 
    
    
    
    }else{
        $("div:nth-child("+x+")").animate({
          width:"11vw",
          height:"11vw",
          left:'10vw',
          top:'95vw',
          borderRadius:"50%"
        });
        $("div:nth-child("+x+")").children('img').css({
          "height":"30vw",
          "margin-left":'-140%',
          "margin-top":'-55%',
          "width":"auto",
          "max-width":'none'
        });
        $("div:nth-child("+x+")").css({"z-index":"4"});
        $("div:nth-child("+(x-1)+")").css({"z-index":"3"});
        wordsOut(x);
    }
}
function wordsIn(x){

    if($(window).width()>"480"){
  $("#text"+x+"1").animate(
  {
     'left':'60vh',
     'opacity':'1'
  },500,
  function()
  {
   $("#text"+x+"2").animate(
      {
        'left':'45vh',
        'opacity':'1'
      },500,
    function()
    {
      $('#line1').animate(
        {
           'left':'55vh',
           'opacity':'1'
        },500,);
       $("#text"+x+"3").animate(  //let words in
      {
        'left':'60vh',
        'opacity':'1'
      },500,);
     });})
    }else{
    
  $("#text"+x+"1").animate(
  {
     'left':'7vw',
     'opacity':'1'
  },500,
  function()
  {
   $("#text"+x+"2").animate(
      {
        'left':'10vw',
        'opacity':'1'
      },500,
    function()
    {
      $('#line1').animate(
        {
           'left':'17vw',
           'opacity':'1'
        },500,);
       $("#text"+x+"3").animate(  //let words in
      {
        'left':'10vw',
        'opacity':'1'
      },500,);
     });})
    
    
    
    }
}
function wordsOut(x)    //let words out
{
 $("#text"+x+"1").animate(
  {
     'left':'3%',
     'opacity':'0'
  },80,
  function()
  {
   $("#text"+x+"2").animate(
      {
        'left':'3%',
        'opacity':'0'
      },80,
    function()
    {
      $('#line1').animate(
        {
           'left':'3%',
           'opacity':'0'
        },80,);
       $("#text"+x+"3").animate(
      {
        'left':'3%',
        'opacity':'0'
      },80,);
     });})
}

$(document).ready(function()
  {

    if($(window).width()>"480"){
    $('#box').click(function(){
     $('#aboutus').animate(
        {
            'top':'150px',
           'left':'200px',
          'width':'0vh',
           'height':'0vh',
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
               'top':'5vh',
               'left':'47vh',
               'width':'135vh',
               'height':'90vh',
             },500); 
        });
    $('#button').mouseover(function()
    {
      $('#button').css({
        'width':'6.7vh',
        'height':'6.7vh',
        'border':'0px red solid'
        })  
    });
    $('#button').mouseout(function()
    {
     $('#button').css({
        'width':'5vh',
        'height':'5vh',
        'border':'0px white solid'});

    });
    }else{
    
    $('#box').click(function(){
     $('#aboutus').animate(
        {
            'top':'150px',
           'left':'200px',
          'width':'0vh',
           'height':'0vh',
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
               'top':'50vw',
               'left':'5vw',
               'width':'90vw',
               'height':'70vw',
             },500); 
        });
    $('#button').mouseover(function()
    {
      $('#button').css({
        'width':'4.7vw',
        'height':'4.7vw',
        'border':'0px red solid'
        })  
    });
    $('#button').mouseout(function()
    {
     $('#button').css({
        'width':'5vh',
        'height':'5vh',
        'border':'0px white solid'});

    });
    
    
    
    }
});
