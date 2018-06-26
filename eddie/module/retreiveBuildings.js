module.exports.retreive_buildings= function(con, user_name, callback){
  // retrieve data from table: buildings
  var buildings_info=[];
  con.query("SELECT * FROM buildings WHERE name = ?",user_name, function(err, result){
    if(err) throw err;
    for(var i=1; i<=35;i++){
      buildings_info.push(result[0][i]);
    }
    console.log("building_info:"+buildings_info);
    callback(buildings_info);
  })
}
