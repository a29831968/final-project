var post_count = 0;
var pid_table = [];

$(document).ready(function(){
  $.ajax({
    method: "get",
    url: "/timeline/post_data",
    data:{},
    success: function(data){
      console.log("success");
      
      post_count = data.length;
      var result_holder = document.getElementById("post_holder");
      var result = '';
      for(var i=0; i<data.length; i++){
        result += '<div class="post"><div class="title">' + data[i].letter_topic + '</div><img class="like_icon" src="assets/like.png"/><div class="like_count">' + data[i].letter_like + '</div><img class="comment_icon" src="assets/comment.png"/><div class="comment_count">0</div></div>';
        pid_table[i] = data[i].letter_id;
      }
      result_holder.innerHTML = result;
      console.log("div created");
      click_response();
    },
  });

  function click_response(){
    for(var i=1; i<post_count+1; i++){
      $("div.post:nth-child("+i+")").click(function(){
        $.ajax({
          method: "get",
          url: "/timeline/pidreq",
          data: {
            pid: pid_table[$(this).index()],
          },
          success: function(data){},
        });
        window.location = '../B/B.html';
      });
    };
  };
});
