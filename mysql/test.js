$(document).ready(function(){
  console.log("Inside the test.js.");
  $.ajax({        
    method:"get", 
    url:"./test",
    data:{
    },
    success: function(data){
      console.log("District: "+data);
      for (var i =0; i<data.length ; i++){
        console.log(data[i].id);
        console.log(data[i].name);
        console.log(data[i].lv);
      }
    }
  })
})
