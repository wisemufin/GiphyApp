var topics = ['Samuel Jackson', 'Michael Jackson', 'Ron Swanson', 'Rick and Morty'];

function createButtons() {

  $("#button-dumpster").empty();

  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("celebrity-btn");
    newButton.attr("query-name", topics[i]);
    newButton.text(topics[i]);
    $("#button-dumpster").append(newButton);
  }
}

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // Grab line from textbox and put into the celebrityGifs array
  var newCelebrity = $("#gif-input").val().trim();

  topics.push(newCelebrity);

  createButtons();
  console.log(topics);
});

// createButtons();
var clicked = true;

$(document).on("click", ".celebrity-btn", function() {
  var celebrity = $(this).attr("query-name");

  clicked = false;

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celebrity + "&api_key=f8OqT1ZbXbDH4m7QVQs4eZnRFGI3hyVI&limit=12";

  // Ajax Request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    console.log(results);
  for(var i = 0; i < results.length; i++) {
    //Create div for gifs
    var gifDiv = $("<div>");
    //Create image tag for the gif
    var celebrityImage = $("<img>");
    celebrityImage.attr("src", results[i].images.fixed_width_still.url);
    celebrityImage.attr("data-still", results[i].images.fixed_width_still.url);
    celebrityImage.attr("data-animate", results[i].images.fixed_width.url);
    celebrityImage.attr("class", results[i].type);
    celebrityImage.attr("data-state", "still");

    var rating = $("<p>").text("Rating: " + results[i].rating);

    gifDiv.append(celebrityImage);
    gifDiv.append(rating);
    $("#gif-container").prepend(gifDiv);
    }
  });
  if(clicked !== true) {
    clicked = true;
    $("#gif-container").empty();
  }
});

$(document).on("click", ".gif", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

createButtons();
