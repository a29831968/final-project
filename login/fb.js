$(document).ready(function(){
    $("#logo").animate({width: '50%',left: '25%',top: '43%'});
});
window.fbAsyncInit = function() {
  FB.init({
    appId: '1814380432190801',
    xfbml: true,
    version: 'v2.0'
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

function login() {
  FB.login(function(response) {
  // handle the response
    console.log("Response goes here!");
  }, {scope: 'email'});            
}
//var status = FB.getLoginStatus();
/
