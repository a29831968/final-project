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
  // create table {id, name, level, exp}
  //var sql= "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), lv INT, exp INT)";  
  var sql = "INSERT INTO users (name, lv, exp) VALUES ('John', 2, 220)";
  con.query(sql, function(err, result){
    if(err) throw err;
    var row=result;
    //console.log(row[name]);
  })
});


