function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed!";
}

var x="Cena";

$(document).ready(function() {  
    $("#ajax_form button").click(function(){
        event.preventDefault();//取消reload
        
        $.ajax({
            method: "get",
            url: "./user_data",
            data: {
              id: $("#ajax_form input[name='lname']").val(),
            },
            success: function(data) {
                $("#ajax_content").text(data)
            }
          })
    })  
})
