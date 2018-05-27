const express = require('express')
const app = express()
const port = 10065

var  mysql= require('mysql');
var con = mysql.createConnection({
  host:"localhost",
  user:"uidd2018_groupG",
  password:"webGGdata",
  // Our database-name: uidd2018_groupG
  database: "uidd2018_groupG"
});


app.listen(port)
app.use(express.static(__dirname + ''))
// district default set: tainan
var district;
district="tainan";
// user_name default set: John
var user_name;
user_name="John";


var row;
con.connect(function(err){
  if(err) throw err;
  console.log("connected!");
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    row=result;
    //console.log(result);
  });
  con.query("SELECT * FROM users WHERE name='Annie'", function(err, result){
    if (err) throw err;
    //console.log(result);
  });
});


// retrieve data from table: buildings
var buildings_info=[];
con.connect(function(err){
  con.query("SELECT * FROM buildings WHERE name = ?",user_name, function(err, result){
    if(err) throw err;
    console.log(result);

    var number=result[0].number;
    console.log("how many buildings:"+number);

    var building=result[0];
    for(var i=1; i<=25;i++){
      console.log("i: "+i);
      console.log("result: "+result[0][i]);
      buildings_info.push(result[0][i]);
    }
    console.log("final: "+buildings_info);
  })
})
app.get("/buildings", function(req, res) {
  console.log("send:"+buildings_info);
  res.send(buildings_info);
})
