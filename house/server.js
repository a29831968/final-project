  const express = require('express')
  const app = express()
  const fs = require('fs')
  const https = require('https')
  const port = 10063

  //create https
  const options = 
  {
  ca: fs.readFileSync('/home/uidd2018/ssl/ca_bundle.crt'),
  cert: fs.readFileSync('/home/uidd2018/ssl/certificate.crt'),
  key: fs.readFileSync('/home/uidd2018/ssl/private.key')
  }
  https.createServer(options, app).listen(port, () => console.log(`listen on port:`+ port));

  app.use(express.static(__dirname+'/public'))

  var  mysql= require('mysql');
  var con = mysql.createConnection({
      host:"localhost",
      user:"uidd2018_groupG",
      password:"webGGdata",
      // Our database-name: uidd2018_groupG
      database: "uidd2018_groupG"
     });

app.get("/data",function(req,res){
  var uid = req.query.id;

  con.connect(function(err){
    if(err) throw err;
    console.log("Connected");
    var sql = "SELECT * FROM users WHERE id=?";
    con.query(sql,uid,function(err,result){
      if(err) throw err;
      console.log(result);
    })
    })
})
