const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
const port = 10068

app.listen(port)

//create https
const options = 
{
  ca: fs.readFileSync('/home/uidd2018/ssl/ca_bundle.crt'),
  cert: fs.readFileSync('/home/uidd2018/ssl/certificate.crt'),
  key: fs.readFileSync('/home/uidd2018/ssl/private.key')
}
https.createServer(options, app).listen(port, () => console.log(`listen on port:`+port));

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "uidd2018_groupG",
  password: "webGGdata",
  database: "uidd2018_groupG"
});

app.use(express.static(__dirname + ''))

app.get("/letter", function(req, res)){

}
