var user_id = 0;     
var user_name ='' ;
var user_pic = '';
$(document).ready(function(){
  // navigate to map.html
  $("#map").click(function(){
    window.location.assign("./map.html");
  })
  // navigate to house.html
  $("#tainan_btn").click(function(){
    window.location.assign("./house.html");
  })
  // switch profile
  $('#profile').click(function(){
    $('.change_to_profile').animate(
        {
          'left':'0px',
          'top':'0px',
          'width':'100vw',
          'height':'100vh',
          'z-index':'2'
        }, 100,
        );
    $('.profile_bottom').css({'display':'block'});
  });
})
function statusChangeCallback(response) {
    if(response.status === 'connected'){
      //fetch user data
      FB.api('/me?fields=picture,name,id',function(response){
        user_id = response.id;
        user_name = response.name;
        user_pic = response.picture.data.url;
        console.log('user name=' + user_name + '/user id=' + user_id + '/user pic=' + user_pic);
        $.ajax({
          method: "get",
          url:"./user_data",
          data: {
            user_id: user_id,
            user_name: user_name,
            user_pic: user_pic,
          },
          success: function(data){
            total=data.total;
            percent=(total/20)*100;
            user_profile=data.user_profile;
            $("#cir").append('<p id="dis_name">'+percent+'%</p>');
            $(".profile_profile").append('<p class="profile_name">'+user_profile.name+'</p><br><p class="profile_name">Lv:'+user_profile.lv+'</p><br>')
              $(".profile_profile").append('<canvas id="canvas1" width="300" height="20"></canvas>'); 
            $(".pro_cir").append('<img width="100vw" src="'+user_profile.url+'"/>')
              // draw exp
              var canvas = document.getElementById("canvas1");
            if (canvas.getContext) {
              var ctx = canvas.getContext("2d");
              ctx.fillStyle = "rgb(255,228,196)";
              ctx.fillRect (0, 0, 300, 20);
              exp=parseInt(user_profile.exp)*3; 
              ctx.fillStyle = "rgb(200,0,0)";
              ctx.fillRect (0, 0, exp, 20);
            }
          },
        });
      });
    }
    else{
      console.log('user not authorized');
    }
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '1814380432190801',
    cookie: true,
    xfbml: true,
    version: 'v2.0'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}
(document, 'script', 'facebook-jssdk'));


