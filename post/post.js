var rating = 5;

$(document).ready(function(){
	for(i=1;i<6;i++){
		if(rating > i-1){
			$("img.star:nth-child("+i+")").attr("src","assets/star1.png");
		}
		console.log(i-1);
	}
});