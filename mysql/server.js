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
  lv:"",
  exp:"",
};
var friend_list;
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
  check_User.checkUser(con, user_info.name, uid, function(exist){
    if(exist){
      console.log("User exist"); // if user already exist, nothing happens.
      con.query("SELECT * FROM user WHERE name = ? ", user_info.name,function(err, result){
      if(err) throw err;
        user_info.lv=result[0].lv;
        user_info.exp=result[0].exp;
        con.query("UPDATE user SET url = ?",user_info.url,function(err, result){
          if(err) throw err;
        })
        // get all users
        con.query("SELECT * FROM user" ,function(err, result){
          if(err) throw err;
          friend_list=result;
        })
      })
    }else{
      // if user does not exist in db,
      // insert data in it.
      console.log("User not exist");
      new_User.insertUser(con, user_info.name, user_info.uid, user_info.url);
      user_info.lv=1;
      user_info.exp=0;
      // get all users
      con.query("SELECT * FROM user" ,function(err, result){
        if(err) throw err;
        friend_list=result;
      })
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
// user all info && all user
app.get("/user_all_info", function(req, res) {
  console.log("check:"+friend_list[0].url);
  res.send({user_info:user_info, friend_list:friend_list});
});  
// update data when put buildings into house
var updata = require('./module/updateBuildingsAndObjects.js');
app.get("/objANDbuild", function(req, res) {
  updata.update(con, user_info.name, buildings_info, objs_info, req, function(result){
    return res.send({buildings_info:result.build, objs_info:result.obj});
  })
})


// show objects on map
app.get('/showObjs', function(req, res){
  var mapObjs=[];
  var total=[];
  con.query("SELECT * FROM total WHERE name = ? AND district = ?", [user_info.name, district],function(err, result){
    if(err) throw err;
    total=result[0];
    console.log("total:"+total);
    con.query("SELECT * FROM map", function(err, result){
      if(err) throw err;
      console.log("length:"+result.length);
      for(var i=0;i<result.length ; i++){
        if(total==null || total[i+1]==null){
          mapObjs.push({filename: result[i].filename, 
            lat:result[i].lat, lng:result[i].lng
          })
        }else{
          mapObjs.push(null);
        }
      }
      res.send({mapObjs:mapObjs});
    });
  }); 
})
// get data from maps
app.get('/mapObjGet', function(req, res){
  console.log("back");
  var index_number=req.query.objNumber;
  var overall=0;
  con.query("SELECT * FROM total WHERE name = ? AND district = ?", [user_info.name, district],function(err, result){
    if(err) throw err;
    overall=result[0].overall+1;
    console.log("type overall:"+ typeof(overall));
    console.log("overall:"+overall);
    //
    con.query("UPDATE total SET overall = ? WHERE name = ? AND district = ?", [ overall, user_info.name, district],function(err, result){
      if(err) throw err;
      console.log("index_number:"+index_number);
      con.query("UPDATE total SET ??  = 1 WHERE name = ? AND district = ?", [ index_number ,user_info.name, district],function(err, result){
        if(err) throw err;
        console.log("2..");
      }); 
    }); 
  }); 
  con.query("SELECT * FROM objects WHERE name = ? AND district = ?", [user_info.name, district],function(err, result){
    if(err) throw err;
    console.log("3..");
    var amount=result[0].amount+1;
    for (var i=1; i<=25; i++){
      if(result[0][i]==null){
        con.query("UPDATE objects SET ??  = ? WHERE name = ? AND district = ?", [i, index_number ,user_info.name, district],function(err, result){
          if(err) throw err;
        });
        break;
      }
    }
    con.query("UPDATE objects SET amount  = ? WHERE name = ? AND district = ?", [amount ,user_info.name, district],function(err, result){
      if(err) throw err;
    }); 
  });
  getObjAndTotal(req, res);
})

// get total and map
// and send data to map.html
function getObjAndTotal(req, res){
  var mapObjs=[];
  var total=[];
  con.query("SELECT * FROM total WHERE name = ? AND district = ?", [user_name, district],function(err, result){
    if(err) throw err;
    total=result[0];
  }); 
  con.query("SELECT * FROM map", function(err, result){
    if(err) throw err;
    for(var i=0;i<result.length ; i++){
      if(total[i+1]==null){
        mapObjs.push({filename: result[i].filename, 
          lat:result[i].lat, lng:result[i].lng
        })
      }else{
        mapObjs.push(null);
      }
    }
    res.send({mapObjs:mapObjs});
  });
}
// set friend's name
var friend;
var friend_buildings_info;
var friend_objs_info;
app.get("/friend_id", function(req, res) {
  var uid = req.query.id;
  con.query("SELECT * FROM user WHERE id = ?", uid,function(err, result){
    if(err) throw err;
    friend=result;
  })
})
// get friend own info
app.get("/friend_own_info", function(req, res) {
    res.send(friend);
})
// friend's buildings and objs
app.get("/friend_buildings", function(req, res) {
  data_building.retreive_buildings(con, friend[0].name, function(result){
    friend_buildings_info=result;
    res.send(friend_buildings_info);
  });  
})
app.get("/friend_objects", function(req, res) {
  data_obj.retreive_obj(con, friend[0].name, function(result){
    friend_objs_info=result;
    res.send(friend_objs_info);
  });  
})
