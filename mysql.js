var  mysql= require('mysql');


var con = mysql.createConnection({
  host:"localhost",
  user:"uidd2018_groupG",
  password:"webGGdata",
  //socketPath:"/var/run/mysqld/mysqld.sock"
});

con.connect(function(err){
  if(err) throw err;
  console.log("connected!");
});
