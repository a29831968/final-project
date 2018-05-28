const express = require('express')
const app = express()
const port = 10065

var  mysql= require('mysql');
var con = mysql.createConnection({
  host:"localhost",
  user:"uidd2018_groupG",
  password:"webGGdata",
  // Our database-name: uidd2018_groupG
  database: "uidd2018_groupG"
});


app.listen(port)
app.use(express.static(__dirname + ''))
// district default set: tainan
var district;
district="tainan";
// user_name default set: John
var user_name;
user_name="John";


var row;
con.connect(function(err){
  if(err) throw err;
  console.log("connected!");
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    row=result;
    //console.log(result);
  });
  con.query("SELECT * FROM users WHERE name='Annie'", function(err, result){
    if (err) throw err;
    //console.log(result);
  });
});


var buildings_info=[];
var objs_info=[];
con.connect(function(err){
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
    var number=result[0].amount;
    for(var i=1; i<=25;i++){
      if(result[0][i]!=null){
        objs_info.push(result[0][i]);
      }
    }
  })
})
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
    console.log("first con.query");
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
        for(var g=1; g<=25;g++){
          if(result[0][g]!=null){
            temp=temp+1;
            if(temp==(x+1)){
              con.query("UPDATE objects SET ?? = ? WHERE name = ?",[temp, null, user_name], function(error, result){
                if (err) throw err;
              });
            }
          }
        }
        // step3. objects['amount']=objects.amount-1
        con.query("UPDATE objects SET amount = ? WHERE name = ?",[(number-1), user_name], function(error, result){
          console.log("step3");
          if (err) throw err;
        });
      });
      objs_info=[];
      con.query("SELECT * FROM objects WHERE name = ?",user_name, function(err, result){
        if(err) throw err;
        var number=result[0].amount;
        for(var i=1; i<=number;i++){
          console.log("last info");
          objs_info.push(result[0][i]);
        }
      })
    })
  });
  console.log("changed buildings_info:"+buildings_info);
  console.log("changed obj_info:"+objs_info);
  res.send({buildings_info:buildings_info, objs_info:objs_info});
}
