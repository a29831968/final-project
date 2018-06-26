var mysql = require('mysql');
var con = mysql.createConnection({    //to connect the database
    host: "localhost",
      user: "uidd2018_groupG",
        password: "webGGdata",
          database: "uidd2018_groupG"
});
exports.makeletter=(username,letterid,topic,stars,friends,place,content,date)=>   //to store the information of letter
{
   var sql = 
  "INSERT INTO letter (letter_id,letter_writer,letter_topic,letter_content,letter_stars,letter_date,letter_palce,letter_friends) VALUES ('"+letterid+"','"+username+"','"+topic+"','"+content+"','"+stars+"','"+date+"','"+place+"','"+friends+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
   });
}
exports.storepicture=(arrayoflink,letterid)=> //insert picture  
{ 
  for(var k=0;k<arrayoflink.length;k++)
 {
  var sql="INSERT INTO  picture_forletter	(pictureurl,picture_letterid) VALUES ('"+arrayoflink[k]+"','"+letterid+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
 }


}
