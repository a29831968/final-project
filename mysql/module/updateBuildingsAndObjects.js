module.exports.update=function (con, user_name, buildings_info, objs_info, req, callback){
  // step1. put buildings[i]=objects[x]
  //var sql = "UPDATE buildings SET ? = ? WHERE name = ?",[i, o, user_name];
  var data={
    build:[],
    obj:[],
  };
  console.log("function: updataBuildingsAndObjects");
  var x=req.query.x;
  var o=objs_info[x];
  console.log("the block in bag you click: "+x);
  console.log("the obj you click in bag:"+o);
  var i=req.query.i;
  console.log("the number of building block you want to put: "+i);
  con.query( "UPDATE buildings SET ?? =? WHERE name = ?",[i, o, user_name], function(err, result){
    if(err) throw err;
    // retrieve data from table: buildings
    buildings_info=[];
    console.log("empty bu_info:"+ buildings_info);
    con.query("SELECT * FROM buildings WHERE name = ?",user_name, function(err, result){
      if(err) throw err;
      var building=result[0];
      for(var i=1; i<=25;i++){
        buildings_info.push(result[0][i]);
      }
      data.build=buildings_info;
      // step2. objects[x] = null
      con.query("SELECT * FROM objects WHERE name = ?",user_name, function(err, result){
        if(err) throw err;
        var number=result[0].amount;
        var temp=0;
        var stop=parseInt(x)+1;
        for(var g=1; g<=25;g++){
          if(result[0][g]!=null){
            temp=temp+1;
            if(temp==stop){
              con.query("UPDATE objects SET ?? = NULL WHERE name = ?",[g, user_name], function(error, result){
                if (err) throw err;
              });
              break;
            }
          }
        }
        // step3. objects['amount']=objects.amount-1
        con.query("UPDATE objects SET amount = ? WHERE name = ?",[(number-1), user_name], function(error, result){
          if (err) throw err;
        });
        objs_info=[];
        con.query("SELECT * FROM objects WHERE name = ?",user_name, function(err, result){
          if(err) throw err;
          var number=result[0].amount;
          var count=0;
          for(var i=1; i<=25;i++){
            if(result[0][i]!=null){
              count=count+1;
              objs_info.push(result[0][i]);
            }
            if(count==number){
              break;
            }
          }
          data.obj=objs_info;
          console.log("show build:"+data.build);
          console.log("show obj:"+data.obj);
          callback(data);
        })
      });
    })
  });
}
