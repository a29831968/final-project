require('mysql');
module.exports.test = function(){
  console.log("test");
}
user_name="Tony Yang";
module.exports.easy = function(con){
  console.log("test con");
  con.query("SELECT * FROM objects WHERE name = ?",user_name, function(err, result){
    if(err) throw err;
    console.log(result);
  });
}
