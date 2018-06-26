const express=require('express');
const uuid = require('node-uuid');  
const app=express();
const fs = require('fs')
const https = require('https')
const port=10061;
const imgurUPLOAD=require('./modules_extended/imgurapi');
const mysql=require('mysql') 
// create https
const options = 
{
  ca: fs.readFileSync('/home/uidd2018/ssl/ca_bundle.crt'),
  cert: fs.readFileSync('/home/uidd2018/ssl/certificate.crt'),
  key: fs.readFileSync('/home/uidd2018/ssl/private.key')
}
https.createServer(options, app).listen(port, () => console.log(`listen on port:`+ port));

var bodyParser = require('body-parser');
var getlink='';   //get link
var getid='';  //get id from first picture
var link=new Array();
var uid='';
var 
   date,
   star,
   place,
   friend,
   topic,
   content;
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
var con = mysql.createConnection({    //to connect the database
    host: "localhost",
    user: "uidd2018_groupG",
    password: "webGGdata",
    database: "uidd2018_groupG"
});

function tes(link){
  console.log('hi');
  console.log(link[0]);
}
app.post('/get_picture',function(req,res)   //upload picture to imgur
    {
        
 
function a( callback ){
        
       imgurUPLOAD.up(req.body.img,function(result){

          console.log("result:"+result);
          for(var k=0;k<result.length;k++)
          {
            link[k]=result[k];
            console.log("for loop:"+link[k])
          }
        });
        setTimeout( function(){
            callback();
                 }, 10000);
      }
       
      function b(){   //bloack for mysql 
         for(var k=0;k<link.length;k++)
         { 
            console.log(typeof(link[k]));
            info={pictureurl:link[k],letter_id:uid};   
            con.query("INSERT INTO picture SET ?", info, function (err, result) {
              if (err) throw err;
            });
            if(k==(link.length-1))
            {
              console.log("in the function");
               res.send("test");
            }
        }
    }
       a( function(){b();});
})
app.post('/get_somedata',function(req,res)  //get textarea and put it in database
    {
      
      uid=uuid.v1();
      content=req.body.textarea;  
      topic=req.body.topic;  
      date=req.body.x
        star=req.body.star
        place=req.body.getplace
        friend=req.body.friend
        var sql = "INSERT INTO letter (letter_id,letter_topic, letter_content,letter_stars,letter_date,letter_palce,letter_friends) VALUES ('"+uid+"','"+topic+"', '"+content+"','"+star+"','"+date+"','"+place+"','"+friend+"');"
        con.query(sql, function (err, result) {
          if (err) throw err;
    console.log(" record inserted");
     });
       console.log(topic)
  con.query("UPDATE letter SET letter_stars = ? WHERE letter_stars = NULL", star,function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated")
});
}); 
//send post data to post
    app.get("/timeline/post_data", function(req, res) {
  console.log("receive request from TL");
			var sql = "SELECT letter_id, letter_topic, letter_like FROM letter";
		
		con.query(sql, function(err, result){
			if(err) throw err;
      res.send(result);
		});
	
});

//var req_pid; //stores requested pid from timeline

//receive pid from timeline req
app.get("/timeline/pidreq", function(req, res){
  uid=req.query.pid;
  console.log("received req for pid="+req_pid);
});
app.get("/B/post_data", function(req, res){
      var sql= "SELECT * FROM letter WHERE letter_id=?";
    con.query(sql, uid, function(err, result){
      if(err) throw err;
      console.log(result);
      res.send(result);
    });
  });

app.get("/B/picture", function(req,res){
  var sql = "SELECT pictureurl FROM picture WHERE letter_id=?";
  con.query(sql, uid, function(err,result){
    if(err) throw err;
    res.send(result);
  });
});

//USER_ID
app.get("/B/like_data", function(req, res){
  var sql = "SELECT * FROM likes WHERE uid=? AND pid=?";
  con.query(sql, [USER_ID, uid], function(err, result){
    if(err) throw err;
    res.send(result);
  });
});

app.get("/B/insert", function(req, res){
  var sql = "INSERT INTO likes (uid, pid) VALUES ?";
  var values = [[USER_ID, uid],];
  con.query(sql, [values], function(err, result){
    if(err) throw err;
    console.log("inserted");
  });
});

app.get("/B/delete", function(req, res){
  var sql = "DELETE FROM likes WHERE uid=? AND pid=?";
  con.query(sql, [USER_ID, uid], function(err, result){
    if(err) throw err;
    console.log("deleted");
  });
});

app.get("/B/like_count", function(){
  console.log("counting likes...");
  var sql = "SELECT uid FROM likes WHERE pid=?";
  con.query(sql, uid, function(err,result){
    if(err) throw err;
    var count = result.length;
    console.log(count);
    var sql = "UPDATE letter SET letter_like = ? WHERE letter_id = ?";
    con.query(sql, [count, uid], function(err,result){
      if(err) throw err;
      console.log("count updated");
    });
  });
});
  




