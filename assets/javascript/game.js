window.onload = function() {

//create array we'll use to start from and add more buttons to
  // Initial array of pokemon
  var pokemon = ['Pikachu', 'Mewtwo', "Mew", 'Articuno', 'Misty'];

  function displayGif() {
    $("#results").empty();

    var pokemon = $(this).attr("data-name");

    // Giphy API key
    var APIKey = "ZnfZOhi0lEUfCLKmbun9KhR0Diw6Wx1x";

    // QueryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + pokemon + "&limit=10&lang=en";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {

      // Loop through results in object array
      for (var i = 0; i < response.data.length; i++) {

        // Create divs for each thumbnail and gif
        var tvDiv = $("<div>");
        tvDiv.addClass("col-md-4");
        var thumbnailDiv = $("<div>");
        thumbnailDiv.addClass("thumbnail");
        tvDiv.append(thumbnailDiv);



        // Create img tag and set state to still
        var gif = $("<img class = 'gif'>");
        gif.attr("data-state", "still");

        // Store still image in variable and add to img tag
        var stillImageUrl = response.data[i].images.fixed_width_still.url;
        gif.attr("data-still", stillImageUrl);

        // Store animated gif in variable with data-state
        var animatedImageUrl = response.data[i].images.fixed_width.url;
        gif.attr("data-animate", animatedImageUrl);

        gif.attr("src", stillImageUrl);
        thumbnailDiv.append(gif);

        // Store rating in variable and add to p tag
        var rating = response.data[i].rating;
        var ratingUpperCase = rating.toUpperCase();
        var pRating = $("<p>");
        pRating.addClass("rating");
        pRating.append("Rating: " + ratingUpperCase);
        thumbnailDiv.append(pRating);

        $("#results").append(tvDiv);

      }
    });
  };

  function displayButtons() {
    $(".buttons").empty();

    for (var i = 0; i < pokemon.length; i++) {
      var button = $("<button>");
      button.addClass("tvShow");
      button.attr("data-name", pokemon[i]);
      button.text(pokemon[i]);
      $(".buttons").append(button);
    }
  }

  function toggleImage() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      console.log("Hello");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }


    $("#search-button").on("click", function(event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      var tvShow = $("#input").val().trim();

      // Adding movie from the textbox to our array
      pokemon.push(tvShow);

      // Calling displayButtons which handles the processing of pokemon array
      displayButtons();
    });


    // Adding a click event listener to all elements with a class of .tvShow, call displayGif function
    $(document).on("click", ".tvShow", displayGif);

    $(document).on("click", ".gif", toggleImage);


    // Display buttons on page load
    displayButtons();

};
