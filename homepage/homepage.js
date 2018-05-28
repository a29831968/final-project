
/*var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "uidd2018_groupG",
  password: "webGGdata",
  database: " uidd2018_groupG"
});
*/

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
	
	if(response.status === 'connected'){
		//fetch user data
		FB.api('/me?fields=picture,name,id',function(response){
		console.log('user name:' + response.name + 'user id:' + response.id + 'user pic:' + response.picture.data.url);
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


/*function dataAPI(){
	console.log('dataAPI() called');
	FB.api('/me?fields=picture,name',function(response){
		console.log(response);
		var user_id = response.id;
		var user_name = response.name;
		var user_pic = response.pictue.data.url;
	});
	
	con.connect(function(err) {
		if (err) throw err;
		con.query("SELECT * FROM users WHERE id = user_id", function (err, result) {
			if (err){
				data_insert();
				throw err;
			}
			console.log(result);
		});
	});
}

function data_insert(){
	con.connect(function(err) {
		if (err) throw err;
		console.log('Connected!');
		var sql = "INSERT INTO users (id, name, lv, exp, picture) VALUES (user_id, user_name, 0, 0, user_pic)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log('inserted');
  });
});
};
*/