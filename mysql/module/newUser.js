module.exports.insertUser= function(con, user_name, uid, url){
  var sql = "INSERT IGNORE INTO user(id, name, exp, lv, url) VALUES ?";
  var values = [
    [uid, user_name, 0, 1, url],
  ];
    var info={name: user_name};
    con.query(sql, [values], function(err,result){
      if(err) throw err;
    });
    var sql = "INSERT INTO total SET ?";
    con.query(sql, info, function(err,result){
      if(err) throw err;
    })
    var sql = "INSERT  INTO buildings SET ?";
    con.query(sql, info, function(err,result){
      if(err) throw err;
    })
    var sql = "INSERT INTO objects SET ?";
    con.query(sql, info, function(err,result){
      if(err) throw err;
    })
}
