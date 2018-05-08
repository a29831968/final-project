$(document).ready(function() {  
      $("#ajax_btn").click(function(event){
        event.preventDefault();
        $.ajax({
          method: "get",
          url: "./ajax_data",
          data: {
            idname: $("#ajax_form input[name='idname']").val(),
          },
          success: function(data) {
            $("#ajax_content").html(data);
          }
        })
      })  
})
