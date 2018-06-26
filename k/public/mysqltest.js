var mysql = require('mysql');

var con = mysql.createConnection({
  host:"localhost",
  user:"uidd2018_groupG",
  password:"webGGdata",
  database:"uidd2018_groupG"
});
  con.query("SELECT letter_id, letter_topic, letter_like FROM letter" ,function(err, result, fields){
    if(err) throw err;
    console.log(result);
});
