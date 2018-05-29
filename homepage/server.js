const express = require('express')
const app = express()
const port = 10069 

app.listen(port)

app.use(express.static(__dirname + '/public')
    )   

var  mysql= require('mysql');
var con = mysql.createConnection({
  host:"localhost",
  user:"uidd2018_groupG",
  password:"webGGdata",
  // Our database-name: uidd2018_groupG
  database: "uidd2018_groupG"
});

app.get("user_data", function(req, res) {
  var uid = req.query.user_id;
  var uname = req.query.user_name;

  con.connect(function(err){
    if(err) throw err;
    console.log("Connected!"+uid);
    var sql = "INSERT IGNORE INTO users(id, name, exp, lv) VALUES ?";
    var values = [
      [uid, uname, 0, 1],
    ];
      con.query(sql, [values], function(err,result){
        if(err) throw err;
        console.log("Record: " + uname + "inserted");
      });
  });
});
