function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
	
	if(response.status === 'connected'){
		//fetch user data
		FB.api('/me?fields=picture,name,id',function(response){
		var u_id = response.id;
		var u_name = response.name;
		var u_pic = response.picture.data.url;
		console.log('user name:' + response.name + 'user id:' + response.id + 'user pic:' + response.picture.data.url);
	});
	}
	else{
		console.log('user not authorized');
	}
		
}

$(document).ready(function() {  
    $.ajax({
        method: "get",
        url: "./user_data",
        data: {
                user_id: u_id,
				user_name: u_name,
				user_pic: u_pic
            },
            success: function(data) {
            
            }
          })
    })  
})

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
