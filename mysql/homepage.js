var user_id = 0;     
var user_name ='' ;
var user_pic = '';
$(document).ready(function(){

  $("#tainan_btn").click(function(){
    window.location.assign("./house.html");
  })

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


