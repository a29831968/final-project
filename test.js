var current=0;  
var index;
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
}
function rightTocenter(x){
        console.log("toCenter"+x); 
        $("div:nth-child("+x+")").animate({height:"1200px",width:"1600px",'top':'0','left':'0',"borderRadius":"0"});
        $("div:nth-child("+x+")").children('img').animate({"height":'100%',"width":"auto",'max-width':'100%','margin-left':"0",'margin-top':'0'});
        $("div:nth-child("+x+")").css({"z-index":"-=1"});
        $("div:nth-child("+(x+1)+")").css({"z-index":"+=1"});
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
}
