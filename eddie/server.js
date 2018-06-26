const express=require('express');
const uuid = require('node-uuid');  
const app=express();
const port=10061;
const imgurUPLOAD=require('./modules_extended/imgurapi');
const mysql=require('mysql') 
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
app.listen(port);
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
// var sql3 = "UPDATE letter SET letter_date = '"+date+"' WHERE letter_date = 'NULL';"
  //con.query(sql3, function (err, result) {
  //  if (err) throw err;
 // });
 // var sql4 = "UPDATE letter SET letter_place = '"+place+"' WHERE letter_place = 'NULL';"
 // con.query(sql4, function (err, result) {
 //   if (err) throw err;
 //   console.log(result.affectedRows + " record(s) updated")
//});
// var sql5 = "UPDATE letter SET letter_friends = '"+friend+"' WHERE letter_friends = 'NULL';"
  //con.query(sql5, function (err, result) {
    //if (err) throw err;
//  });

    
  });  




