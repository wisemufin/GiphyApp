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

    celebrityImage.attr("src", results[i].images.fixed_width.url);

    gifDiv.append(celebrityImage);
    $("#gif-container").prepend(gifDiv);
    }
  });
  if(clicked !== true) {
    clicked = true;
    $("#gif-container").empty();
  }
});

createButtons();
