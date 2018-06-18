const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
const port = 10069

// create https
const options = 
{
  ca: fs.readFileSync('/home/uidd2018/ssl/ca_bundle.crt'),
  cert: fs.readFileSync('/home/uidd2018/ssl/certificate.crt'),
  key: fs.readFileSync('/home/uidd2018/ssl/private.key')
}
https.createServer(options, app).listen(port, () => console.log(`listen on port:`+ port));

app.use(express.static(__dirname + '')
    )   

var  mysql= require('mysql');
var con = mysql.createConnection({
  host:"localhost",
  user:"uidd2018_groupG",
  password:"webGGdata",
  // Our database-name: uidd2018_groupG
  database: "uidd2018_groupG"
});

app.get("/homepage/user_data", function(req, res) {
  var uid = req.query.user_id;
  var uname = req.query.user_name;

  con.connect(function(err){
    if(err) throw err;
    console.log("Connected!"+uid);
    var sql = "INSERT IGNORE INTO test(id, name, exp, lv) VALUES ?";
    var values = [
      [uid, uname, 0, 1],
    ];
      con.query(sql, [values], function(err,result){
        if(err) throw err;
        console.log("Record: " + uname + "inserted");
      });
  });
});

//test
app.get("/homepage/test_data", function(req, res) {
var x=req.query.id;
var y=req.query.name;

con.connect(function(err){
  if(err) throw err;
  console.log("Connected!"+x);
  var sql = "INSERT IGNORE INTO users(id, name) VALUES ?";
  var values = [
    [x, y],
  ];
    con.query(sql, [values], function(err,result){
      if(err) throw err;
      console.log("record inserted");
    });
});
});


app.get("/ajax_data", function(req, res) {
var x=req.query.id;

con.connect(function(err){
  if(err) throw err;
  console.log("Connected!"+x);
  var sql = "SELECT name FROM users WHERE ID=?";
  var values = [
    [x, 'Smith'],
  ];
    con.query(sql, x, function(err,result){
      if(err) throw err;
      console.log(result);
    });
});
  res.send(result)
})
