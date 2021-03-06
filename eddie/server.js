const express=require('express');
const uuid = require('node-uuid');  
const app=express();
const fs = require('fs')
const https = require('https')
const port=10063;
const imgurUPLOAD=require('./modules_extended/imgurapi.js');
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
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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
var con = mysql.createConnection({    //to connect the database
  host: "localhost",
  user: "uidd2018_groupG",
  password: "webGGdata",
  database: "uidd2018_groupG"
});
//  Tony's part

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
// check if user is already in the database or not.
var check_User=require('./module/log.js');
// global store building and obj
var buildings_info=[];
var objs_info=[];
// require retreive obj & building
var data_obj=require('./module/retreiveObj.js');
var data_building=require('./module/retreiveBuildings.js');

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
        con.query("UPDATE user SET url = ? WHERE name = ?",[user_info.url, user_info.name],function(err, result){
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
    data_building.retreive_buildings(con, user_info.name, function(result){
      var total=0;
      for(var i=0; i<result.length; i++){
        if(result[i]!=null){
          total=total+1;
        }
      }
      con.query("SELECT * FROM objects WHERE name = ?", user_info.name,function(err, result){
        if(err) throw err;
        total=parseInt(total)+parseInt(result[0].amount);
        res.send({total:total, user_profile:user_info});
      })
    });  
  }); 
})
app.post('/user',function(req,res)
    {  
      res.send({user_info_name:user_info.name, user_info_url:user_info.url}); 
    })
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
  // get experience
  con.query("SELECT * FROM user WHERE name = ?", user_info.name,function(err, result){
    if(err) throw err;
    var exp=result[0].exp;
    console.log("ex:"+exp);
    exp=parseInt(exp)+20;
    con.query("UPDATE user SET exp = ? WHERE name = ?", [ exp, user_info.name],function(err, result){
      if(err) throw err;
    })
  })
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
    for (var i=1; i<=35; i++){
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
  con.query("SELECT * FROM total WHERE name = ? AND district = ?", [user_info.name, district],function(err, result){
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

// profile page
app.get("/profile_profile", function(req, res){
  data_building.retreive_buildings(con, user_info.name, function(result){
    var total=0;
    for(var i=0; i<result.length; i++){
      if(result[i]!=null){
        total=total+1;
      }
    }
    con.query("SELECT * FROM objects WHERE name = ?", user_info.name,function(err, result){
      if(err) throw err;
      total=parseInt(total)+parseInt(result[0].amount);
      res.send({total:total, user_profile:user_info});
    })
  });  
})
//

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
      console.log("in the get_somedata");
      uid=uuid.v1();
      content=req.body.textarea;  
      topic=req.body.topic;  
      date=req.body.x
        star=req.body.star
        place=req.body.getplace
        friend=req.body.friend
        var sql = "INSERT INTO letter (letter_writer ,letter_id,letter_topic, letter_content,letter_stars,letter_date,letter_palce,letter_friends) VALUES ('"+user_info.name+"','"+uid+"','"+topic+"', '"+content+"','"+star+"','"+date+"','"+place+"','"+friend+"');"
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
  var sql = "SELECT letter_id, letter_topic, letter_like, letter_comment FROM letter";

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

app.get("/B/user_pic", function(req,res){
  console.log("id:"+uid);
  var sql = "SELECT letter_writer FROM letter WHERE letter_id=?";
  con.query(sql, uid, function(err, result){
    if(err) throw err;
    var x=result[0].letter_writer;
    console.log("debug:"+result[0].letter_writer);
    var sql="SELECT url FROM user WHERE name=?";
    con.query(sql, x, function(err,result){
      if(err) throw err;
      console.log("send icon");
      res.send(result);
    });
  });
});

//USER_ID
app.get("/B/like_data", function(req, res){
  var sql = "SELECT * FROM likes WHERE uid=? AND pid=?";
  con.query(sql, [user_info.uid, uid], function(err, result){
    if(err) throw err;
    res.send(result);
  });
});

app.get("/B/insert", function(req, res){
  var sql = "INSERT INTO likes (uid, pid) VALUES ?";
  var values = [[user_info.uid, uid],];
  con.query(sql, [values], function(err, result){
    if(err) throw err;
    console.log("inserted");
  });
});

app.get("/B/delete", function(req, res){
  var sql = "DELETE FROM likes WHERE uid=? AND pid=?";
  con.query(sql, [user_info.uid, uid], function(err, result){
    if(err) throw err;
    console.log("deleted");
  });
});

app.get("/B/like_count", function(req, res){
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
    res.send({count:count});
  });
});

// show all comments
app.get("/comment_show", function(req, res){
  var sql = "SELECT user_name, user_url, comment FROM comment WHERE pid= ? ";
  con.query(sql, uid, function(err,result){
    if(err) throw err;
    res.send(result);
  });
});

// insert comment
app.get("/get_comment", function(req, res){
  var sql = "INSERT INTO comment SET  ?";
  var values = {user_name: user_info.name, user_url: user_info.url, comment:req.query.message, pid:uid};
  con.query(sql, values, function(err, result){
    if(err) throw err;
    console.log("show after insert msg");
    var sql = "SELECT user_name, user_url, comment FROM comment WHERE comment= ? ";
    con.query(sql, req.query.message, function(err,result){
      if(err) throw err;
      res.send(result);
    });
  })
});
app.get("/B/comment_count", function(req,res){
  var sql="SELECT user_name FROM comment WHERE pid=?";
  con.query(sql, uid, function(err, result){
    var count=result.length;
    var sql="UPDATE letter SET letter_comment=? WHERE letter_id=?";
    con.query(sql, [count, uid], function(err, result){
      if(err) throw err;
      console.log("comment count updated");
    });
  });
});
