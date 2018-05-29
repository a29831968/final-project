$(document).ready(function(){
	//logo animation
    $("#logo").animate({width: '50%',left: '25%',top: '43%'});

});


//FB

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}
(document, 'script', 'facebook-jssdk'));


function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
	
	if(response.status === 'connected'){
		console.log('connected');
	}
	else{
		console.log('user not authorized');
	}
		
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
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
	
    FB.Event.subscribe('auth.authResponseChange', function(response){
        if (response.status === 'connected'){
	console.log('authResponse changed to connected');
	window.top.location = '../homepage/homepage.html';
  }
});

	
	
  //get friends
  /*FB.api('/me/friends?limit=99',function(response){
	var result_holder = document.getElementById('friend_list');
	var friend_data = response.data.sort(sortMethod);
	var results = '';
	for(var i = 0; i< friend_data.length; i++){
		result += '<div><img src="https://graph.facebook.com/' + friend_data[i].id + '/picture">' +'</div';
	}
	
	//display friends
	result_holder.innerHTML = results;
	});*/
};



function login() {
	FB.login(function(response) {
	// handle the response
	statusChangeCallback(response);
    console.log("Response goes here!");
	}, {scope: 'public_profile,email'});            
}

