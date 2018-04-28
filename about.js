$(document).ready(function(){
      $("#inner").slideDown("slow",function(){
              $("#mask").slideDown("slow",function(){
                $("#figure").show("fast",function(){
                  $("#big_mask").slideDown("slow",function(){
                        $("#mask").animate({top:$(document).height()},function(){
                          for (x = 5; x<8 ; x++){
                            $("div:nth-child("+x+")").show("fast");
                          }
                        
                        });
                  });
                });
              });
            });
           });
$(".circular-landscape").on("click",
      function(){
        $(".circular-landscape").children("img").css({"margin-left":$("#figure").offset().left-$("#inner").offset().left});
        $(".circular-landscape").animate({
          width:$("#inner").width(),
          height:$("#inner").height(),
          left:$("#inner").offset().left-$(window).scrollLeft(),
          top:$("#inner").offset().top-$(window).scrollLeft(),
          borderRadius:0
        },300);
        $(".circular-landscape").css({"background-color":"#8BCCC9"});
        $("#big_mask").css({"background-color":"#69A49E"});
        
          })
var current=4;
var index;
for(i=5; i<8 ; i++){
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
        $("div:nth-child("+x+")").children("img").css({"margin-left":$("#figure").offset().left-$("#inner").offset().left});
        $("div:nth-child("+x+")").animate({
          width:$("#inner").width(),
          height:$("#inner").height(),
          left:$("#inner").offset().left-$(window).scrollLeft(),
          top:$("#inner").offset().top-$(window).scrollLeft(),
          borderRadius:0
        },300);
        $("div:nth-child("+x+")").css({"background-color":"#8BCCC9","z-index":"-=1"});
        $("div:nth-child("+(x-1)+")").css({"background-color":"#8BCCC9","z-index":"+=1"});
        $("#big_mask").css({"background-color":"#69A49E"});
}
function rightTocenter(x){
        console.log("toCenter"+x); 
        $("div:nth-child("+x+")").children("img").css({"margin-left":$("#figure").offset().left-$("#inner").offset().left});
        $("div:nth-child("+x+")").animate({
          width:$("#inner").width(),
          height:$("#inner").height(),
          left:$("#inner").offset().left-$(window).scrollLeft(),
          top:$("#inner").offset().top-$(window).scrollLeft(),
          borderRadius:0
        },300);
        $("div:nth-child("+x+")").css({"background-color":"#8BCCC9","z-index":"-=1"});
        $("div:nth-child("+(x+1)+")").css({"background-color":"#8BCCC9","z-index":"+=1"});
        $("#big_mask").css({"background-color":"#69A49E"});
}

function centerToright(x){
        console.log("center to right "+current);
        $("div:nth-child("+x+")").animate({
          width:"100px",
          height:"100px",
          left:$(document).width()*0.75,
          top:$("#inner").height()*0.85,
          borderRadius:"50%"
        },300);
        $("div:nth-child("+x+")").css({"background-color":"#8BCCC9","z-index":"+=1"});
        $("div:nth-child("+(x+1)+")").css({"background-color":"#8BCCC9","z-index":"-=1"});
}
function centerToleft(x){

        console.log("center to left "+current);
        $("div:nth-child("+x+")").animate({
          width:"100px",
          height:"100px",
          left:$(document).width()*0.1,
          top:$("#inner").height()*0.85,
          borderRadius:"50%"
        },300);
        $("div:nth-child("+x+")").css({"background-color":"#8BCCC9","z-index":"+=1"});
        $("div:nth-child("+(x-1)+")").css({"background-color":"#8BCCC9","z-index":"-=1"});
}
