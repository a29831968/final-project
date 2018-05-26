var  mysql= require('mysql');
var con = mysql.createConnection({
  host:"localhost",
  user:"uidd2018_groupG",
  password:"webGGdata",
  // Our database-name: uidd2018_groupG
  database: "uidd2018_groupG"
});


con.connect(function(err){
  if(err) throw err;
  console.log("connected!");
  var sql_tainan= "CREATE TABLE tainan (name VARCHAR(20),`0` INT, `1` INT,`2` INT, `3` INT, `4` INT, `5` INT, `6` INT, `7` INT, `8` INT, `9` INT, `10` INT, `11` INT, `12` INT, `13` INT, `14` INT, `15` INT, `16` INT, `17` INT, `18` INT, `19` INT, `20` INT, `21` INT, `22` INT, `23` INT, `24` INT)";
  con.query(sql_tainan, function(err, result){
    if (err) throw err;
    console.log("table tainan created");
  })
  var sql_objs= "CREATE TABLE objs (name VARCHAR(20),district VARCHAR(20), number INT, `0` INT, `1` INT,`2` INT, `3` INT, `4` INT, `5` INT, `6` INT, `7` INT, `8` INT, `9` INT, `10` INT, `11` INT, `12` INT, `13` INT, `14` INT, `15` INT, `16` INT, `17` INT, `18` INT, `19` INT, `20` INT, `21` INT, `22` INT, `23` INT, `24` INT)";
  //var sql_objs= "CREATE TABLE objs (name VARCHAR(20), district VARCHAR(20), number INT, 1 INT,2 INT, 3 INT, 4 INT, 5 INT, 6 INT, 7 INT, 8 INT, 9 INT, 10 INT, 11 INT, 12 INT, 13 INT, 14 INT, 15 INT, 16 INT, 17 INT, 18 INT, 19 INT, 20 INT, 21 INT, 22 INT, 23 INT, 24 INT)";
  con.query(sql_objs, function(err, result){
    if (err) throw err;
    console.log("table objs created");
  })
});
