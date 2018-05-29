var user_id = 0;     
var user_name ='' ;
var user_pic = '';

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
	
	if(response.status === 'connected'){
		//fetch user data
		FB.api('/me?fields=picture,name,id',function(response){
                user_id = response.id;
      user_name = response.name;
      user_pic = response.picture.data.url;
		console.log('var value check:user name=' + user_name + 'user id=' + user_id + 'user pic=' + user_pic);
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

setTimeout(function(){
$.ajax({
        method: "get",
        url:"/homepage/user_data",
        data: {
          user_id: user_id,
          user_name: user_name,
        },
        success: function(data){
        },
      });
},3000);
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


