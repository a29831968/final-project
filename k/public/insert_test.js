var mysql = require('mysql');

var con = mysql.createConnection({
  host:"localhost",
  user:"uidd2018_groupG",
  password:"webGGdata",
  database:"uidd2018_groupG"
});

con.connect(function(err){
  if(err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO likes(pid, uid) VALUES ?";
  var values = [
    [2,2],
  ];
    con.query(sql, [values], function(err,result){
      if(err) throw err;
      console.log("record inserted");
    });
});
