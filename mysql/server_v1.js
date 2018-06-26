const express = require('express')
const app = express()
const fs = require('fs')
const https = require('https')
const port = 10065

// create https
const options = 
{
  ca: fs.readFileSync('/home/uidd2018/ssl/ca_bundle.crt'),
  cert: fs.readFileSync('/home/uidd2018/ssl/certificate.crt'),
  key: fs.readFileSync('/home/uidd2018/ssl/private.key')
}
https.createServer(options, app).listen(port, () => console.log(`listen on port:`+ port));

var  mysql= require('mysql');
var con = mysql.createConnection({
  host:"localhost",
  user:"uidd2018_groupG",
  password:"webGGdata",
  // Our database-name: uidd2018_groupG
  database: "uidd2018_groupG"
});

//app.listen(port);
app.use(express.static(__dirname + ''))
// district default set: tainan
var district;
district="tainan";
// user_name default set: John
var user_name;
user_name="";


var row;
con.connect(function(err){
  if(err) throw err;
  console.log("connected!");
});


var buildings_info=[];
var objs_info=[];
// retrieve data from table:objects and buildings
function getObjs_Buildings(){

  // retrieve data from table: buildings
  con.query("SELECT * FROM buildings WHERE name = ?",user_name, function(err, result){
    if(err) throw err;
    var building=result[0];
    for(var i=1; i<=25;i++){
      buildings_info.push(result[0][i]);
    }
  })
  // retreive data from table: objects
  con.query("SELECT * FROM objects WHERE name = ?",user_name, function(err, result){
    if(err) throw err;
    var count=0;
    var number=result[0].amount;
    for(var i=1; i<=25;i++){
      if(result[0][i]!=null){
        count=count+1;
        objs_info.push(result[0][i]);
      }
      if(count==number){
        break;
      }
    }
  })
}
// insert information when login
app.get("/user_data", function(req, res) {
  var uid = req.query.user_id;
  var uname = req.query.user_name;
  var url=req.query.user_pic;
  user_name=String(uname);
  console.log("user_name: "+user_name);
  console.log("uid: "+uid);
  console.log("url: "+url)
  con.query("SELECT * FROM user WHERE name = ? AND id = ?",[user_name, uid], function(err, result){
    if(err) throw err;
    console.log("length:"+result.length);
    if(result.length != 0){
      setTimeout(function(){getObjs_Buildings();},10000);
    }else{
      console.log("new user: "+ user_name); 
      var sql = "INSERT IGNORE INTO user(id, name, exp, lv, url) VALUES ?";
      var values = [
        [parseInt(uid), uname, 0, 1, url],
      ];
      var na={name: user_name};
      console.log(user_name);
      con.query(sql, [values], function(err,result){
        if(err) throw err;
        console.log("username: " + uname + " inserted");
      });
      var sql = "INSERT INTO total SET ?";
      con.query(sql, na, function(err,result){
        if(err) throw err;
      })
      var sql = "INSERT  INTO buildings SET ?";
      con.query(sql, na, function(err,result){
        if(err) throw err;
      })
      var sql = "INSERT INTO objects SET ?";
      con.query(sql, na, function(err,result){
        if(err) throw err;
      })
      setTimeout(function(){getObjs_Buildings();},10000);
    }
  })
});

app.get("/buildings", function(req, res) {
  console.log("send:"+buildings_info);
  res.send(buildings_info);
})
app.get("/objects", function(req, res) {
    console.log(objs_info);
    res.send(objs_info);
})

// update data when put buildings into house
app.get("/objANDbuild", function(req, res) {
    updateBuildingsAndObjects(req, res);
    //console.log("back from function");
    //console.log("changed buildings_info:"+buildings_info);
    //console.log("changed obj_info:"+objs_info);
    //res.send();
})

function updateBuildingsAndObjects(req, res){
  // step1. put buildings[i]=objects[x]
  //var sql = "UPDATE buildings SET ? = ? WHERE name = ?",[i, o, user_name];
  console.log("function: updataBuildingsAndObjects");
  var x=req.query.x;
  var o=objs_info[x];
  console.log("req.query.x: "+x);
  console.log("o:"+o);
  var i=req.query.i;
  var j=buildings_info[i];
  console.log("req.query.i: "+i);
  console.log("j:"+j);
  con.query( "UPDATE buildings SET ?? =? WHERE name = ?",[i, o, user_name], function(err, result){
    if(err) throw err;
    // retrieve data from table: buildings
    buildings_info=[];
    console.log("empty bu_info:"+ buildings_info);
    con.query("SELECT * FROM buildings WHERE name = ?",user_name, function(err, result){
      if(err) throw err;
      console.log("step1");
      var building=result[0];
      for(var i=1; i<=25;i++){
        buildings_info.push(result[0][i]);
      }
      // step2. objects[x] = null
      con.query("SELECT * FROM objects WHERE name = ?",user_name, function(err, result){
        if(err) throw err;
        console.log("step2");
        var number=result[0].amount;
        var temp=0;
        var stop=parseInt(x)+1;
        for(var g=1; g<=25;g++){
          if(result[0][g]!=null){
            temp=temp+1;
            console.log("g:"+g);
            console.log("x+1="+stop);
            if(temp==stop){
              
              console.log("temp:"+temp);
              con.query("UPDATE objects SET ?? = NULL WHERE name = ?",[g, user_name], function(error, result){
                if (err) throw err;
              });
              break;
            }
          }
        }
        // step3. objects['amount']=objects.amount-1
        con.query("UPDATE objects SET amount = ? WHERE name = ?",[(number-1), user_name], function(error, result){
          console.log("step3");
          if (err) throw err;
        });
        objs_info=[];
        con.query("SELECT * FROM objects WHERE name = ?",user_name, function(err, result){
          if(err) throw err;
          var number=result[0].amount;
          var count=0;
          for(var i=1; i<=25;i++){
            console.log("last info");
            if(result[0][i]!=null){
              count=count+1;
              objs_info.push(result[0][i]);
            }
            if(count==number){
              break;
            }
          }
        })
      });
    })
  });
  setTimeout(function() {
    console.log("changed buildings_info:"+buildings_info);
    console.log("changed obj_info:"+objs_info);
    return res.send({buildings_info:buildings_info, objs_info:objs_info});
  }, 300);
  /*
  console.log("changed buildings_info:"+buildings_info);
  console.log("changed obj_info:"+objs_info);
  return res.send({buildings_info:buildings_info, objs_info:objs_info});
  */
}

app.get('/showObjs', function(req, res){
  var mapObjs=[];
  var total=[];
  con.query("SELECT * FROM total WHERE name = ? AND district = ?", [user_name, district],function(err, result){
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
  con.query("SELECT * FROM total WHERE name = ? AND district = ?", [user_name, district],function(err, result){
    if(err) throw err;
    overall=result[0].overall+1;
    console.log("type overall:"+ typeof(overall));
    console.log("overall:"+overall);
    //
    con.query("UPDATE total SET overall = ? WHERE name = ? AND district = ?", [ overall, user_name, district],function(err, result){
      if(err) throw err;
      console.log("index_number:"+index_number);
      con.query("UPDATE total SET ??  = 1 WHERE name = ? AND district = ?", [ index_number ,user_name, district],function(err, result){
        if(err) throw err;
        console.log("2..");
      }); 
    }); 
  }); 
  con.query("SELECT * FROM objects WHERE name = ? AND district = ?", [user_name, district],function(err, result){
    if(err) throw err;
    console.log("3..");
    var amount=result[0].amount+1;
    for (var i=1; i<=25; i++){
      if(result[0][i]==null){
        con.query("UPDATE objects SET ??  = ? WHERE name = ? AND district = ?", [i, index_number ,user_name, district],function(err, result){
          if(err) throw err;
        });
        break;
      }
    }
    con.query("UPDATE objects SET amount  = ? WHERE name = ? AND district = ?", [amount ,user_name, district],function(err, result){
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
