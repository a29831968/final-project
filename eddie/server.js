const express=require('express');
const app=express();
const port=10062;
const imgurUPLOAD=require('./modules_extended/imgurapi');
const database=require('./modules_extended/dbconnect'); 
var bodyParser = require('body-parser');
var getlink='';   //get link
var getid='';  //get id from first picture
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
app.post('/get_picture',function(req,res)   //upload picture to imgur
    {
      
      imgurUPLOAD.up(req.body.img);    
      res.send( console.log(date,
   star,
   place,
   friend,
   topic,
   content))
        
    });
app.post('/get_form',function(req,res)  //get textarea and put it in database
    {
       content=req.body.textarea;  
        topic=req.body.topic;  
        



    });
app.post('/get_somedata',function(req,res)  //get textarea and put it in database
    {
       date=req.body.x
       star=req.body.star
       place=req.body.getplace
       friend=req.body.friend

    });
