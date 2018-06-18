const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
const port = 10063

// create https
const options = 
{
  ca: fs.readFileSync('/home/uidd2018/ssl/ca_bundle.crt'),
  cert: fs.readFileSync('/home/uidd2018/ssl/certificate.crt'),
  key: fs.readFileSync('/home/uidd2018/ssl/private.key')
}
https.createServer(options, app).listen(port, () => console.log(`listen on port:`+ port));

app.use(express.static(__dirname + ''))
// district default set: tainan
var district;
district="tainan";

// set user information
var user_info={
  name:"",
  uid:"",
  url:"",
};

// connect database
var con=require('./module/dbconnect.js');

// check if user is already in the database or not.
var check_User=require('./module/log.js');

// insert default data of new User into db
var new_User=require('./module/newUser.js');
app.get("/user_data", function(req, res) {
  var uid = req.query.user_id;
  var user_name = req.query.user_name;
  var url=req.query.user_pic;
  user_info.uid=uid;
  user_info.url=url;
  user_info.name=user_name;
  check_User.checkUser(con, user_name, uid, function(exist){
    if(exist){
      console.log("User exist"); // if user already exist, nothing happens.
    }else{
      // if user does not exist in db,
      // insert data in it.
      console.log("User not exist");
      new_User.insertUser(con, user_info.name, user_info.uid, user_info.url);
    }
  }); 
})

// global store building and obj
var buildings_info=[];
var objs_info=[];

// require retreive obj & building
var data_obj=require('./module/retreiveObj.js');
var data_building=require('./module/retreiveBuildings.js');
app.get("/buildings", function(req, res) {
  data_building.retreive_buildings(con, user_info.name, function(result){
    buildings_info=result;
    res.send(buildings_info);
  });  
})
app.get("/objects", function(req, res) {
  data_obj.retreive_obj(con, user_info.name, function(result){
    objs_info=result;
    res.send(objs_info);
  });  
})

// update data when put buildings into house
var updata = require('./module/updateBuildingsAndObjects.js');
app.get("/objANDbuild", function(req, res) {
  updata.update(con, user_info.name, buildings_info, objs_info, req, function(result){
    return res.send({buildings_info:result.build, objs_info:result.obj});
  })
})
