const express=require('express');
const app=express();
const port=10061;
const imgurUPLOAD=require('./modules_extended/imgurapi');
var bodyParser = require('body-parser');
app.listen(port);
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.post('/get_picture',function(req,res)   //upload picture to imgur
    { 
      console.log('hello');      
       imgurUPLOAD.up(req.body.img);    
    
    
    
    
    
    
    });
app.post('/get_textarea',function(req,res)  //get textarea and put it in database
    {
       console.log(req.body.textarea);







    });
