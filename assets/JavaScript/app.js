var celebrityGifs = ['Samuel Jackson', 'Michael Jackson', 'Ron Swanson', 'Rick and Morty'];

function createButtons() {

  $("#button-dumpster").empty();

  for (var i = 0; i < celebrityGifs.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("celebrity-btn");
    newButton.attr("query-name", celebrityGifs[i]);
    newButton.text(celebrityGifs[i]);
    $("#button-dumpster").append(newButton);
  }
}

createButtons();
