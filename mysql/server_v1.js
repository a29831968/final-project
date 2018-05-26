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

var district;
app.get("/ajax_data", function(req, res) {
  district=req.query.district;
  res.send(district)
  res.render( 'test.html', { district:district } );
})

app.get("/test", function(req, res) {
  console.log(row);
  //var test="what";
  res.send(row)
})

var row;
con.connect(function(err){
  if(err) throw err;
  console.log("connected!");
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    row=result;
    console.log(result);
  });
  con.query("SELECT * FROM users WHERE name='Annie'", function(err, result){
    if (err) throw err;
    console.log(result);
  });
});
// retrieve data from table: objs
var user_name="annine";
var objs_info=[];
con.connect(function(err){
  con.query("SELECT * FROM objs WHERE name = ?",user_name, function(err, result){
    if(err) throw err;
    console.log(result);
    var number=result[0].number;
    for(var i=0; i<number;i++){
      console.log("i: "+i);
      console.log("result: "+result[0][i]);
      objs_info.push(result[0][i]);
    }
    console.log("final: "+objs_info);
  })
})
app.get("/objs", function(req, res) {
  console.log(objs_info);
  //var test="what";
  res.send(objs_info);
})
