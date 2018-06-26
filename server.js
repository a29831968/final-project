
  const express = require('express')
  const app = express()
  const https = require('https')
  const fs=require('fs')
  const port = 10065

  // create https
  const options = 
{
  ca: fs.readFileSync('/home/uidd2018/ssl/ca_bundle.crt'),
  cert: fs.readFileSync('/home/uidd2018/ssl/certificate.crt'),
  key: fs.readFileSync('/home/uidd2018/ssl/private.key')
}
https.createServer(options, app).listen(port, () => console.log(`listen on port:`+ port));
  /*
const express = require('express')
const app = express()
const port = 10066
*/
//app.listen(port)
app.use(express.static(__dirname + '')) // /public
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies

// get json file from the file: name.json
//var fs = require('fs');
var obj;
fs.readFile('./public/name.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
});

app.post('/get_data', function(req, res){
  // req.body.idname, is how you get from html
  var idname = req.body.idname;
  var name=obj[idname];
  res.send(`<h1>Student's name is: ${name}.</h1>`)
})

app.get("/ajax_data", function(req, res) {
  // req.query.idname, can retrieve value of idname from the .js file
  var id=req.query.idname;
  var name=obj[id];
  res.send(`Student's name is ${name}.`)
})
