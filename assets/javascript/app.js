var animes =["Ninja Scroll", "Ghost In the Shell", "Akira", "Vampire Hunter D"]

    function displayMovieInfo() {

    var movie = $(this).attr("data-name");
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      console.log(response.Rated);

      // Creates a div to hold the movie
      var movieDiv = $('<div class="movie">')
      // Retrieves the rating Data
      var rating = response.Rated;
      // Creates an element to have the rating displayed
      var pOne = $('<p>').text("Rating: " + rating);
      // Displays the rating
      movieDiv.append(pOne);
      // Retrieves the release year
      var released = response.Released;
      // Creates an element to hold the release year
      var pTwo = $("<p>").text("Released: " + released);
      // Displays the release year
      movieDiv.append(pTwo);
      // Retrieves the plot
      var plot = response.Plot;
      // Creates an element to hold the plot
      var pThree = $("<p>").text("Plot: " + plot);
      // Appends the plot
      movieDiv.append(pThree);
      // Retrieving the URL for the image
      var imgURL = response.Poster;
      // Creates an element to hold the image
      var image = $("<img>").attr("src", imgURL);
      // Appends the image
      movieDiv.append(image);
      // Puts the entire Movie above the previous movies.
      $("#anime-view").prepend(movieDiv);
    });

  }

  // Event listener for our anime-button
    $("#anime-button").on("click", function() {

      // Storing our giphy API URL for a random anime image
      var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=anime";

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .done(function(response) {

        // Saving the image_original_url property
        var imageUrl = response.data.image_original_url;

        // Creating and storing an image tag
        var animeImage = $("<img>");

        // Setting the animeImage src attribute to imageUrl
        animeImage.attr("src", imageUrl);
        animeImage.attr("alt", "anime image");
        
        // Prepending the animeImage to the images div
        $("#images").prepend(animeImage);

                // Creating and storing an image tag
        // var animeImage =  $("#images").prepend($("<img>").attr("src", imageUrl).attr("alt", "anime image"));
      });
    });

    function renderButtons() {
        //delete the contents inside anime-view
        $('#buttons-view').empty();
        // Loop to array of anime variable and generate eah anime in the array
        for (i = 0; i <animes.length; i++) {
            var a = $('<button>')
            a.addClass('anime');
            a.attr('data-name', animes[i]);
            a.text(animes[i]);
            $('#buttons-view').append(a);
        }
    }

    $('#add-anime').on("click", function(event){
        event.preventDefault();

        var anime = $('#anime-input').val().trim();

        animes.push(anime);

        renderButtons();
    })

    $(document).on("click", ".anime", displayMovieInfo)

renderButtons();