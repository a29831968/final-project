const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
const port = 10063

// create https
const options = 
{
  ca: fs.readFileSync('/home/uidd2018/ssl/ca_bundle.crt'),
  cert: fs.readFileSync('/home/uidd2018/ssl/certificate.crt'),
  key: fs.readFileSync('/home/uidd2018/ssl/private.key')
}
https.createServer(options, app).listen(port, () => console.log(`listen on port:`+ port));

//app.listen(port);
app.use(express.static(__dirname + ''))
// district default set: tainan
var district;
district="tainan";
// user_name default set: John
var user_name;
user_name="";

// connect database
var con=require('./dbconnect.js');
var tt=require('./test.js');
username="John";
con.query("SELECT * FROM objects WHERE name = ?",user_name, function(err, result){
    if(err) throw err;
    tt.test();
    tt.easy(con);
});

// check if user is already in the database or not.
var checkUser=require('./log.js');

app.get("/user_data", function(req, res) {
  var uid = req.query.user_id;
  var uname = req.query.user_name;
  var url=req.query.user_pic;
  checkUser.checkUser(con, "Tony Yang", "jdeidjeu");
  if(checkUser.checkUser){
    console.log("it is true.")
  }
})
