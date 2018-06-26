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

app.get("/timeline/post_data", function(req, res) {
  console.log("receive request from TL");
			var sql = "SELECT letter_id, letter_topic, letter_like FROM letter";
		
		con.query(sql, function(err, result){
			if(err) throw err;
      res.send(result);
		});
	
});

var req_pid; //stores requested pid from timeline

//receive pid from timeline req
app.get("/timeline/pidreq", function(req, res){
  req_pid=req.query.pid;
  console.log("received req for pid="+req_pid);
});

//send post data to post
app.get("/B/post_data", function(req, res){
      var sql= "SELECT * FROM letter WHERE letter_id=?";
    con.query(sql, req_pid, function(err, result){
      if(err) throw err;
      console.log(result);
      res.send(result);
    });
  });

app.get("/B/picture", function(req,res){
  var sql = "SELECT pictureurl FROM picture WHERE letter_id=?";
  con.query(sql, req_pid, function(err,result){
    if(err) throw err;
    res.send(result);
  });
});

var uid = 2;//UID
app.get("/B/like_data", function(req, res){
  var sql = "SELECT * FROM likes WHERE uid=? AND pid=?";
  con.query(sql, [uid, req_pid], function(err, result){
    if(err) throw err;
    res.send(result);
  });
});

app.get("/B/insert", function(req, res){
  var sql = "INSERT INTO likes (uid, pid) VALUES ?";
  var values = [[uid, req_pid],];
  con.query(sql, [values], function(err, result){
    if(err) throw err;
    console.log(uid + req_pid +"inserted");
  });
});

app.get("/B/delete", function(req, res){
  var sql = "DELETE FROM likes WHERE uid=? AND pid=?";
  con.query(sql, [uid, req_pid], function(err, result){
    if(err) throw err;
    console.log("deleted");
  });
});

app.get("/B/like_count", function(){
  console.log("counting likes...");
  var sql = "SELECT uid FROM likes WHERE pid=?";
  con.query(sql, req_pid, function(err,result){
    if(err) throw err;
    var count = result.length;
    console.log(count);
    var sql = "UPDATE letter SET letter_like = ? WHERE letter_id = ?";
    con.query(sql, [count, req_pid], function(err,result){
      if(err) throw err;
      console.log("count updated");
    });
  });
});
