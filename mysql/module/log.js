module.exports.checkUser= function(con, user_name, uid, callback){
  con.query("SELECT * FROM user WHERE name = ? AND id = ?",[user_name, uid], function(err, result){
    if(err) throw err;
    console.log("user_name:"+user_name+" uid:"+uid);
    var exist;
    if(result.length > 0){
      exist=true;
    }else{
      exist=false;
    }
    console.log("exist:"+exist);
    callback(exist);
  });
}
