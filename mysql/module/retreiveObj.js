module.exports.retreive_obj=function(con, user_name, callback){
  // retreive data from table: objects
  var objs_info=[];
  con.query("SELECT * FROM objects WHERE name = ?",user_name, function(err, result){
    if(err) throw err;
    var count=0;
    var number=result[0].amount;
    if(number>0){
      for(var i=1; i<=25;i++){
        if(result[0][i]!=null){
          count=count+1;
          objs_info.push(result[0][i]);
        }
        if(count==number){
          console.log("objs_info:"+objs_info);
          callback(objs_info);
          break;
        }
      }
    }else{
      console.log("objs_info:"+objs_info);
      callback(objs_info);
    }
  })
}
