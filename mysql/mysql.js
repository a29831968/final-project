var  mysql= require('mysql');


var con = mysql.createConnection({
  host:"localhost",
  user:"uidd2018_groupG",
  password:"webGGdata",
  // Our database-name: uidd2018_groupG
  database: "uidd2018_groupG"
});

con.connect(function(err){
  if(err) throw err;
  console.log("connected!");
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  con.query("SELECT * FROM users WHERE name='Annie'", function(err, result){
    if (err) throw err;
    console.log(result);
  });
});


