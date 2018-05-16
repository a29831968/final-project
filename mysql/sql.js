$(document).ready(function(){
  $("#btn_taipei").click(function(e){
    e.preventDefault();
    $.ajax({
      method:"get", 
      url:"./ajax_data",
      data:{
        district: "Taipei",
      },
      success: function(data){
        //console.log("Taipei: "+data);
        navigate();
      }
    })
  })
  $("#btn_tainan").click(function(e){
    e.preventDefault();
    $.ajax({
      method:"get", 
      url:"./ajax_data",
      data:{
        district: "Tainan",
      },
      success: function(data){
        //console.log("Tainan: "+data);
        navigate();
      }
    })
  })
})
// navigating to other webpage
function navigate() {
  window.location = 'http://luffy.ee.ncku.edu.tw:10065/test.html'
}

