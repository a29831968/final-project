$(document).ready(function(){
  console.log("Inside the test.js.");
  $.ajax({        
    method:"get", 
    url:"./test",
    data:{
    },
    success: function(data){
      console.log("District: "+data);
    }
  })
})
