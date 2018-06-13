module.exports.checkUser= function(con, user_name, uid ){
  
  con.query("SELECT * FROM user WHERE name = ? AND id = ?",[user_name, uid], function(err, result){
    if(err) throw err;
    console.log("length:"+result.length);
    if(result.length > 0){
      console.log("length>0.");

      return true;
    }
  });
}
