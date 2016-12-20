$(document).ready(function(){

  // topics in the array to be a button

        // var topics =["Dragonball Super", "Cowboy Bebop", "One Piece", "Samurai Champloo", "One-Punch Man", "Attack on Titans", "Howl's Moving Castle", "Ninja Scroll", "Ghost In the Shell", "Sailor Moon"]
        var topics =["Sailor Moon", "Ghost In the Shell", "Ninja Scroll", "Howl's Moving Castle", "Attack on Titans", "One-Punch Man", "Samurai Champloo", "Cowboy Bebop", "Dragonball Super", "One Piece"]

        function displayanimeGif() {

        var randomNumber = Math.floor(Math.random() * 100);

        var animename = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animename + 
                      "&api_key=dc6zaTOxFJmzC&limit=10&rating=r&offset=" + randomNumber;

        // q= search query term or phrase   limit=10 limits the results returned to 10  
        // offset= + randumNumber to randomize the gif that get collected to anime-view

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          $('#anime-view').empty();
          console.log(response);
          
          var results = response.data;

              for (var i = 0; i < results.length; i++) {

              // Creates a div to hold the movie
              var animenameDiv = $('<div class="animename">')
              // Creating a paragraph tag with the result item's rating
              var pRate = $('<p>').text("Rating: " + results[i].rating);
              // Displays the rating
              animenameDiv.append(pRate);
              // Creating and storing an image tag
              var animeImage = $("<img>");
              // Setting the src attribute of the image to a property pulled off the result item
               animeImage.attr("src", results[i].images.fixed_height_still.url)
               //adding attribute data-still and data animate

      // This atributes are needed in image for the gif to have a function
               // adding attribute data-state=still and class= "gif"
               animeImage.attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url);
               // adding attribute data-state=still and class= "gif"
               animeImage.attr("data-state", "still").attr("class", "gif");

              // Appending the paragraph and image tag to the animenameDiv
              animenameDiv.append(animeImage);
              animenameDiv.append(pRate);
              // Prependng the animenameDiv to the HTML page in the "#anime-view" div
              $("#anime-view").prepend(animenameDiv);
            }

            $(".gif").on("click", function() {
              // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
              var state = $(this).attr("data-state");
              
              if (state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
              } else {
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
              }
            });

        });

      }

        function renderButtons() {
            //delete the contents inside anime-view
            $('#buttons-view').empty();
            // Loop to array of anime variable and generate eah anime in the array
            for (i = 0; i <topics.length; i++) {
                var a = $('<button>')
                a.addClass('anime');
                a.attr('data-name', topics[i]);
                a.text(topics[i]);
                $('#buttons-view').prepend(a);
            }
            // can't get to work trying to prevent adding blank button 
          
        }

        $('#add-anime').on("click", function(event){
            event.preventDefault();

            var anime = $('#anime-input').val().trim();

              if ( anime != "") {
              // prevents adding blank space as button

               topics.push(anime);

            renderButtons();
            }

           
        })

        $(document).on("click", ".anime", displayanimeGif)

    renderButtons();

});
