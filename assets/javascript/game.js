$(document).ready(function() {

//create array we'll use to start from and add more buttons to
var topics = ['Pikachu', 'Mewtwo', "Mew", 'Articuno', 'Misty'];

//creates our initial buttons by clearing them all then adding them back
function createButtons(){
	$('.buttons').empty();
	for (var i= 0; i < topics.length; i++){
		$('.buttons').css('color', 'blue').append("<button data-name='" + topics[i] + "'>" + topics[i] + "</button>");
	}
};
createButtons();

//creates a new button when add is clicked
//adds the new button to the topics array
$("#submitButton").on("click", function(event){
		event.preventDefault();
		var newButtonText= $('#searchInput').val();
		topics.push(newButtonText);
		createButtons()
	})
});

//gather those gifs and display them
//Display still images from giphy, with attributes referring to the animated images
$("#buttons").on("click", "input", function() {
	$("#buttons").empty();
	var buttonText = $(this).attr("data-name");
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonText + "&api_key=SKC76uSQiu2sf3ofblmPANRLXEr3QHJL&limit=10";

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(response) {
		var results = response.data;
		console.log(results);
		for (var i = 0; i < results.length; i++) {
			$("#buttons").append('<img src="' + results[i].images.fixed_height_small_still.url + '" data-still="' + results[i].images.fixed_height_small_still.url + '" data-animate="' + results[i].images.fixed_height_small.url + '" data-state="still" class="img-responsive rounded gif">');
		}
	});
});

//onclick for our gifs, stops and starts them via their current state url, animation url and still url
$(".myGifs").on("click", ".giphy", function(event) {
	event.preventDefault();
	var gifState = $(this).attr("data-state");
	var animUrl = $(this).attr("data-anim");
	var stillUrl = $(this).attr("data-still");
	if (gifState == "still") {
		$(this).attr("src", animUrl).attr('data-state', 'animate');
	} else {
		$(this).attr("src", stillUrl).attr('data-state', 'still');
	}
});
