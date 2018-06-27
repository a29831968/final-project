var rating = 0;
var liked = 0;
$(document).ready(function(){
  $.ajax({
    method: "get",
    url: "/B/like_data",
    data: {},
    success: function(data){
      console.log("success");
      if(data.length > 0){
        liked = 1;
        console.log("initial 1");
        $("#like_icon").attr("src", "assets/like.png");
      };
    },
  });

  $("#like_icon").click(function(){
    if(liked == 0){
      $.ajax({
        method: "get",
        url: "/B/insert",
        data: {},
        success: function(data){
          console.log("liked!");
        },
      });
        liked = 1;
        $("#like_icon").attr("src", "assets/like.png");
    }
    else{
      $.ajax({
        method: "get",
        url: "/B/delete",
        data: {},
        success: function(data){
          console.log("unliked!");
        },
      });
      liked = 0;
      $("#like_icon").attr("src" , "assets/like0.png");
    };
    console.log(liked);

    $.ajax({
      method: "get",
      url: "/B/like_count",
      data: {},
      success: function(data){},
    });
  });



  $.ajax({
		method: "get",
		url: "/B/post_data",
		data:{},
		success:function(data){
      console.log("received post data...");
      var name_holder = document.getElementById("name");
      var title = document.getElementById("title_w");
			var content = document.getElementById("content_w");
      var likes = document.getElementById("like_count");
      var comments = document.getElementById("comment_count");
      var date = document.getElementById("time");
      rating = data[0].letter_stars;
      console.log(rating);
      name_holder.innerHTML = data[0].letter_writer;
      title.innerHTML = data[0].letter_topic;
			content.innerHTML = data[0].letter_content;
      likes.innerHTML = data[0].letter_like;
      comments.innerHTML = 0;
      date.innerHTML = data[0].letter_date;
      for(i=1;i<6;i++){
        if(rating > i-1){
          $("img.star:nth-child("+i+")").attr("src","assets/star1.png");
        };
      };
    },
  });

  $.ajax({
    method: "get",
    url: "/B/picture",
    data:{},
    success:function(data){
      if(data.length>0){
        var picture = document.getElementById("image");
        var result = '<img class="picture" src="' + data[0].pictureurl + '"/>';
        picture.innerHTML = result;
      }
    },
  });

  $.ajax({
    method: "get",
    url: "/B/user_pic",
    data: {},
    success: function(data){
      console.log("got icon "+data[0].url);
      $("#auther_icon").attr("src",data[0].url);
    },
  });


  $("#back").click(function(){
    window.location.assign('../timeline/timeline.html');
  });
});
